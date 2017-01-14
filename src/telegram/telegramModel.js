/**
 * Created by davide on 08/01/17.
 */

import EventEmitter from 'events'

export class TelegramModel extends EventEmitter {

  sendMessage(id, message) {

    this.emit ('sendTextMessage', id, message)
  }
}