<template>
  <rank v-if="showrank" :records="records" @close-window="closeRank"></rank>
  <div class="record">
    <div class="scores btn" @click="init">New Game</div>
    <div style="display: flex">
      <div class="scores btn" @click="showRank">
        Highest:<span>{{ records[0].scores || 0 }}</span>
      </div>
      <div class="scores">
        Scores:<span>{{ scores }}</span>
      </div>
    </div>
  </div>

  <div class="container">
    <div v-for="(itemY, indexY) in blocks" :key="indexY">
      <div v-for="(itemX, indexX) in itemY" :key="indexX">
        <div :style="itemX.styles" v-if="!Boolean(itemX.value == 0)">
          {{ itemX.value }}
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import rank from "./rank.vue";
import getTime from "../utils/gateDate";
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
      showrank: false,
      blocks: [],
      records: [],
      scores: 0,
    };
  },
  components: {
    rank,
  },
  methods: {
    up() {
      // 向上合并
      this.scores += pushUp(this.blocks)[1];
      this.judgeWin();
    },
    down() {
      this.scores += pushDown(this.blocks)[1];
      this.judgeWin();
    },
    left() {
      this.scores += pushLeft(this.blocks)[1];
      this.judgeWin();
    },
    right() {
      this.scores += pushRight(this.blocks)[1];
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
        pushUp(arr)[0] +
          pushDown(arr)[0] +
          pushRight(arr)[0] +
          pushLeft(arr)[0] ==
        0
      ) {
        this.GG();
      }
    },
    GG() {
      alert("GAME OVER");
      let currentDate = getTime();
      let newRecord = { scores: this.scores, date: currentDate };
      console.log(newRecord);
      if (this.records.length == 0) {
        this.records[0] = newRecord;
        console.log("added");
      } else {
        let flag = 0;
        this.records.forEach((obj, index) => {
          if (newRecord >= obj.scores) {
            flag = index;
          }
        });
        this.records.splice(flag, 0, newRecord);
      }
      localStorage.setItem("records", JSON.stringify(this.records));
    },
    showRank() {
      this.showrank = true;
    },
    closeRank() {
      this.showrank = false;
    },
    // 初始化
    init() {
      let _records = JSON.parse(localStorage.getItem("records"));
      this.records = _records || [];
      console.log(JSON.parse(JSON.stringify(this.records)));
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
.record {
  display: flex;
  width: 450px;
  margin: 0px auto;
  align-items: center;
  justify-content: space-between;
  .scores {
    height: 40px;
    line-height: 40px;
    margin: 10px 10px;
    margin-right: 0;
    background: #8c7b68;
    color: white;
    border-radius: 5px;
    font-weight: bolder;
    padding: 0 10px;
    span {
      font-size: 150%;
      margin-left: 10px;
    }
  }
}

.btn:hover {
  cursor: pointer;
  animation: onHover ease-in-out 0.5s forwards;
}
@keyframes onHover {
  from {
  }
  to {
    box-shadow: rgb(38, 57, 77) 0px 20px 30px -10px;
  }
}
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
  font-weight: bolder;
  border-radius: 3px;
  background: #cac1b5;
}
.container > div > div > div {
  color: #766f65;
  font-size: 400%;
  animation: show 0.5s ease-in-out forwards;
  transition: all 0.5s ease-in-out;
}
@keyframes show {
  0% {
    opacity: 0;
    transform: scale(0);
  }
  70% {
    opacity: 1;
    transform: scale(1.1);
  }
  100% {
    opacity: 1;
    transform: scale(1);
  }
}
</style>
