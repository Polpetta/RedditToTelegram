/**
 * Created by davide on 29/12/16.
 */

/**
 * This is an abstract object for a generic configuration
 */
class Config {

  getConfig () {

  }
}

/**
 * This is the configuration parameters for Reddit
 */
class RedditConfig extends Config {

  /**
   * The constructor simply take all the environment variables and save in
   * the object state
   */
  constructor () {
    super()
    this._userAgent = process.env.USER_AGENT
    this._clientId = process.env.CLIENT_ID
    this._clientSecret = process.env.CLIENT_SECRET
    this._username = process.env.RUSERNAME
    this._password = process.env.RPASSWORD
  }

  /**
   * Return the configuration for connect to a reddit account
   * @returns {{userAgent: *, clientId: *, clientSecret: *, username: *, password: *}}
   */
  getConfig () {
    return {
      userAgent: this._userAgent,
      clientId: this._clientId,
      clientSecret: this._clientSecret,
      username: this._username,
      password: this._password
    }
  }
}

/**
 * Contains the configuration for telegram
 */
class TelegramConfig extends Config {

  /**
   * The constructor fetch and save the environment variables
   */
  constructor () {
    super()
    this.token = process.env.TTOKEN
  }

  /**
   * Return the configuration in order to connect to Telegram
   * @returns {{token: *}}
   */
  getConfig () {
    return {
      token: this.token
    }
  }
}

/**
 * This class contains general parameters
 */
class GeneralConfig extends Config {

  /**
   * The constructor take and save inside the object state the environment
   * variables
   */
  constructor () {
    super()
    this._pollingTime = process.env.POLLING_TIME || 5000
    this._subredditName = process.env.SUBREDDITNAME
    this._dbPath = process.env.DB_PATH || './.data/subscriptions'

    this._allowSubscribers = false
    if (process.env.ALLOW_NEW_SUBSCRIBERS === '1') {
      this._allowSubscribers = true
    }
  }

  /**
   * Return if it's possible to have new subscribers.
   * @returns {boolean}
   */
  isSubscribingAllowed () {
    return this._allowSubscribers
  }

  /**
   * Return the interval of time the bot should query reddit.
   * @returns {*|number}
   */
  getPollingTime () {
    return this._pollingTime
  }

  /**
   * Return the subreddit name where fetch information.
   * @returns {*}
   */
  getSubRedditName () {
    if (this._subredditName == null) {
      throw new Error('You must define a subreddit!')
    }

    return this._subredditName
  }

  /**
   * Return the path for the user database.
   * @returns {*|string}
   */
  getDbPath () {
    return this._dbPath
  }
}

export const redditConfig = new RedditConfig()
export const telegramConfig = new TelegramConfig()
export const generalConfig = new GeneralConfig()
