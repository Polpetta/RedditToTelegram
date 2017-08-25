/**
 * Created by davide on 15/01/17.
 */

import {RedditController} from '../reddit/redditController'
import {TelegramController} from '../telegram/telegramController'
import {generalConfig} from './config'
import {LevelUserDatabase} from './../database/user/levelUserDatabase'

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
    this._redditController = new RedditController(
      generalConfig.getSubRedditName(),
      generalConfig.getPollingTime()
    )
    this._telegramController = new TelegramController()

    this._subscribers = new LevelUserDatabase(generalConfig.getDbPath())

    // Events
    this._redditController.on('incomingPost', function (message) {
      self._handleIncomingMessage(message)
    })

    this._telegramController.on('newSubscriber', function (id) {
      self._handleNewSubscriber(id)
    })

    this._telegramController.on('unsubscriber', function (id) {
      self._handleUnsubscriber(id)
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
      this._subscribers.subscribe(id)
        .then(function () {
          console.log('New Subscriber: ' + id)
        })
        .catch(function (err) {
          console.log('Got this error signing the user: ' + err)
        })
    } else {
      console.log('The id: ' + id + ' added me in a group. Ignoring...')
    }
  }

  /**
   * Handle unsubscription from users
   * @param {int} id - The id of the user/group
   * @private
   */
  _handleUnsubscriber (id) {
    this._subscribers.unsubscribe(id)
      .then(function () {
        console.log('User' + id + ' removed from user-list')
      })
      .catch(function (err) {
        console.log('Failed to unsubscribe ' + id + '. Error reason: ' + err)
      })
  }

  /**
   * This private method will push new posts from Reddit to Telegram,
   * sending it to all the subscribed users/groups.
   * @param {Object} message - A Reddit post
   * @private
   */
  _handleIncomingMessage (message) {
    const self = this

    this._subscribers.getUserList()
      .on('data', function (id) {
        console.log('Pushing message to: ' + id)
        self._telegramController.pushATextMessage(id, message)
      })
      .on('error', function (err) {
        console.log('Got this error while reading user list: ' + err)
      })
  }

  /**
   * It allows the Reddit controller to poll data from Reddit.
   */
  run () {
    this._redditController.getNewPosts()
  }
}
