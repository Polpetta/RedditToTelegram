package net.polpetta.rtt.connectors.reddit;

import akka.actor.AbstractLoggingActor;
import akka.actor.Props;
import akka.pattern.Backoff;
import akka.pattern.BackoffSupervisor;
import net.dean.jraw.RedditClient;
import net.dean.jraw.references.SelfUserReference;
import scala.concurrent.duration.FiniteDuration;

import java.time.Duration;

public class RedditService extends AbstractLoggingActor {

    private RedditClient redditClient;
    private SelfUserReference botInfo;

    static class Login {

        private String username;
        private String password;
        private String clientId;
        private String clientSecret;
        private String userAgent;

        Login (
                String username,
                String password,
                String clientId,
                String clientSecret,
                String userAgent
        ) {
            this.username = username;
            this.password = password;
            this.clientId = clientId;
            this.clientSecret = clientSecret;
            this.userAgent = userAgent;
        }

        String getUsername() {
            return username;
        }

        String getPassword() {
            return password;
        }

        String getClientId() {
            return clientId;
        }

        String getClientSecret() {
            return clientSecret;
        }

        String getUserAgent() {
            return userAgent;
        }
    }

    @Override
    public Receive createReceive() {
        return receiveBuilder()
                .match(Login.class, login -> {
                    final Props loginWorker = Props.create(RedditLogin.class);
                    final Props backoffLoginner = BackoffSupervisor.props(
                            Backoff.onStop(
                                    loginWorker,
                                    "loginWorker",
                                    Duration.ofSeconds(3),
                                    Duration.ofSeconds(30),
                                    0.2,
                                    5
                            ).withAutoReset(FiniteDuration.apply(10, "SECONDS"))
                    );
                })
                .match(RedditClient.class, client -> {
                    this.redditClient = client;
                    this.botInfo = client.me();
                })
                .build();
    }
}
