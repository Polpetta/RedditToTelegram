/**
 * Created by davide on 04/03/17.
 */

import {SearchableFIFO} from '../../../src/utils/dataStructure/SearchableFIFO'
import chai from 'chai'

/* eslint-env mocha */
describe('SearchableFIFO', function () {
  const id = 42
  const data = {
    testField: 'hello'
  }
  const fifo = new SearchableFIFO(25)

  it('should push and found data', function () {
    fifo.pushData(id, data)

    // Checking
    return chai.expect(fifo.isPresent(id)).to.equal(true)
  })

  it('should remove old data', function () {
    const randomData = {
      testField: 'something'
    }

    for (let i = 0; i < 25; i++) {
      fifo.pushData(i, randomData)
    }

    // Checking
    return chai.expect(fifo.isPresent(id)).to.equal(false)
  })
})
