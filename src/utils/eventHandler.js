/**
 * Created by davide on 15/01/17.
 */

import {RedditController} from '../reddit/redditController'
import {TelegramController} from '../telegram/telegramController'
import {generalConfig} from './config'

export class EventHandler {

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

  _handleNewSubscriber (id) {
    if (generalConfig.isSubscribingAllowed() === true) {
      console.log('New Subscriber: ' + id)
      this.subscribers.push(id)
    } else {
      console.log('The id: ' + id + ' added me in a group. Ignoring...')
    }
  }

  _handleIncomingMessage (message) {

    const self = this

    this.subscribers.forEach(function (item) {
      console.log('Pushing to id: ' + item)
      self.telegramController.pushATextMessage(item, message)
    })
  }

  run () {
    this.redditController.getNewPosts()
  }
}
