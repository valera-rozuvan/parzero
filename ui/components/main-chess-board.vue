<template>
  <v-flex shrink ma-2 class="blue merida">
    <div ref="chess-board-el" class="cg-board-wrap"></div>
  </v-flex>
</template>

<script>
import { Chessground } from 'chessground';

export const MainChessBoard = {
  name: 'MainChessBoard',
  data: () => {
    return {
      cbEl: null
    };
  },
  methods: {
    handleResize() {
      this.cbEl.style.width = `50vh`;
      this.cbEl.style.height = `50vh`;

      document.body.dispatchEvent(new Event('chessground.resize'));
    }
  },
  mounted() {
    this.cbEl = this.$refs['chess-board-el'];
    Chessground(this.cbEl);

    window.addEventListener('resize', this.handleResize);
    this.handleResize();
  },
  destroyed() {
    window.removeEventListener('resize', this.handleResize);
  }
};

export default MainChessBoard;
</script>
