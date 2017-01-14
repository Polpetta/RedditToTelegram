/**
 * Created by davide on 08/01/17.
 */

import {TelegramView} from './telegramView'
import {TelegramModel} from './telegramModel'

export class TelegramController {

  constructor () {
    this.model = new TelegramModel ()
    this.view = new TelegramView(this.model)

  }

  pushATextMessage(id, message) {
    this.model.sendMessage(id, message)
  }
}