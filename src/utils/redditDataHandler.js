/**
 * Created by davide on 04/01/17.
 */

/**
 * This class normalize data coming from Reddit
 */
export class RedditDataHandler {
  /**
   * Return a new smaller object without all the fields, making it lighter.
   * @param {Object} data - A raw Reddit post
   * @returns {{domain: (*|string), id, title, selftext: *, isSelf: *, author: (*|exports.PACKAGE_SCHEMA.properties.author|{anyOf, optional}|exports.baseTags.author|{mustHaveValue, onTagged}|exports.DOCLET_SCHEMA.properties.author), created_utc: *, permalink: *, url}}
   */
  static purgeUnusefulFields (data) {
    let tweetSelf = ''

    if (data.selftext.length > 3500) {
      tweetSelf = data.selftext.substring(0, 3500) + '\n...'
    }

    return {
      subreddit: data.subreddit,
      domain: data.domain,
      id: data.id,
      title: data.title,
      selftext: data.selftext,
      isSelf: data.is_self,
      author: data.author.name,
      created_utc: data.create_utc,
      permalink: data.permalink,
      url: data.url,
      nsfw: data.over_18,
      tweetSelf: tweetSelf
    }
  }
}
