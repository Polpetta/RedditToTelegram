/**
 * Created by davide on 08/01/17.
 */

import TelegramBot from 'node-telegram-bot-api'
import {telegramConfig} from '../utils/config'

export class TelegramView {

  constructor (telegramModel) {
    const config = telegramConfig.getConfig()
    const self = this

    this.telegram = new TelegramBot(
      config.token,
      {
        polling: true
      }
    )

    this.model = telegramModel

    // Events
    this.model.on('sendTextMessage', function (id, message) {
      self.sendTextMessage(id, message)
    })
  }

  // TODO: i should keep a list of all the ids to broadcast the message
  sendTextMessage (id, textMessage) {

    this.telegram.sendMessage(id, textMessage)
  }
}