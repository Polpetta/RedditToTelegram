/**
 * Created by davide on 04/03/17.
 */

export class SearchableFIFO {

  constructor (maxNumberOfItems = 25) {
    this._maxNumberOfItems = maxNumberOfItems
    this._fifo = []
  }

  push (id, data) {
    const toPush = {
      id: id,
      content: data
    }

    this._fifo.push(toPush)
    this._fifo.length = this._maxNumberOfItems
  }

  push_head(id, data) {

    const toPush = {
      id: id,
      content: data
    }

    this._fifo.unshift(toPush)
    this._fifo.length = this._maxNumberOfItems
  }

  get (id) {
    let data = this._fifo.find((element) => {
      if (element) {
        return id === element.id
      }

      return false
    })

    if (data) {
      return data.content
    } else {
      return null
    }
  }
}
