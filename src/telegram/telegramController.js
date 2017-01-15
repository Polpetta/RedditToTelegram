/**
 * Created by davide on 08/01/17.
 */

import {TelegramView} from './telegramView'
import {TelegramModel} from './telegramModel'
import EventEmitter from 'events'

export class TelegramController extends EventEmitter {

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

  pushATextMessage (id, message) {
    const toSend = 'New post from ' + message.domain + '! \n' +
      'Title: ' + message.title + '\n' +
      'Link: ' + message.url

    this.model.sendMessage(id, toSend)
  }
}
