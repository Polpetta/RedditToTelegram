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

export class RedisDatabase extends Database {

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

  pushData (id, data, callback) {

    return this.dataStructure.save(id, data, callback)
  }

  getData (id, callback) {

    return this.dataStructure.retrieve(id, callback)
  }

  isPresent (id, callback) {

    return this.dataStructure.search(id, callback)
  }
}