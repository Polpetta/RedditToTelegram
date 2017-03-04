/**
 * Created by davide on 04/03/17.
 */


export class SearchableFIFO{

  constructor (maxNumberOfItems = 25) {

    this._maxNumberOfItems = maxNumberOfItems
    this._fifo = []
  }

  pushData (id, data) {

    if (this._fifo.length > this._maxNumberOfItems) {
      this._fifo.pop()
    }

    const toPush = {
      id : id,
      content : data
    }

    this._fifo.push(toPush)
  }

  getData (id, data) {

    let content = this._fifo.find((element) => {
      return id === element.id
    })

    if (content !== null) {
      return content.data
    } else {
      return null
    }
  }

  isPresent (id) {

    if (this.getData(id) !== null) {
      return true
    }

    return false
  }
}