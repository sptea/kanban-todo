<template>
  <div>
    <v-card draggable="true" @dragstart="dragStart()" @dragend="dragEnd()" class="tile-container">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <v-card-title slot="header" class="title">{{ this.tile.title }}</v-card-title>
          <v-divider/>
          <v-card-text>
            <v-textarea auto-grow :value="this.tile.body"></v-textarea>
            <v-btn icon @click="deleteDialog = true">
              <v-icon>delete_outline</v-icon>
            </v-btn>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>

    <v-dialog v-model="deleteDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Delete {{ this.tile.title }} ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteTile();deleteDialog = false"
          >Delete</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="deleteDialog = false">Cancel</v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </div>
</template>

<script>
export default {
  props: {
    tile: Object
  },
  data() {
    return {
      deleteDialog: false
    }
  },
  methods: {
    dragStart() {
      this.$store.dispatch('tile/setDraggingTileId', this.tile.tileId)
    },
    dragEnd() {
      this.$store.dispatch('row/unsetAllRowOver')
      this.$store.dispatch('tile/setDraggingTileId', null)
    },
    deleteTile() {
      this.$store.dispatch('tile/deleteTileByTileId', this.tile.tileId)
    }
  }
}
</script>

<style>
.tile-container {
  width: 100%;
  margin: 0px;
}

.title {
  height: 1em;
}
</style>
