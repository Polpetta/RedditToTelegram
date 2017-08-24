/**
 * Created by davide on 04/01/17.
 */

/**
 * The abstract class of a general Database.
 * In our case, a database should allow us to push some data, retrive it and
 * check if it's present.
 */
export class Database {

  /**
   * Push some data inside the database
   * @param {string} id - The id to save the data with
   * @param {Object} data - An object to store in the database
   */
  put (id, data) {}

  /**
   * Retrieve data from the database with a given id
   * @param {string} id - The data's unique id
   */
  get (id) {}

  /**
   * Delete the data if present
   * @param {string} id - The data to delete
   */
  remove (id) {}
}
