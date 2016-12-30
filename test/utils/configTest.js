/**
 * Created by davide on 30/12/16.
 */

import {redditConfig, telegramConfig} from '../../src/utils/config'
import chai from 'chai'

/* eslint-env mocha */
describe('Config Singletons', function () {
  describe('Reddit', function () {
    it('should return an empty object', function () {
      return chai.expect(redditConfig.getConfig()).to.not.undefined
    })
  })

  describe('Telegram', function () {
    it('should return an empty object', function () {
      return chai.expect(telegramConfig.getConfig()).to.not.undefined
    })
  })
})
