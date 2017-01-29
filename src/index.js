/**
 * Created by davide on 29/12/16.
 */

import {EventHandler} from './utils/eventHandler'

/**
 * The main class. Do you need documentation also for this?
 */
class Main {

  /**
   * Main methods, that "launch" the program.
   */
  main () {

    const bot = new EventHandler()
    bot.run()
  }
}

new Main().main()
