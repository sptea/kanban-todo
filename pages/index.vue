<template>
  <v-app>
    <v-toolbar fixed dense scroll-off-screen class="blue-grey">
      <v-spacer/>
    </v-toolbar>
    <v-card class="container blue-grey lighten-5">
      <kanban-table/>
    </v-card>
    <v-footer class="blue-grey">
      <v-spacer></v-spacer>
    </v-footer>
  </v-app>
</template>

<script>
import KanbanTable from '~/components/KanbanTable.vue'
import ApiUtil from '~/common/apiUtil.js'

export default {
  components: {
    KanbanTable
  },
  async asyncData({ store }) {
    ApiUtil.setOriginToken(store) // TODO Shouldnt be called here
  }
}
</script>

<style>
.container {
  margin-top: 48px;
}
</style>
