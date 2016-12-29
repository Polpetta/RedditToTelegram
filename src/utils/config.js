/**
 * Created by davide on 29/12/16.
 */

class Config {

}

class RedditConfig extends Config {
  constructor () {
    super()
    this.userAgent = process.env.USER_AGENT
    this.clientId = process.env.CLIENT_ID
    this.clientSecret = process.env.CLIENT_SECRET
    this.refreshToken = process.env.REFRESH_TOKEN
  }
}

class TelegramConfig extends Config {
  constructor () {
    super()
    this.token = process.env.TOKEN
  }
}

export const redditConfig = new RedditConfig()
export const telegramConfig = new TelegramConfig()
