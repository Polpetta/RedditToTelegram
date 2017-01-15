/**
 * Created by davide on 29/12/16.
 */

class Config {

  getConfig () {

  }
}

class RedditConfig extends Config {

  constructor () {
    super()
    this.userAgent = process.env.USER_AGENT
    this.clientId = process.env.CLIENT_ID
    this.clientSecret = process.env.CLIENT_SECRET
    this.username = process.env.RUSERNAME
    this.password = process.env.RPASSWORD
  }

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

class TelegramConfig extends Config {

  constructor () {
    super()
    this.token = process.env.TTOKEN
  }

  getConfig () {
    return {
      token: this.token
    }
  }
}

class RedisConfig extends Config {

  constructor () {
    super()
    this.db = process.env.DBNAME || undefined
    this.password = process.env.DBPASSWORD || undefined
    this.host = process.env.DBHOST || undefined
    this.port = process.env.DBPORT || undefined
    this.url = process.env.DBURL || undefined
  }

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

class GeneralConfig extends Config {

  constructor () {
    super()
    this.pollingTime = process.env.POLLING_TIME || 5000
    this.subredditName = process.env.SUBREDDITNAME

    this.allowSubscribers = false
    if (process.env.ALLOW_NEW_SUBSCRIBERS === '1') {
      this.allowSubscribers = true
    }
  }

  isSubscribingAllowed () {
    return this.allowSubscribers
  }

  getPollingTime () {
    return this.pollingTime
  }

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
