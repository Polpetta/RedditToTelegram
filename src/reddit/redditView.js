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
    this._reddit = new Snoowrap(redditConfig.getConfig())
    this._subredditName = subredditName
    this._pollingInterval = pollingInterval
    this._model = redditModel // Useful for triggering action from the model
  }

  /**
   * It get new posts from reddit of a given subreddit.
   * @returns {Promise} - The promise with new posts data
   */
  getNewPosts () {
    return this._reddit.getNew(this._subredditName)
  }
}
