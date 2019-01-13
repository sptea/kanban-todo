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
  createRow(state, rowCreationData) {
    let rowId = null
    do {
      rowId = Util.createRandomString(5, rowCreationData.originToken)
    } while (state.rowList.filter(row => row.rowId === rowId).length !== 0)

    state.rowList.push({
      title: rowCreationData.rowTitle,
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
  createRow(context, rowCreationData) {
    context.commit('createRow', rowCreationData)
  }
}
