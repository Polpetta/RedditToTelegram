/**
 * Created by davide on 08/01/17.
 */

import EventEmitter from 'events'

/**
 * The model of the telegram MVC.
 */
export class TelegramModel extends EventEmitter {

  /**
   * Emit an event, triggering the view to send a message
   * @param {int} id - The address where to send the message
   * @param {string} message - The message to send
   * @param {Object} options - An object containing sending options
   */
  sendMessage (id, message, options = {}) {
    this.emit('sendTextMessage', id, message, options)
  }
}
