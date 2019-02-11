import axios from 'axios'

export default {
  async getBoard() {
    const board = (await axios.get('/api/board')).data
    board.row.forEach(row => (row.isOver = false))

    board.rowList = board.row
    board.tileList = board.tile

    delete board.row
    delete board.tile

    return board
  },
  async postBoard(rowList, tileList) {
    const board = {
      row: rowList,
      tile: tileList
    }

    await axios.post('/api/board', board)
  },
  async setOriginToken(store) {
    const originToken = (await axios.get('/api/origin-token')).data
    store.dispatch('access/setOriginToken', originToken)
  }
}
