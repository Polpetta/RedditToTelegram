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

  constructor () {
    super()
    this.reddit = new Snoowrap(redditConfig.getConfig())
  }

  getNewPosts (subredditName) {
    return this.reddit.getNew(subredditName)
  }
}
