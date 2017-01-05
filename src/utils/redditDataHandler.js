/**
 * Created by davide on 04/01/17.
 */

export class RedditDataHandler {
  static purgeUnusefulFields (data) {
    return {
      domain: data.domain,
      id: data.id,
      title: data.title,
      selftext: data.selftext,
      isSelf: data.is_self,
      author: data.author,
      created_utc: data.create_utc,
      permalink: data.permalink,
      url: data.url
    }
  }
}
