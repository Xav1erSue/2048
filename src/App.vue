<template>
  <div class="header"><span>2048</span></div>
  <hr style="border: 2px solid #8c7b68; width: 450px" />
  <game></game>
</template>

<script>
import game from "./components/game.vue";
export default {
  name: "App",
  components: {
    game,
  },
  data() {
    return {};
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

.header {
  margin: 0 auto;
  width: 450px;
  font-size: 70px;
  font-weight: bolder;
  color: #8c7b68;
  text-align: start;
  text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
}
</style>
