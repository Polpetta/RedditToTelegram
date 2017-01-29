/**
 * Created by davide on 04/01/17.
 */

import {Database} from '../database'
import {HashRedisDataStructureStrategy} from './dataStructureStrategy'
import RedisClient from 'redis'
import {redisConfig} from '../../utils/config'
import bluebird from 'bluebird'

bluebird.promisifyAll(RedisClient.RedisClient.prototype);
bluebird.promisifyAll(RedisClient.Multi.prototype);

/**
 * An instance of the Database designed to work with the Redis database.
 */
export class RedisDatabase extends Database {

  /**
   * It construct the RedisDatabase object, creating first a connection to
   * Redis.
   */
  constructor() {

    super()

    this.db = new RedisClient.createClient(redisConfig.getConfig()) // eslint-disable-line

    this.db.on('error', function (err) {
      // This error happen when using the bot with docker, so for the moment
      // I'll hide it.
      if (err != 'ReplyError: ERR invalid DB index') {
        console.log('Error ' + err)
      }
    })

    this.dataStructure = new HashRedisDataStructureStrategy(this.db)
  }

  /**
   * Save given data with a specific id on Redis.
   * @param {string} id - The data identifier
   * @param {Object} data - The data the user want to save
   * @param {Function} callback - Function to callback after the operation
   * @returns {*}
   */
  pushData (id, data, callback) {

    return this.dataStructure.save(id, data, callback)
  }

  /**
   * Return the data saved with a specific id on Redis
   * @param {string} id - The data identifier
   * @param {Function} callback - Function to callback after the operation.
   * It will pass the data in a JSON Object if the operation it's successful.
   * @returns {*}
   */
  getData (id, callback) {

    return this.dataStructure.retrieve(id, callback)
  }

  /**
   * Checks if the id it's already present in the database. It'll call a
   * callback containing a boolean value: true if there is some data with
   * the given id, false otherwise.
   * @param {string} id - The data identifier
   * @param {Function} callback - Function to callback after the operation.
   * It will pass a boolean value.
   * @returns {*}
   */
  isPresent (id, callback) {

    return this.dataStructure.search(id, callback)
  }
}