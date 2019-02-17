package net.polpetta.rtt.connectors.reddit;

import akka.actor.AbstractLoggingActor;
import akka.actor.Props;
import net.dean.jraw.RedditClient;
import net.dean.jraw.http.OkHttpNetworkAdapter;
import net.dean.jraw.http.UserAgent;
import net.dean.jraw.oauth.Credentials;
import net.dean.jraw.oauth.OAuthHelper;

class RedditLogin extends AbstractLoggingActor {

    // TODO create two child services: the Reddit fetcher actor and the Reddit push actor

    static public Props props() {
        return Props.create(RedditLogin.class, RedditLogin::new);
    }

    class LoginException extends RedditException {

        private LoginException() {
            super();
        }

        private LoginException(String text) {
            super(text);
        }
    }

    @Override
    public Receive createReceive() {
        return receiveBuilder()
                .match(RedditService.Login.class, login -> {
                    try {
                        log().debug("Trying to login into Reddit with user agent " + login.getUserAgent());
                        Credentials cred = Credentials.script(
                                login.getUsername(),
                                login.getPassword(),
                                login.getClientId(),
                                login.getClientSecret()
                        );
                        UserAgent agent = new UserAgent(login.getUserAgent());

                        RedditClient client = OAuthHelper.automatic(new OkHttpNetworkAdapter(agent), cred);
                        log().info("Successfully logged into Reddit");
                        getContext().parent().tell(client, self());
                        getContext().stop(self());
                    } catch (IllegalArgumentException e) {
                        throw new LoginException("Error when logging into Reddit");
                    }
                })
                .build();
    }
}
