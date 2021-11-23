<template>
  <div class="bg">
    <div class="rankWindow">
      <div class="closeBtn">
        <div @click="closeRankWindow">×</div>
      </div>
      <div class="topBar">
        <div class="title">RANK</div>
      </div>
      <hr style="border: 2px solid #8c7b68; width: 300px" />
      <div class="grid">
        <div class="classes">
          <div>序号</div>
          <div>分数</div>
          <div>时间</div>
        </div>
        <div v-for="index of 10" :key="index" class="records">
          <div>{{ index }}</div>
          <div>{{ records[index].scores || 0 }}</div>
          <div>{{ records[index].date || "" }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  props: ["records"],
  data() {
    return {};
  },
  methods: {
    closeRankWindow() {
      this.$emit("close-window");
    },
  },
};
</script>
<style lang="scss" scoped>
.bg {
  position: absolute;
  left: 0;
  top: 0;
  width: 100%;
  height: 100%;
  background: rgba($color: #000000, $alpha: 0.7);
  z-index: 100;
}
.rankWindow {
  position: absolute;
  left: 50%;
  top: 50%;
  transform: translate(-50%, -50%);
  width: 350px;
  height: 450px;
  background: #faf8f0;
  border-radius: 10px;
  .topBar {
    margin: 10px auto;
    .title {
      display: inline-block;
      padding-left: 20px;
      font-weight: bolder;
      font-size: 50px;
      letter-spacing: 10px;
      color: #897c6a;
      text-shadow: 4px 4px 0px rgba(0, 0, 0, 0.2);
    }
  }
}
.notice {
  margin: 30px auto;
  font-size: 20px;
  font-weight: bolder;
}
.grid {
  margin: 0 auto;
  width: 300px;
  display: grid;
  grid-auto-rows: auto;
  grid-template-rows: 50px 50px 200px;
  .classes {
    display: flex;
  }
  .records {
    display: flex;
  }
}

.closeBtn {
  position: absolute;
  width: 27.5px;
  top: 10px;
  right: 10px;
  font-size: 20px;
  div {
    transform: rotate(0);
    transition: transform 0.5s ease-in-out;
  }
}
.closeBtn:hover {
  cursor: pointer;
  background: #897c6a;
  color: white;
  border-radius: 50%;
  transition: all 0.5s ease-in-out;
  div {
    transform: rotate(360deg);
    transition: all 0.5s ease-in-out;
  }
}
.closeBtn:active {
  box-shadow: rgba(0, 0, 0, 0.24) 0px 3px 8px;
}
</style>
