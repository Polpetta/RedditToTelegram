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
    this.model = new TelegramModel()
    this.view = new TelegramView(this.model)

    // Events
    this.view.on('addedToANewGroup', function (id) {
      self.emit('newSubscriber', id)
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

    this.model.sendMessage(id, toSend)
  }
}
