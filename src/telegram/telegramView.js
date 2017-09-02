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

    this._telegram = new TelegramBot(
      config.token,
      {
        polling: true
      }
    )

    this._telegram.on('new_chat_participant', function (message) {
      self._emitWhenInANewGroup(message)
    })

    this._telegram.on('left_chat_participant', function (message) {
      self._emitWhenKickedFromGroup(message)
    })

    this._model = telegramModel

    // Events
    this._model.on('sendTextMessage', function (id, message) {
      self.sendTextMessage(id, message)
    })
  }

  /**
   * Send a message to the given id
   * @param {int} id - The address where to send the message
   * @param {string} textMessage - The message to send
   */
  sendTextMessage (id, textMessage) {
    this._telegram.sendMessage(id, textMessage)
  }
  /**
   * This private method will check if the id o the new partecipant of a
   * group it's the bot itself. If this is true, a new event it's emitted.
   * @param {Object} message - An object coming from Telegram, with the new
   * partecipant id
   * @private
   */
  _emitWhenInANewGroup (message) {
    const self = this

    this._telegram.getMe().then(function (aboutMe) {
      if (aboutMe.id === message.new_chat_participant.id) {
        self.emit('addedToANewGroup', message.chat.id)
      }
    })
  }

  /**
   * This private method will check if the id kicked is the same of the bot.
   * If it's the same, the bot will emit an event to its subscribers.
   * @param {Object} message - An object coming from Telegram, with the leaving
   * partecipant id
   * @private
   */
  _emitWhenKickedFromGroup (message) {
    const self = this

    this._telegram.getMe().then(function (aboutMe) {
      if (aboutMe.id === message.left_chat_member.id) {
        self.emit('kickedFromGroup', message.chat.id)
      }
    })
  }
}
