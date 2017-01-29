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
    this.userAgent = process.env.USER_AGENT
    this.clientId = process.env.CLIENT_ID
    this.clientSecret = process.env.CLIENT_SECRET
    this.username = process.env.RUSERNAME
    this.password = process.env.RPASSWORD
  }

  /**
   * Return the configuration for connect to a reddit account
   * @returns {{userAgent: *, clientId: *, clientSecret: *, username: *, password: *}}
   */
  getConfig () {
    return {
      userAgent: this.userAgent,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      username: this.username,
      password: this.password
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
 * This class contains the parameters in order to connect to a Redis instance.
 */
class RedisConfig extends Config {

  /**
   * The constructor take and save inside the object state the environment
   * variables
   */
  constructor () {
    super()
    this.db = process.env.DBNAME || undefined
    this.password = process.env.DBPASSWORD || undefined
    this.host = process.env.DBHOST || undefined
    this.port = process.env.DBPORT || undefined
    this.url = process.env.DBURL || undefined
  }

  /**
   * It return the configuration to connect to a Redis database
   * @returns {{db: (*|undefined), password: (*|undefined), host: (*|undefined), port: (*|undefined), url: (*|undefined)}}
   */
  getConfig () {
    return {
      db: this.db,
      password: this.password,
      host: this.host,
      port: this.port,
      url: this.url
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
    this.pollingTime = process.env.POLLING_TIME || 5000
    this.subredditName = process.env.SUBREDDITNAME

    this.allowSubscribers = false
    if (process.env.ALLOW_NEW_SUBSCRIBERS === '1') {
      this.allowSubscribers = true
    }
  }

  /**
   * Return if it's possible to have new subscribers.
   * @returns {boolean}
   */
  isSubscribingAllowed () {
    return this.allowSubscribers
  }

  /**
   * Return the interval of time the bot should query reddit.
   * @returns {*|number}
   */
  getPollingTime () {
    return this.pollingTime
  }

  /**
   * Return the subreddit name where fetch information.
   * @returns {*}
   */
  getSubRedditName () {
    if (this.subredditName == null) {
      throw new Error('You must define a subreddit!')
    }

    return this.subredditName
  }
}

export const redditConfig = new RedditConfig()
export const telegramConfig = new TelegramConfig()
export const redisConfig = new RedisConfig()
export const generalConfig = new GeneralConfig()
