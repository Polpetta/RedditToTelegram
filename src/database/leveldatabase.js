
import {Database} from './database'
import * as level from 'level'

/**
 * Class to interact with level db API
 */
export class LevelDatabase extends Database {
  constructor (path) {
    super()

    this._databasePath = path
    this._db = level(this._databasePath)
  }

  get (id) {
    let self = this
    return new Promise((resolve, reject) => {
      self._db.get(id, function (err, value) {
        if (err) {
          reject(err)
        } else {
          resolve(value)
        }
      })
    })
  }

  put (id, data) {
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

  remove (id) {
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
}
