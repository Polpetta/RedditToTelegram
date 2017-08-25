/**
 * Generic class where users are saved
 */
export class UserDatabase {

  /**
   * Save a user id into the subscription database
   * @param {string} id - The user id
   */
  subscribe (id) {}

  /**
   * Remove a user from the subscription database
   * @param {string} id - The user id
   */
  unsubscribe (id) {}

  /**
   * Get a list of users subscribed to the bot
   */
  getUserList () {}
}