/**
 * Created by davide on 01/01/17.
 */

import Snoowrap from 'snoowrap'
import {redditConfig} from '../utils/config'
import EventEmitter from 'events'

/**
 * Fetch the data from Reddit
 */
export class RedditView extends EventEmitter {

  constructor (subredditName, pollingInterval) {
    super()
    this.reddit = new Snoowrap(redditConfig.getConfig())
    this.subredditName = subredditName
    this.pollingInterval = pollingInterval
  }

  _getNewPosts () {
    return this.reddit.getNew(this.subredditName)
  }

  startPolling () {
    const self = this

    setInterval(function () {
      self.emit('newPosts', self._getNewPosts())
    }, this.pollingInterval)
  }
}
