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
    let nsfw = 'No'
    if (message.nsfw) {
      nsfw = 'Yes'
    }

    let toSend = '*' + message.title + '* \n'

    if (!message.nsfw) {
      if (message.isSelf) {
        let text = message.tweetSelf || 'there\'s no text!'
        toSend += '_Content_: ' + text + '\n\n'
      } else {
        toSend += '[Link](' + message.url + ') \n\n'
      }
    }
    toSend +=
      '[Go to the post](https://www.reddit.com' + message.permalink + ')\n' +
      '_Author_: [/u/' + message.author + '](' + linkToAuthor + ')\n' +
      '_NSFW_: ' + nsfw + '\n'

    this._model.sendMessage(id, toSend, {parse_mode: 'Markdown'})
  }
}
