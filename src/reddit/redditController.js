/**
 * Created by davide on 01/01/17.
 */

import {RedditView} from './redditView'
import EventEmitter from 'events'
import RedisClient from 'redis'

export class RedditController extends EventEmitter {
  constructor (subredditName, pollingTime) {

    super()
    this.view = new RedditView(subredditName, pollingTime)
    this.redis = new RedisClient()
  }

  checkNews (listOfNews) {
    /*
     * TODO: integration with redis database. The idea is to save all the
     * keys of the post and check in the database if there are new keys. I
     * will probably use a set. It's faster than using a simple txt.
     *
     */
  }

  getNewPosts () {
    const self = this
    this.view.on('newPosts', function (listOfNews) {
      self.checkNews(listOfNews)
    })
    this.view.startPolling()
  }
}