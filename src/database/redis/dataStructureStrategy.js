/**
 * Created by davide on 04/01/17.
 */

import Hasha from 'hasha'

/**
 * This abstract class follow the Strategy design pattern.
 */
class AbstractRedisDataStructureStrategy {

  /**
   * Construct the class and save the pointer to the redis database
   * @param {RedisClient} redisPointer - The library to talk with Redis
   */
  constructor (redisPointer) {

    this.db = redisPointer
  }

  /**
   * Save the data in the database.
   * @param {string} id - The data identifier
   * @param {Object} data - The data to save
   */
  save (id, data) {}

  /**
   * Retrieve data from Redis
   * @param {string} id - The data identifier
   */
  retrieve (id) {}

  /**
   * Search if a given id is already in the database
   * @param {string} id - The data identifier
   */
  search (id) {}
}

/**
 * This method saves data in Redis using an hash.
 */
export class HashRedisDataStructureStrategy extends AbstractRedisDataStructureStrategy{

  /**
   * The class constructor
   * @param {RedisClient} redisDatabase - The library to talk with Redis
   */
  constructor (redisDatabase) {
    super(redisDatabase)
  }

  /**
   * It will compute the sha256 of the input string given
   * @param {string} id - The string to hash
   * @return {string} - The hashed string
   * @private
   */
  _getSha (id) {
    return Hasha(id, {algorithm: 'sha256'})
  }

  /**
   * Save the data in an Redis HSET
   * @param {string} id - The set's id
   * @param {Object} data - The object to save. Currently only data.sent
   * will be saved in the database
   * @param {Function} callback - Function to callback after the operation
   * @returns {*}
   */
  save (id, data, callback) {

    console.log ('Adding id: ' + id)
    return this.db.hset(this._getSha(id), 'sent', data.sent, callback)
  }

  /**
   * Retrieve the data from the HSET
   * @param {string} id - The set's id
   * @param {Function} callback - Function to callback after the operation
   * @returns {*}
   */
  retrieve (id, callback) {
    return this.db.hgetall(this._getSha(id), callback)
  }

  /**
   * Search if an hash set with a given id exists.
   * @param {string} id - The id to search
   * @param {Function} callback - Function to callback after the operation
   * @returns {*}
   */
  search (id, callback) {

    return this.db.hexists (this._getSha(id), 'sent', callback)
  }
}