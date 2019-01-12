<template>
  <v-app>
    <v-toolbar fixed dense scroll-off-screen class="amber darken-3">
      <v-spacer/>
    </v-toolbar>
    <v-card class="container amber lighten-3">
      <kanban-table/>
    </v-card>
  </v-app>
</template>

<script>
import KanbanTable from '~/components/KanbanTable.vue'
import GetTestData from '~/common/getTestData.js'

export default {
  components: {
    KanbanTable
  },
  data() {
    return {}
  },
  async asyncData({ store }) {
    const testRowList = await GetTestData.getTestRowList()
    const testTileList = await GetTestData.getTestTileList()
    testRowList.forEach(row => (row.isOver = false))

    store.dispatch('row/setRowList', testRowList)
    store.dispatch('tile/setTileList', testTileList)
  }
}
</script>

<style>
.container {
  margin-top: 48px;
}
</style>
