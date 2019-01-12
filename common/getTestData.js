import axios from 'axios'

export default {
  async getTestRowList() {
    return (await axios.get('/testRowList.json')).data
  },
  async getTestTileList() {
    return (await axios.get('/testTileList.json')).data
  }
}
