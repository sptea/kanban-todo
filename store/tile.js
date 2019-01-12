import Util from '~/common/util.js'

export const state = () => ({
  tileList: [],
  draggingTileId: null
})

export const mutations = {
  setTileList(state, tileList) {
    state.tileList = tileList
  },
  moveTileToTargetRow(state, rowId) {
    state.tileList.find(
      tile => tile.tileId === state.draggingTileId
    ).rowId = rowId
  },
  setDraggingTileId(state, tileId) {
    state.draggingTileId = tileId
  },
  deleteTileByTileId(state, tileId) {
    state.tileList = state.tileList.filter(tile => tile.tileId !== tileId)
  },
  deleteTileByRowId(state, rowId) {
    state.tileList = state.tileList.filter(tile => tile.rowId !== rowId)
  },
  createTile(state, createTileData) {
    let tileId = null
    do {
      tileId = Util.createRandomString(8)
    } while (state.tileList.filter(tile => tile.tileId === tileId).length !== 0)

    state.tileList.push({
      title: createTileData.title,
      tileId: tileId,
      rowId: createTileData.rowId,
      body: ''
    })
  }
}

export const actions = {
  setTileList(context, tileList) {
    context.commit('setTileList', tileList)
  },
  moveTileToTargetRow(context, rowId) {
    context.commit('moveTileToTargetRow', rowId)
  },
  setDraggingTileId(context, tileId) {
    context.commit('setDraggingTileId', tileId)
  },
  deleteTileByTileId(context, tileId) {
    context.commit('deleteTileByTileId', tileId)
  },
  deleteTileByRowId(context, rowId) {
    context.commit('deleteTileByRowId', rowId)
  },
  createTile(context, createTileData) {
    context.commit('createTile', createTileData)
  }
}
