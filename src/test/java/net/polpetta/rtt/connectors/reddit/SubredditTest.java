package net.polpetta.rtt.connectors.reddit;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;

public class SubredditTest {

    private final String SUB_NAME="test123";
    private final String ID_NAME="abcd123";
    private Subreddit sub;

    @Before
    public void initialize() {
        sub = new Subreddit(SUB_NAME, ID_NAME);
    }

    @Test
    public void shouldReturnTheSameSubName() {
        assertEquals(sub.getName(), SUB_NAME);
    }

    @Test
    public void shouldReturnTheSameId() {
        assertEquals(sub.getLastPostSeenId(), ID_NAME);
    }
}
