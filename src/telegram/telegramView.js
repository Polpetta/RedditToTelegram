/**
 * Created by davide on 08/01/17.
 */

import TelegramBot from 'node-telegram-bot-api'
import {telegramConfig} from '../utils/config'
import EventEmitter from 'events'

/**
 * The view in the telegram MVC pattern. This will receive and send the
 * messages from telegram.
 */
export class TelegramView extends EventEmitter {

  /**
   * The constructor in order to build the view. It create a TelegramBot
   * object, and it subscribe to the useful events.
   * @param {TelegramModel} telegramModel - The telegram MVC model.
   */
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

  /**
   * Send a message to the given id
   * @param {int} id - The address where to send the message
   * @param {string} textMessage - The message to send
   */
  sendTextMessage (id, textMessage) {
    this.telegram.sendMessage(id, textMessage)
  }

  /**
   * This private method will check if the id o the new partecipant of a
   * group it's the bot itself. If this is true, a new event it's emitted.
   * @param message
   * @private
   */
  _emitWhenInANewGroup (message) {
    const self = this

    this.telegram.getMe().then(function (aboutMe) {
      if (aboutMe.id === message.new_chat_participant.id) {
        self.emit('addedToANewGroup', message.chat.id)
      }
    })
  }
}
