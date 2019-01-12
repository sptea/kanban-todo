import Util from '~/common/util.js'

export const state = () => ({
  rowList: []
})

export const mutations = {
  setRowList(state, rowList) {
    state.rowList = rowList
  },
  setRowOver(state, rowId) {
    state.rowList.find(row => row.rowId === rowId).isOver = true
  },
  unsetRowOver(state, rowId) {
    state.rowList.find(row => row.rowId === rowId).isOver = false
  },
  unsetAllRowOver(state) {
    state.rowList.forEach(row => (row.isOver = false))
  },
  deleteRowByRowId(state, rowId) {
    state.rowList = state.rowList.filter(row => row.rowId !== rowId)
  },
  createRow(state, rowTitle) {
    let rowId = null
    do {
      rowId = Util.createRandomString(8)
    } while (state.rowList.filter(row => row.rowId === rowId).length !== 0)

    state.rowList.push({
      title: rowTitle,
      rowId: rowId
    })
  }
}

export const actions = {
  setRowList(context, rowList) {
    context.commit('setRowList', rowList)
  },
  setRowOver(context, rowId) {
    context.commit('setRowOver', rowId)
  },
  unsetRowOver(context, rowId) {
    context.commit('unsetRowOver', rowId)
  },
  unsetAllRowOver(context) {
    context.commit('unsetAllRowOver')
  },
  deleteRowByRowId(context, rowId) {
    context.commit('deleteRowByRowId', rowId)
  },
  createRow(context, rowTitle) {
    context.commit('createRow', rowTitle)
  }
}
