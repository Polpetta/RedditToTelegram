package net.polpetta.rtt.connectors.reddit;

import akka.actor.AbstractLoggingActor;
import akka.actor.Props;
import net.dean.jraw.RedditClient;

/**
 * Actor that has the task to check - for a given subreddit - if there are new posts. If new posts are detected, the
 * post is then forwarded for further processing.
 *
 * @see Subreddit
 */
public class SubmissionDiscover extends AbstractLoggingActor {

    private final RedditClient client;

    static public Props props(RedditClient client) {
        return Props.create(SubmissionDiscover.class, () -> new SubmissionDiscover(client));
    }

    public SubmissionDiscover(RedditClient client) {
        this.client = client;
    }

    @Override
    public Receive createReceive() {
        return receiveBuilder()
                .match(Subreddit.class, sub -> {
                    // TODO subreddit processing logic here
                })
                .build();
    }
}
