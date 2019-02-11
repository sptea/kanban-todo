<template>
  <div>
    <v-toolbar dense>
      <v-spacer/>
      <v-btn color="deep-orange" @click="saveBoard()" dark>test</v-btn>
      <v-btn color="deep-orange" @click="dialog.rowCreation=true" dark>Add row</v-btn>
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
          <v-text-field v-model="row.title"/>
        </v-toolbar-title>
        <v-spacer/>
        <v-btn icon @click="dialog.tileCreation=true;dialog.tileCreationData.rowId=row.rowId">
          <v-icon>add_circle_outline</v-icon>
        </v-btn>
        <v-btn icon @click="dialog.rowDeletion=true;dialog.rowDeletionData=row">
          <v-icon>delete_outline</v-icon>
        </v-btn>
      </v-toolbar>
      <kanban-tile
        :tile="tile"
        v-for="tile in getTilesInRow(row.rowId)"
        :key="tile.tileId"
        class="tile"
        @dragStartTile="dragStartTile(tile.tileId)"
        @dragEndTile="dragEndTile()"
        @deleteTile="deleteTile(tile.tileId)"
      />
    </v-card>

    <v-dialog v-model="dialog.rowCreation" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Row</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="dialog.rowCreationData.rowTitle"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" flat @click="createRow();dialog.rowCreation = false">Create</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog.rowCreation = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.tileCreation" persistent max-width="600px">
      <v-card>
        <v-card-title>
          <span class="headline">Add Task</span>
        </v-card-title>
        <v-card-text>
          <v-text-field label="Title" v-model="dialog.tileCreationData.title"/>
        </v-card-text>
        <v-card-actions>
          <v-spacer/>
          <v-btn color="blue darken-1" flat @click="createTile();dialog.tileCreation = false">Create</v-btn>
          <v-btn color="blue darken-1" flat @click="dialog.tileCreation = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>

    <v-dialog v-model="dialog.rowDeletion" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Delete {{ dialog.rowDeletionData.title }} ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteRow();dialog.rowDeletion = false"
          >Delete</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="dialog.rowDeletion = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
import KanbanTile from '~/components/KanbanTile.vue'
import ApiUtil from '~/common/apiUtil.js'
import Util from '~/common/util.js'

export default {
  components: {
    KanbanTile
  },
  data() {
    return {
      dialog: {
        rowCreation: false,
        rowCreationData: {},
        rowDeletion: false,
        rowDeletionData: {},
        tileCreation: false,
        tileCreationData: {}
      },
      draggingTileId: null,
      rowList: [],
      tileList: []
    }
  },
  async mounted() {
    const board = await ApiUtil.getBoard()
    this.rowList = board.rowList
    this.tileList = board.tileList
  },
  computed: {
    rowStyle() {
      return {
        width: `${this.rowRadio}%`
      }
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
      this.tileList.find(
        tile => tile.tileId === this.draggingTileId
      ).rowId = rowId
      this.dragEndTile()
    },
    dragEnter(rowId) {
      this.rowList.find(row => row.rowId === rowId).isOver = true
    },
    dragLeave(rowId) {
      this.rowList.find(row => row.rowId === rowId).isOver = false
    },
    dragEndTile() {
      this.rowList.forEach(row => (row.isOver = false))
      this.draggingTileId = null
    },
    deleteRow() {
      const rowId = this.dialog.rowDeletionData.rowId
      this.tileList = this.tileList.filter(tile => tile.rowId !== rowId)
      this.rowList = this.rowList.filter(row => row.rowId !== rowId)
      this.dialog.rowDeletionData = {}
    },
    createRow() {
      let rowId = null
      do {
        rowId = Util.createRandomString(5, this.$store.state.access.originToken)
      } while (this.rowList.filter(row => row.rowId === rowId).length !== 0)

      this.rowList.push({
        title: this.dialog.rowCreationData.rowTitle,
        rowId: rowId
      })
      this.dialog.rowCreationData = {}
    },
    createTile() {
      let tileId = null
      do {
        tileId = Util.createRandomString(
          5,
          this.$store.state.access.originToken
        )
      } while (
        this.tileList.filter(tile => tile.tileId === tileId).length !== 0
      )
      this.tileList.push({
        title: this.dialog.tileCreationData.title,
        tileId: tileId,
        rowId: this.dialog.tileCreationData.rowId,
        body: ''
      })
      this.dialog.tileCreationData = {}
    },
    dragStartTile(tileId) {
      this.draggingTileId = tileId
    },
    deleteTile(tileId) {
      this.tileList = this.tileList.filter(tile => tile.tileId !== tileId)
    },
    saveBoard() {
      console.log('save')
      ApiUtil.postBoard(this.rowList, this.tileList)
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