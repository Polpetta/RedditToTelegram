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
    this.db = process.env.DBNAME || "rtt" // Stands for "Reddit-to-Telegram"
    this.password = process.env.DBPASSWORD
    this.host = process.env.DBHOST || "127.0.0.1"
    this.port = process.env.DBPORT || 6379
  }

  getConfig () {
    return {
      db: this.db,
      password: this.password,
      host: this.host,
      port: this.port
    }
  }
}

export const redditConfig = new RedditConfig()
export const telegramConfig = new TelegramConfig()
export const redisConfig = new RedisConfig()