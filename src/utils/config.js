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
    this.refreshToken = process.env.REFRESH_TOKEN
  }

  getConfig () {
    return {
      userAgent: this.userAgent,
      clientId: this.clientId,
      clientSecret: this.clientSecret,
      refreshToken: this.refreshToken
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

export const redditConfig = new RedditConfig()
export const telegramConfig = new TelegramConfig()
