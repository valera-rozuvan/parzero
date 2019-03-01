<template>
  <v-container fluid fill-height fill-width>
    <v-layout align-space-around justify-space-around column fill-height fill-width>
      <div class="item elevation-5"></div>
      <div class="item elevation-5">
        <v-container fluid grid-list-xl fill-width>
          <v-layout justify-start row fill-height wrap>
            <MainChessBoard></MainChessBoard>
            <MainChessBoard></MainChessBoard>
          </v-layout>
        </v-container>
      </div>
      <div class="item elevation-5"></div>
    </v-layout>
  </v-container>
</template>

<script>
import MainChessBoard from '@/components/main-chess-board.vue';

export const Observer = {
  name: 'Observer',
  layout: 'baseline',
  components: {
    MainChessBoard
  }
};

export default Observer;
</script>

<style>
.item {
  min-height: 50px;
  min-width: 80px;
  margin: 10px;
}
</style>
