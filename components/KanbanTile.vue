<template>
  <div>
    <v-card draggable="true" @dragstart="dragStart()" @dragend="dragEnd()" class="tile-container">
      <v-expansion-panel>
        <v-expansion-panel-content>
          <v-card-title slot="header" class="tile-title">
            <v-text-field v-model="tile.title"/>
          </v-card-title>
          <v-divider/>
          <v-card-text>
            <v-textarea auto-grow :value="this.tile.body"></v-textarea>
            <v-btn icon @click="tileDeletionDialog = true">
              <v-icon>delete_outline</v-icon>
            </v-btn>
          </v-card-text>
        </v-expansion-panel-content>
      </v-expansion-panel>
    </v-card>

    <v-dialog v-model="tileDeletionDialog" max-width="290">
      <v-card>
        <v-card-title class="headline">Confirm</v-card-title>
        <v-card-text>Delete {{ this.tile.title }} ?</v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="green darken-1"
            flat="flat"
            @click="deleteTile();tileDeletionDialog = false"
          >Delete</v-btn>
          <v-btn color="green darken-1" flat="flat" @click="tileDeletionDialog = false">Cancel</v-btn>
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
      tileDeletionDialog: false
    }
  },
  methods: {
    dragStart() {
      this.$emit('dragStartTile', this.tile.tileId)
    },
    dragEnd() {
      this.$emit('dragEndTile')
    },
    deleteTile() {
      this.$emit('deleteTile', this.tile.tileId)
    }
  }
}
</script>

<style>
.tile-container {
  width: 100%;
  margin: 0px;
}

.tile-title {
  height: 1em;
}
</style>
