/**
 * Created by davide on 01/01/17.
 */

import {RedditView} from './redditView'
import {RedditModel} from './redditModel'
import EventEmitter from 'events'
import {RedisDatabaseFactory} from '../database/databaseFactory'
import {RedditDataHandler} from '../utils/redditDataHandler'

/**
 * Reddit controller. This class takes events from the view and purge all
 * the already processed posts. If there is a new post, it will emit an event.
 */
export class RedditController extends EventEmitter {

  /**
   * The RedditController constructor.
   * @param {string} subredditName - Subreddit name where fetch the posts
   * @param pollingTime - Interval in milliseconds between every fetch
   */
  constructor (subredditName, pollingTime) {
    super()
    // Reddit doesn't count UTC time in milliseconds
    this.inizalization = Math.floor(Date.now() / 1000)
    this.subredditName = subredditName
    this.model = new RedditModel()
    this.view = new RedditView(subredditName, pollingTime, this.model)
    this.db = RedisDatabaseFactory.getDatabase()
  }

  /**
   * This private method that checks if there are new posts. In order to achieve
   * this it uses a database as a cache, where it stores the post's id. If
   * the id isn't in the database an event is triggered, because this is a
   * new post.
   * In order to work properly it needs to use two promises: the first is to
   * check if the id is already in the database, the second to add if it's
   * not present, finally triggering a new event.
   * The event is a 'incomingPost' event, and it'll contain a object that
   * it's the new post. In order to speed up the post processing, some not
   * useful fields are deleted.
   * @param {Promise} listOfNews - A list of news fetched from Reddit
   * @private
   */
  _checkNews (listOfNews) {
    // FIXME: this code is a mess. It needs some clean up!

    const self = this
    listOfNews.then(function (data) {
      // FIXME: use a forEach statement to speed up the process
      for (let i = 0; i < data.length; i++) {
        /*
         * Check if the post is already in the database, otherwise add it.
         */

        if (self.inizalization < data[i].created_utc) {
          new Promise(
            function (resolve, reject) {
              self.db.isPresent(data[i].id, function (err, obj) {
                if (err === null) {
                  if (obj === 1) {
                    resolve(true)
                  }
                  resolve(false)
                }
                reject(err)
              })
            })
            .then(function (res) {
              if (res === false) {
                new Promise(
                  function (resolve, reject) {
                    self.db.pushData(data[i].id,
                      {
                        sent: false
                      },
                    function (err) {
                      if (err == null) {
                        // I Don't need to check the object, only if there
                        // are errors
                        resolve()
                      }
                      reject(err)
                    })
                  })
                  .then(function () {
                    self.emit(
                      'incomingPost',
                      RedditDataHandler.purgeUnusefulFields(data[i])
                    )
                  })
                  .catch(function (err) {
                    console.log('Error: ' + err)
                  })
              }
            })
            .catch(function (err) {
              console.log('Error: ' + err)
            })
        }
      }
    })
  }

  /**
   * This method will subscribe to the view, in particular to the 'newPosts'
   * event and it'll start the polling from Reddit.
   */
  getNewPosts () {
    const self = this
    this.view.on('newPosts', function (listOfNews) {
      self._checkNews(listOfNews)
    })
    this.view.startPolling()
  }
}
