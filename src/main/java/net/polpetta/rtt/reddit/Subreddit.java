package net.polpetta.rtt.reddit;

/**
 * This POJO class contains the information regarding a subreddit, and holds the last seen post id.
 */
public class Subreddit {

    private final String name;
    private String lastPostSeenId;

    Subreddit(String name, String lastPostSeenId) {
        this.name = name;
        this.lastPostSeenId = lastPostSeenId;
    }

    public String getName() {
        return name;
    }

    public String getLastPostSeenId() {
        return lastPostSeenId;
    }

    public void setLastPostSeenId(String lastPostSeenId) {
        this.lastPostSeenId = lastPostSeenId;
    }
}
