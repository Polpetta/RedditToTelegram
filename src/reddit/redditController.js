/**
 * Created by davide on 01/01/17.
 */

import {RedditView} from './redditView'
import {RedditModel} from './redditModel'
import EventEmitter from 'events'
import {InMemoryDatabaseFactory} from '../database/databaseFactory'
import {RedditDataHandler} from '../utils/redditDataHandler'

/**
 * Reddit controller. This class takes events from the view and purge all
 * the already processed posts. If there is a new post, it will emit an event.
 */
export class RedditController extends EventEmitter {

  /**
   * The RedditController constructor.
   * @param {string} subredditName - Subreddit name where fetch the posts
   * @param {int} pollingTime - Interval in milliseconds between every fetch
   * @constructor
   */
  constructor (subredditName, pollingTime) {
    super()
    // Reddit doesn't count UTC time in milliseconds
    this.inizalization = Math.floor(Date.now() / 1000)
    this.subredditName = subredditName
    this.model = new RedditModel()
    this.view = new RedditView(subredditName, pollingTime, this.model)
    this.db = InMemoryDatabaseFactory.getDatabase()
  }

  /**
   * This private method that checks if there are new posts. In order to achieve
   * this it uses a database as a cache, where it stores the post's id. If
   * the id isn't in the database an event is triggered, because this is a
   * new post.
   * @param {Promise} listOfNews - A list of news fetched from Reddit
   * @private
   */
  _checkNews (listOfNews) {
    const self = this

    listOfNews.then(function (data) {
      data.forEach(self._processSinglePost.bind(self))
    })
  }

  /**
   * It process a single post, checking if its id is already in the
   * database. If it isn't means that is a new post and its id need to
   * be saved and a new event emitted.
   * The event is a 'incomingPost' event, and it'll contain a object that
   * is, indeed, the new post.
   * In order to work properly this method needs two promises: the
   * first is to check if the id is already in the database, the second to
   * add if it's not present.
   * @param {Object} post - A single post from Reddit
   * @private
   */
  _processSinglePost (post) {
    const self = this

    if (self.inizalization < post.created_utc) {
      self.db.isPresent(post.id)
        .then(function (res) {
          if (res === false) {
            self.db.pushData(post.id, { sent: false })
              .then(function () {
                self.emit(
                  'incomingPost',
                  RedditDataHandler.purgeUnusefulFields(post)
                )
              })
              .catch(function (err) {
                self._printError('Error in ' + post.id + ': ' + err)
              })
          }
        })
        .catch(function (err) {
          self._printError('Error in ' + post.id + ': ' + err)
        })
    }
  }

  /**
   * Print the error message. This method exists to follow the DRY in
   * _checkNews. For the moment it's a sort of workaround, and in the future
   * this abomination will be fixed.
   * @param {string} message - The error message to print
   * @private
   */
  _printError (message) {
    console.log(message)
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
