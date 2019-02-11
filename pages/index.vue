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
import ApiUtil from '~/common/apiUtil.js'

export default {
  components: {
    KanbanTable
  },
  data() {
    return {}
  },
  async asyncData({ store }) {
    await ApiUtil.getOriginToken(store)
    await ApiUtil.getBoard(store)
  }
}
</script>

<style>
.container {
  margin-top: 48px;
}
</style>
