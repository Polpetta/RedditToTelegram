package net.polpetta.rtt.reddit;

import akka.actor.AbstractActor;
import akka.actor.ActorRef;
import akka.actor.Props;

/**
 * Actor that has the task to check - for a given subreddit - if there are new posts. If new posts are detected, the
 * post is then forwarded for further processing.
 *
 * @see Subreddit
 */
public class SubmissionDiscover extends AbstractActor {

    private final ActorRef postProcessor;

    static public Props props(String message, ActorRef postProcessor) {
        return Props.create(SubmissionDiscover.class, () -> new SubmissionDiscover(postProcessor));
    }

    public SubmissionDiscover(ActorRef postProcessor) {
        this.postProcessor = postProcessor;
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
