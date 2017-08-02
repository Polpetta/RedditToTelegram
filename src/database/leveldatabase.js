
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
    return null
  }

  push (id) {
    return null
  }

  isPresent (id) {
    return false
  }

  remove (id) {
    return null
  }
}
