<template>
  <div class="container">
    <div v-for="(itemY, indexY) in blocks" :key="indexY">
      <div v-for="(itemX, indexX) in itemY" :key="indexX">
        <div :style="itemX.styles" v-show="!Boolean(itemX.value == 0)">
          {{ itemX.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import {
  setEmptyArray,
  pushUp,
  pushLeft,
  pushDown,
  pushRight,
} from "../utils/setArray";
export default {
  data() {
    return {
      blocks: [],
    };
  },
  methods: {
    up() {
      // 向上合并
      this.blocks = pushUp(this.blocks)[0];
      this.judgeWin();
    },
    down() {
      this.blocks = pushDown(this.blocks)[0];
      this.judgeWin();
    },
    left() {
      this.blocks = pushLeft(this.blocks)[0];
      this.judgeWin();
    },
    right() {
      this.blocks = pushRight(this.blocks)[0];
      this.judgeWin();
    },
    judgeWin() {
      let arr = [];
      arr = setEmptyArray(arr);
      for (let i = 0; i < 4; i++) {
        for (let j = 0; j < 4; j++) {
          arr[i][j].value = this.blocks[i][j].value;
        }
      }
      if (
        pushUp(arr)[1] +
          pushDown(arr)[1] +
          pushRight(arr)[1] +
          pushLeft(arr)[1] ==
        0
      ) {
        alert("GAME OVER");
      }
    },
    // 初始化
    init() {
      this.blocks = setEmptyArray();
    },
    // 监听键盘事件
    keyDown() {
      document.onkeydown = (e) => {
        //事件对象兼容
        let e1 =
          e || event || window.event || arguments.callee.caller.arguments[0];
        //键盘按键判断:左箭头-37;上箭头-38；右箭头-39;下箭头-40
        //左
        if (e1 && e1.keyCode == 37) {
          // 按下左箭头
          this.left();
        }
        if (e1 && e1.keyCode == 39) {
          // 按下右箭头
          this.right();
        }
        if (e1 && e1.keyCode == 38) {
          // 按下上箭头
          this.up();
        }
        if (e1 && e1.keyCode == 40) {
          // 按下下箭头
          this.down();
        }
      };
    },
  },
  created() {
    this.init();
  },
  mounted() {
    this.keyDown();
  },
};
</script>
<style lang="scss" scoped>
.container {
  margin: 0 auto;
  padding: 5px;
  width: 450px;
  display: flex;
  justify-content: center;
  background: #b9ada1;
  border-radius: 10px;
}
.container > div > div {
  line-height: 100px;
  height: 100px;
  width: 100px;
  margin: 10px 5px;
  font-size: 400%;
  font-weight: bolder;
  border-radius: 3px;
  background: #cac1b5;
}
.container > div > div > div {
  color: #766f65;
  animation: show 0.5s ease-in-out forwards;
}
@keyframes show {
  from {
    opacity: 0;
    transform: scale(0);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
