/**
 * Created by davide on 01/01/17.
 */

import {RedditView} from './redditView'
import EventEmitter from 'events'
import RedisClient from 'redis'
import {redisConfig} from '../utils/config'

export class RedditController extends EventEmitter {

  constructor (subredditName, pollingTime) {
    super()
    this.subredditName = subredditName
    this.view = new RedditView(subredditName, pollingTime)
    // Problems with Standard style with "createClient" method
    this.redis = new RedisClient.createClient(redisConfig.getConfig()) // eslint-disable-line

    this.redis.on('error', function (err) {
      // This error happen when using the bot with docker, so for the moment
      // I'll hide it.
      if (err !== 'ReplyError: ERR invalid DB index') {
        console.log('Error ' + err)
      }
    })
  }

  checkNews (listOfNews) {
    /*
     * TODO: integration with redis database. The idea is to save all the
     * keys of the post and check in the database if there are new keys. I
     * will probably use a set. It's faster than using a simple txt.
     * If there are new entries I should emit an event and send the new posts
     * to Telegram
     *
     */

    const self = this
    listOfNews.then(function (data) {
      for (let i = 0; i < data.length; i++) {
        console.log('id: ' + data[i].id)
        console.log('Adding a new entry...')
        self.redis.sadd(self.subredditName, data[i].id, function () {
          console.log('New entry ' + data[i].id + ' added')
        })
      }
    })
  }

  getNewPosts () {
    const self = this
    this.view.on('newPosts', function (listOfNews) {
      self.checkNews(listOfNews)
    })
    this.view.startPolling()
  }
}
