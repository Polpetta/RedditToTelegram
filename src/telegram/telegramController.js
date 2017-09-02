/**
 * Created by davide on 08/01/17.
 */

import {TelegramView} from './telegramView'
import {TelegramModel} from './telegramModel'
import EventEmitter from 'events'

/**
 * The controller for the telegram MVC. It subscribe to the view and act
 * when a new event is emitted.
 */
export class TelegramController extends EventEmitter {

  /**
   * This method build the controller. It create first the model and after
   * the view. Here the controller subscribe itself for the
   * 'addedToANewGroup' event.
   */
  constructor () {
    super()

    const self = this
    this._model = new TelegramModel()
    this._view = new TelegramView(this._model)

    // Events
    this._view.on('addedToANewGroup', function (id) {
      self.emit('newSubscriber', id)
    })

    this._view.on('kickedFromGroup', function (id) {
      self.emit('unsubscriber', id)
    })
  }

  /**
   * Send a message via telegram to the given id
   * @param {int} id - The identifier. It has to be valid
   * @param {Object} message - The message from reddit to send
   */
  pushATextMessage (id, message) {
    const toSend = 'New post from ' + message.domain + '! \n' +
      'Title: ' + message.title + '\n' +
      'Link: ' + message.url

    this._model.sendMessage(id, toSend)
  }
}
