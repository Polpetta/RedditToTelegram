/**
 * Created by davide on 29/12/16.
 */

import {EventHandler} from './utils/eventHandler'

class Main {

  main () {

    const bot = new EventHandler()
    bot.run()
  }
}

new Main().main()
