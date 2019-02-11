<template>
  <div>
    <v-toolbar dense>
      <v-spacer/>
      <v-btn color="deep-orange" @click="rowCreationDialog=true" dark>Add row</v-btn>
    </v-toolbar>

    <v-divider/>
    <v-card
      v-for="row in this.rowList"
      :key="row.rowId"
      class="row amber lighten-5"
      :class="{'amber lighten-4': row.isOver}"
      :style="rowStyle"
      @dragover.prevent
      @dragenter.prevent
      @drop="onDrop(row.rowId)"
      @dragenter="dragEnter(row.rowId)"
      @dragleave="dragLeave(row.rowId)"
    >
      <v-toolbar color="deep-orange" dark dense>
        <v-toolbar-title>
          <v-text-field v-model="row.title" />
        </v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="tileCreationDialog=true;tileCreationData.rowId=row.rowId">
          <v-icon>add_circle_outline</v-icon>
        </v-btn>
        <v-btn icon @click="rowDeletionDialog=true;rowDeletionDialogData=row">
          <v-icon>delete_outline</v-icon>
        </v-btn>
      </v-toolbar>
      <kanban-tile
        :tile="tile"
        v-for="tile in getTilesInRow(row.rowId)"
        :key="tile.tileId"
        class="tile"
      />
    </v-card>

    <v-dialog v-model="rowCreationDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Row</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="rowCreationData.rowTitle"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" flat @click="createRow();rowCreationDialog = false">Create</v-btn>
          <v-btn color="blue darken-1" flat @click="rowCreationDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="tileCreationDialog" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Task</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="tileCreationData.title"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" flat @click="createTile();tileCreationDialog = false">Create</v-btn>
          <v-btn color="blue darken-1" flat @click="tileCreationDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="rowDeletionDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Delete {{ rowDeletionDialogData.title }} ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="green darken-1" flat="flat" @click="deleteRow();rowDeletionDialog = false">Delete</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="rowDeletionDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import KanbanTile from '~/components/KanbanTile.vue'

export default {
  components: {
    KanbanTile
  },
  data() {
    return {
      rowCreationDialog: false,
      rowCreationData: { oritinToken: null },
      rowDeletionDialog: false,
      rowDeletionDialogData: {},
      tileCreationDialog: false,
      tileCreationData: { oritinToken: null }
    }
  },
  computed: {
    rowStyle() {
      return {
        width: `${this.rowRadio}%`
      }
    },
    rowList() {
      return this.$store.state.row.rowList
    },
    tileList() {
      return this.$store.state.tile.tileList
    },
    rowRadio() {
      const percent = this.rowList ? 100 / this.rowList.length : 100
      return percent
    }
  },
  methods: {
    getTilesInRow(rowId) {
      const filteredTileList = this.tileList.filter(row => row.rowId === rowId)
      return filteredTileList
    },
    onDrop(rowId) {
      this.$store.dispatch('tile/moveTileToTargetRow', rowId)
    },
    dragEnter(rowId) {
      this.$store.dispatch('row/setRowOver', rowId)
    },
    dragLeave(rowId) {
      this.$store.dispatch('row/unsetRowOver', rowId)
    },
    dragEnd() {
      this.rowList.forEach(row => (row.isOver = false))
    },
    deleteRow() {
      this.$store.dispatch(
        'tile/deleteTileByRowId',
        this.rowDeletionDialogData.rowId
      )
      this.$store.dispatch(
        'row/deleteRowByRowId',
        this.rowDeletionDialogData.rowId
      )
      this.rowDeletionDialogData = {}
    },
    createRow() {
      this.rowCreationData.originToken = this.$store.state.access.originToken
      this.$store.dispatch('row/createRow', this.rowCreationData)
      this.rowCreationData = {}
    },
    createTile() {
      this.tileCreationData.originToken = this.$store.state.access.originToken
      this.$store.dispatch('tile/createTile', this.tileCreationData)
      this.tileCreationData = {}
    }
  }
}
</script>

<style>
.tile {
  margin: 0;
}
.row {
  vertical-align: top;
  display: inline-block;

  margin-top: 1em;
  height: 800px;
}
</style>