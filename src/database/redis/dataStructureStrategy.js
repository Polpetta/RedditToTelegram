/**
 * Created by davide on 04/01/17.
 */

import Hasha from 'hasha'

class AbstractRedisDataStructureStrategy {

  constructor (redisPointer) {

    this.db = redisPointer
  }

  save (id, data) {}

  retrieve (id) {}

  search (id) {}
}

export class HashRedisDataStructureStrategy extends AbstractRedisDataStructureStrategy{

  constructor (redisDatabase) {
    super(redisDatabase)
  }

  _getSha (id) {
    return Hasha(id, {algorithm: 'sha256'})
  }

  save (id, data, callback) {

    console.log ('Adding id: ' + id)
    return this.db.hset(this._getSha(id), 'sent', data.sent, callback)
  }

  retrieve (id, callback) {
    return this.db.hgetall(this._getSha(id), callback)
  }

  search (id, callback) {

    return this.db.hexists (this._getSha(id), 'sent', callback)
  }
}