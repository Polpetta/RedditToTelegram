package net.polpetta.rtt.reddit;

import akka.actor.ActorRef;
import akka.actor.ActorSystem;

import java.util.ArrayList;
import java.util.List;
import java.util.concurrent.atomic.AtomicBoolean;

/**
 * The role of this class is to trigger new posts search, and consequently start the event chain when a new post is
 * discovered.
 */
public class RedditFetcher {

    private static final int REDDIT_MAX_REQUESTS_PER_MINUTE_MS = 2000;

    private final int pollingIntervalInMs;
    private final ActorSystem actorSystem;
    private List<Subreddit> subsToQuery;
    private final AtomicBoolean isRunning;
    private final ActorRef postsDiscover;

    /**
     * Builds the necessary data structures to start a Reddit posts fetcher
     * @param pollingIntervalInMs - how many requests the fetcher has to make to Reddit
     * @param actorSystem - the actor system to use to set-up the necessary actors
     * @param subsToQuery - a list of subreddits to check
     */
    public RedditFetcher(int pollingIntervalInMs,
                         ActorSystem actorSystem,
                         List<Subreddit> subsToQuery) {
        // Note: Reddit limits request up to 60 per minutes https://github.com/reddit-archive/reddit/wiki/API
        this.pollingIntervalInMs = pollingIntervalInMs <= REDDIT_MAX_REQUESTS_PER_MINUTE_MS?
                REDDIT_MAX_REQUESTS_PER_MINUTE_MS : pollingIntervalInMs;
        this.actorSystem = actorSystem;
        if (subsToQuery != null) {
            this.subsToQuery = subsToQuery;
        } else {
            this.subsToQuery = new ArrayList<>();
        }
        this.isRunning = new AtomicBoolean(false);
        // FIXME is actorOf what I really want here? Fix the 'props' method call
        this.postsDiscover = actorSystem.actorOf(SubmissionDiscover.props());
    }

    /**
     * Starts the polling action
     */
    public void run() {
        isRunning.set(true);
        while (isRunning.get()) {
            for (Subreddit sub : subsToQuery) {
                // FIXME: there must be another way to wait between two polling interval
                Thread.sleep(pollingIntervalInMs);
                postsDiscover.tell(postsDiscover, ActorRef.noSender());
            }
        }
    }

    /**
     * Stops the polling action
     */
    public void stop() {
        isRunning.set(false);
    }

    // TODO add method to update subreddit list.
}
