import axios from 'axios'

export default {
  async getBoard(store) {
    const board = (await axios.get('/api/board')).data
    console.log(board)
    let rowList = board.row
    let tileList = board.tile

    rowList.forEach(row => (row.isOver = false))

    store.dispatch('row/setRowList', rowList)
    store.dispatch('tile/setTileList', tileList)
  },
  async getOriginToken(store) {
    const originToken = await axios.get('/api/origin-token').data
    store.dispatch('access/setOriginToken', originToken)
  }
}
