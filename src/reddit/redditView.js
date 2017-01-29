/**
 * Created by davide on 01/01/17.
 */

import Snoowrap from 'snoowrap'
import {redditConfig} from '../utils/config'
import EventEmitter from 'events'

/**
 * Fetch the data from Reddit and sends event every polling interval.
 */
export class RedditView extends EventEmitter {

  /**
   * Construct a RedditView object.
   * @param {string} subredditName - Subreddit name where fetch the posts
   * @param {int} pollingInterval - Interval in milliseconds between every fetch
   * @param {RedditModel} redditModel - The reddit model
   * @constructor
   */
  constructor (subredditName, pollingInterval, redditModel) {
    super()
    this.reddit = new Snoowrap(redditConfig.getConfig())
    this.subredditName = subredditName
    this.pollingInterval = pollingInterval
    this.model = redditModel // Useful for triggering action from the model
  }

  /**
   * It get new posts from reddit of a given subreddit.
   * @returns {Promise} - The promise with new posts data
   * @private
   */
  _getNewPosts () {
    return this.reddit.getNew(this.subredditName)
  }

  /**
   * Start the reddit polling with a given polling interval. At the end of the
   * interval a event is emitted. The event name is 'newPosts'.
   * The argument that the event send it's a promise with a list of posts.
   */
  startPolling () {
    const self = this

    setInterval(function () {
      self.emit('newPosts', self._getNewPosts())
    }, this.pollingInterval)
  }
}
