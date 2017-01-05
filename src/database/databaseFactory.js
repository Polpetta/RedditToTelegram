/**
 * Created by davide on 04/01/17.
 */

/**
 * Factory for different types of databases
 */

import {RedisDatabase} from './redis/redisDatabase'

class AbstractDatabaseFactory {

  static getDatabase () {}
}

export class RedisDatabaseFactory extends AbstractDatabaseFactory {

  static getDatabase () {
    return new RedisDatabase()
  }
}
