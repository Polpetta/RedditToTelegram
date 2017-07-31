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
    this._model = new RedditModel()
    this._view = new RedditView(subredditName, pollingTime, this._model)
    this._db = new SearchableFIFO(25)

    this._polling = false
  }

  /**
   * This method will fetch for the first time a list of posts and it will
   * take the newest. After that it will call `_internalPolling` that will
   * indefinitely poll reddit searching for new posts.
   */
  getNewPosts () {
    if (!this._polling) {
      this._polling = true
      let self = this

      // First population
      this._view.getNewPosts().then(function (newPosts) {
        let newOldest = newPosts[0]
        self._internalPolling(newOldest)
      })
    }
  }

  /**
   * The main goal of this method is to filter posts that are newer than
   * the `oldest` param. If they are, a `incomingPost` event is emitted,
   * alerting the telegram part that there is a new post to push to the user.
   * @param {Object} oldest - The last reddit post fetched from the previous
   * iteration
   * @private
   */
  _internalPolling (oldest) {
    let self = this
    this._view.getNewPosts().then(function (newPosts) {
      let iterate = true
      for (let i = 0; i < newPosts.length && iterate; i++) {
        if (newPosts[i].created > oldest.created) {
          self.emit(
            'incomingPost',
            RedditDataHandler.purgeUnusefulFields(newPosts[i])
          )
        } else {
          iterate = false
        }
      }

      self._internalPolling(newPosts[0])
    })
  }
}
