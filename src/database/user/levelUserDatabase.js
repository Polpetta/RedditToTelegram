import {UserDatabase} from 'userDatabase'
import * as level from 'level'

/**
 * This class manage the user subscription to the bot
 */
export class LevelUserDatabase extends UserDatabase {

  constructor(path) {

    super()
    this._db = level(path)
  }

  subscribe (id) {
    let self = this
    return new Promise((resolve, reject) => {
      self._db.put(id, data, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  unsubscribe (id) {
    let self = this
    return new Promise((resolve, reject) => {
      self._db.del(id, function (err) {
        if (err) {
          reject(err)
        } else {
          resolve()
        }
      })
    })
  }

  getUserList () {
    return this._db.createKeyStream()
  }
}