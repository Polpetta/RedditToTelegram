/**
 * Created by davide on 04/01/17.
 */

import {Database} from '../database'
import {HashRedisDataStructureStrategy} from './dataStructureStrategy'
import RedisClient from 'redis'
import {redisConfig} from '../../utils/config'
import bluebird from 'bluebird'

bluebird.promisifyAll(RedisClient.RedisClient.prototype)
bluebird.promisifyAll(RedisClient.Multi.prototype)

/**
 * An instance of the Database designed to work with the Redis database.
 */
export class RedisDatabase extends Database {

  /**
   * It construct the RedisDatabase object, creating first a connection to
   * Redis.
   */
  constructor () {
    super()

    this.db = new RedisClient.createClient(redisConfig.getConfig()) // eslint-disable-line

    this.db.on('error', function (err) {
      // This error happen when using the bot with docker, so for the moment
      // I'll hide it.
      if (err !== 'ReplyError: ERR invalid DB index') {
        console.log('Error ' + err)
      }
    })

    this.dataStructure = new HashRedisDataStructureStrategy(this.db)
  }

  /**
   * Save given data with a specific id on Redis.
   * @param {string} id - The data identifier
   * @param {Object} data - The data the user want to save
   * @returns {Promise}
   */
  pushData (id, data) {
    const self = this

    return new Promise(
      function (resolve, reject) {
        self.dataStructure.save(id, data, function (err) {
          if (err == null) {
              // I Don't need to check the object, only if there
              // are errors
            resolve()
          }
          reject(err)
        })
      })
  }

  /**
   * Return the data saved with a specific id on Redis
   * @param {string} id - The data identifier
   * @returns {Promise}
   */
  getData (id) {
    const self = this

    return new Promise(
      function (resolve, reject) {
        self.dataStructure.retrieve(id, function (err, data) {
          if (err == null) {
            resolve(data)
          } else {
            reject(err)
          }
        })
      }
    )
  }

  /**
   * Checks if the id it's already present in the database. It'll call a
   * callback containing a boolean value: true if there is some data with
   * the given id, false otherwise.
   * @param {string} id - The data identifier
   * @returns {Promise}
   */
  isPresent (id) {
    const self = this

    return new Promise(
      function (resolve, reject) {
        self.dataStructure.search(id, function (err, obj) {
          if (err === null) {
            if (obj === 1) {
              resolve(true)
            }
            resolve(false)
          }
          reject(err)
        })
      })
  }
}
