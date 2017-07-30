/**
 * Created by davide on 01/01/17.
 */

import {RedditView} from './redditView'
import {RedditModel} from './redditModel'
import EventEmitter from 'events'
import {SearchableFIFO} from '../utils/dataStructure/searchableFIFO'
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
    this.model = new RedditModel()
    this.view = new RedditView(subredditName, pollingTime, this.model)
    this.db = new SearchableFIFO(25)

    this.polling = false
  }

  /**
   * This method will subscribe to the view, in particular to the 'newPosts'
   * event and it'll start the polling from Reddit.
   */
  getNewPosts () {
    if (!this.polling) {
      this.polling = true
      let self = this

      // First population
      this.view.getNewPosts().then(function (newPosts) {
        /* let newOldest = self._getOldestPost(newPosts) */
        let newOldest = newPosts[0]
        self._internalPolling(newOldest)
      })
    }
  }

  _internalPolling (oldest) {
    let self = this
    this.view.getNewPosts().then(function (newPosts) {
      for (let i = 0; i < newPosts.length; i++) {
        if (newPosts[i].created > oldest.created) {
          self.emit(
            'incomingPost',
            RedditDataHandler.purgeUnusefulFields(newPosts[i])
          )
        }
      }

      self._internalPolling(newPosts[0])
    })
  }
}
