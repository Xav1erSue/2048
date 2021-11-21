<template>
  <game></game>
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
  color: #2c3e50;
  margin-top: 60px;
}
</style>
