package net.polpetta.rtt.core;

import akka.actor.ActorSystem;

public class BotLauncher {

    private final ActorSystem actorSystem;

    public BotLauncher() {
        actorSystem = ActorSystem.create("rtt-core");
    }

    public void run() {
        /* TODO in the run function we need to:
         * - check for an existing db (or create a new one)
         * - initialize all the connectors
         */

    }
}
