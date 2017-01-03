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
    this.token = process.env.TOKEN
  }

  getConfig () {
    return {
      token: this.token
    }
  }
}

class RedisConfig extends Config {

  constructor () {
    super ()
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

export const redditConfig = new RedditConfig()
export const telegramConfig = new TelegramConfig()
export const redisConfig = new RedisConfig()