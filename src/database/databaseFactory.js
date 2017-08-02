/**
 * Created by davide on 04/01/17.
 */

import {RedisDatabase} from './redis/redisDatabase'
import {InMemoryDatabase} from './inMemory/inMemoryDatabase'

/**
 * Factory for different types of databases
 */
class AbstractDatabaseFactory {

  /**
   * This should be an empty method to be override from all the subclasses
   */
  static getDatabase () {}
}

/**
 * Factory implementation for the Redis database
 */
export class RedisDatabaseFactory extends AbstractDatabaseFactory {

  /**
   * This method will return an instance of the Redis database
   * @returns {RedisDatabase} - An instance for working with a Redis database
   * @static
   */
  static getDatabase () {
    return new RedisDatabase()
  }
}

/**
 * Factory implementation for the in-memory database
 */
export class InMemoryDatabaseFactory extends AbstractDatabaseFactory {

  /**
   * This method will return an instance of the in-memory database
   * @returns {InMemoryDatabase} - An instance for working with a in-memory
   * database
   * @static
   */
  static getDatabase () {
    return new InMemoryDatabase()
  }
}
