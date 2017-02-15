/**
 * Created by davide on 04/02/17.
 */

import {Database} from '../database'
import netdb from 'nedb-core'

/**
 * This class differs from the other database because its aim is to work
 * only in RAM, without any storage. This lead to different type of benefit:
 * - Speed improvement (no need to do query over the network)
 * - No cache/temporary data saved after execution (all the data are kept in
 * RAM)
 *
 * On the other hand, it has some downsides:
 * - All the data are kept in RAM, so a lot of data is equal to a lot of
 * memory consumption
 * - Data can't be saved anywhere
 */
export class InMemoryDatabase extends Database {

  /**
   * Class constructor. It call the super class constructor and initialize
   * netdb, the in memory database.
   */
  constructor() {
    super ()
    this._netbd = new netdb ()
  }

  /**
   * This method pushes data into the cache.
   * @param {string} id - The unique id for that data
   * @param {Object} data - The data to save
   * @returns {Promise}
   */
  pushData(id, data) {

    const self = this

    return new Promise (
      function (resolve, reject) {

        const toInsert = {
          postId : id,
          content: data
        }

        self._netbd.insert(toInsert, function (err, newDoc){

          if (err == null) {
            resolve ()
          } else {
            reject (err)
          }
        })
      }
    )
  }

  /**
   * This method allow the user to retrieve data from the cache
   * @param {string} id - The unique identifier for the data
   * @returns {Promise}
   */
  getData(id) {

    const self = this

    return new Promise (
      function (resolve, reject) {

        self._netbd.findOne (
          {
            postId : id
          },
          function (err, doc) {
            if (err == null) {
              if (doc != null) {
                resolve (doc.content)
              } else {
                resolve (null)
              }
            } else {
              reject (err)
            }
          }
        )
      }
    )
  }

  /**
   * isPresent checks if some data with a given id it's already in the cache
   * @param {string} id - The unique identifier for the data
   * @returns {Promise}
   */
  isPresent(id) {

    const self = this

    return new Promise (
      function (resolve, reject) {

        self.getData(id)
          .then(function (data) {
            if (data == null) {
              resolve(false)
            } else {
              resolve(true)
            }
          }).catch(function (err) {
            reject (err)
          })
      }
    )
  }
}