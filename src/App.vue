<template>
  <div class="header">
    <div class="top">
      <div class="title">2048</div>
      <div class="record">
        <div class="scores">Highest:{{ highest }}</div>
        <div class="scores">Scores:{{ scores }}</div>
      </div>
    </div>
    <div class="bottom"></div>
  </div>
  <div class="abovegame"></div>
  <game></game>
  <div class="footer"></div>
  <rank v-if="showRank"></rank>
</template>

<script>
import rank from "./components/rank.vue";
import game from "./components/game.vue";
export default {
  name: "App",
  components: {
    rank,
    game,
  },
  data() {
    return {
      showRank: false,
      highest: 0,
      scores: 0,
    };
  },
};
</script>

<style lang="scss">
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  background: #faf8f0;
}
</style>
