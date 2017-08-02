/**
 * Created by davide on 04/01/17.
 */

import {LevelDatabase} from './leveldatabase'

/**
 * Factory for different types of databases
 */
class AbstractDatabaseFactory {

  /**
   * This should be an empty method to be override from all the subclasses
   */
  getDatabase () {}
}

export class LevelDatabaseFactory extends AbstractDatabaseFactory {

  constructor (path) {
    super()
    this._path = path
  }

  getDatabase () {
    return new LevelDatabase(this._path)
  }
}

