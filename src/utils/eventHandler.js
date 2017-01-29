/**
 * Created by davide on 15/01/17.
 */

import {RedditController} from '../reddit/redditController'
import {TelegramController} from '../telegram/telegramController'
import {generalConfig} from './config'

/**
 * This class is the bridge that allows the Telgeram and Reddit MVCs to talk
 * together. In fact, it handles the event coming from Reddint and push it
 * to Telegram, and vice versa.
 */
export class EventHandler {

  /**
   * The object constructor. It creates a reddit and a telegram controller,
   * an array of subscribers and subscribe to events like 'incomingPost' or
   * 'newSubscriber'.
   */
  constructor () {
    const self = this
    this.redditController = new RedditController(
      generalConfig.getSubRedditName(),
      generalConfig.getPollingTime()
    )
    this.telegramController = new TelegramController()

    this.subscribers = []

    // Events
    this.redditController.on('incomingPost', function (message) {
      self._handleIncomingMessage(message)
    })

    this.telegramController.on('newSubscriber', function (id) {
      self._handleNewSubscriber(id)
    })
  }

  /**
   * Private method to handler new subscriber. If new subscribers are
   * allowed, the subscribed is pushed in the subscribers array. This could
   * lead to race conditions.
   * @param {int} id - The id of the new user/group
   * @private
   */
  _handleNewSubscriber (id) {
    if (generalConfig.isSubscribingAllowed() === true) {
      console.log('New Subscriber: ' + id)
      this.subscribers.push(id)
    } else {
      console.log('The id: ' + id + ' added me in a group. Ignoring...')
    }
  }

  /**
   * This private method will push new posts from Reddit to Telegram,
   * sending it to all the subscribed users/groups.
   * @param {Object} message - A Reddit post
   * @private
   */
  _handleIncomingMessage (message) {
    const self = this

    this.subscribers.forEach(function (item) {
      console.log('Pushing to id: ' + item)
      self.telegramController.pushATextMessage(item, message)
    })
  }

  /**
   * It allows the Reddit controller to poll data from Reddit.
   */
  run () {
    this.redditController.getNewPosts()
  }
}
