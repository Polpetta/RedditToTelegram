/**
 * Created by davide on 08/01/17.
 */

import TelegramBot from 'node-telegram-bot-api'
import {telegramConfig} from '../utils/config'
import EventEmitter from 'events'

export class TelegramView extends EventEmitter {

  constructor (telegramModel) {
    super()

    const config = telegramConfig.getConfig()
    const self = this

    this.telegram = new TelegramBot(
      config.token,
      {
        polling: true
      }
    )

    this.telegram.on('new_chat_participant', function (message) {
      self._emitWhenInANewGroup(message)
    })

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

  _emitWhenInANewGroup (message) {
    const self = this

    this.telegram.getMe().then(function (aboutMe) {
      if (aboutMe.id === message.new_chat_participant.id) {
        self.emit('addedToANewGroup', message.chat.id)
      }
    })
  }
}
