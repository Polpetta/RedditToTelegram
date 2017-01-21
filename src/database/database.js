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
  pushData (id, data) {}

  /**
   * Retrieve data from the database with a given id
   * @param {string} id - The data's unique id
   */
  getData (id) {}

  /**
   * Checks if the data identified with the id are already present
   * @param {string} id - The data's unique id
   */
  isPresent (id) {}
}
