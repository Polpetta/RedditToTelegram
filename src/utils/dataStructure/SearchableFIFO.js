/**
 * Created by davide on 04/03/17.
 */

export class SearchableFIFO {

  constructor (maxNumberOfItems = 25) {
    this._maxNumberOfItems = maxNumberOfItems
    this._fifo = []
  }

  pushData (id, data) {
    if (this._fifo.length > this._maxNumberOfItems) {
      this._fifo.shift()
    }

    const toPush = {
      id: id,
      content: data
    }

    this._fifo.push(toPush)
  }

  getData (id) {
    let data = this._fifo.find((element) => {
      return id === element.id
    })

    if (data != null) {
      return data.content
    } else {
      return null
    }
  }

  isPresent (id) {
    const data = this.getData(id)

    console.log(data)

    if (data !== null) {
      return true
    }

    return false
  }
}
