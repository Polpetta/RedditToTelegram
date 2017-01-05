/**
 * Created by davide on 01/01/17.
 */

import {RedditView} from './redditView'
import EventEmitter from 'events'
import {RedisDatabaseFactory} from '../database/databaseFactory'
import {RedditDataHandler} from '../utils/redditDataHandler'

export class RedditController extends EventEmitter {

  constructor (subredditName, pollingTime) {
    super()
    // Reddit doesn't count UTC time in milliseconds
    this.inizalization = Math.floor(Date.now() / 1000)
    this.subredditName = subredditName
    this.view = new RedditView(subredditName, pollingTime)
    this.db = RedisDatabaseFactory.getDatabase()
  }

  _checkNews (listOfNews) {
    /*
     * TODO: integration with redis database. The idea is to save all the
     * keys of the post and check in the database if there are new keys. I
     * will probably use a set. It's faster than using a simple txt.
     * If there are new entries I should emit an event and send the new posts
     * to Telegram
     *
     */

    const self = this
    listOfNews.then(function (data) {
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

  getNewPosts () {
    const self = this
    this.view.on('newPosts', function (listOfNews) {
      self._checkNews(listOfNews)
    })
    this.view.startPolling()
  }
}
