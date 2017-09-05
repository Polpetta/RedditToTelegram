/**
 * Created by davide on 08/01/17.
 */

import {TelegramView} from './telegramView'
import {TelegramModel} from './telegramModel'
import EventEmitter from 'events'
import * as emoji from 'node-emoji'

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
   * It sends a message via telegram to the given id
   * @param {int} id - The identifier. It has to be valid
   * @param {String} message - The message from reddit to send
   */
  pushATextMessage (id, message) {
    this._model.sendMessage(id, message)
  }

  /**
   * This methods sends a message with markup style of a new Reddit post to
   * the given id
   * @param {int} id - The identifier. It has to be valid
   * @param {Object} message - The message from reddit to send
   */
  pushNewPost (id, message) {
    let linkToAuthor = 'https://www.reddit.com/user/' + message.author
    let nsfw = ''
    if (message.nsfw) {
      nsfw = emoji.emojify(
        ':warning: This post is NSFW! :underage: \n',
        null,
        null)
    }

    let toSend = emoji.get(':speech_balloon:') + ' *' + message.title + '* \n'

    if (!message.nsfw) {
      if (message.isSelf) {
        let content = message.selftext.length > 0
          ? emoji.emojify(':pencil: ', null, null) : ''
        let text = message.tweetSelf || message.selftext

        toSend += content + text + '\n\n'
      } else {
        toSend += emoji.get(':link:') + ' [Link](' + message.url + ') \n\n'
      }
    } else {
      toSend += '\n\n'
    }
    toSend +=
      emoji.get(':rocket:') + ' [Go to the post](https://www.reddit.com' +
      message.permalink + ')\n' + emoji.get(':bust_in_silhouette:') +
      ' [/u/' + message.author + '](' + linkToAuthor + ')\n' +
      nsfw + '\n\n' + 'Three random emojis for you: '

    for (let i = 0; i < 3; i++) {
      toSend += emoji.random().emoji + ' '
    }

    this._model.sendMessage(id, toSend, {parse_mode: 'Markdown'})
  }
}
