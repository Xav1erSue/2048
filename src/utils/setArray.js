export { setEmptyArray, pushUp, pushRight, pushLeft, pushDown };
// 初始化数组
function setEmptyArray() {
  let arr = [];
  for (let i = 0; i < 4; i++) {
    arr[i] = [];
  }
  for (let i = 0; i < 4; i++) {
    for (let j = 0; j < 4; j++) {
      arr[i][j] = {
        value: 0,
        styles: {},
      };
    }
  }
  arr = addNewBlock(arr, 2);
  return arr;
}
// 新增n个单元
function addNewBlock(arr, n) {
  let flag = 0;
  while (flag < n) {
    let x = Math.floor(Math.random() * 4);
    let y = Math.floor(Math.random() * 4);
    if (arr[x][y].value == 0) {
      let num = 2 * (Math.floor(Math.random() * 2) + 1);
      arr[x][y].styles = changeColor(num);
      arr[x][y].value = num;
      flag++;
    }
  }
  return arr;
}

function pushUp(arr) {
  let steps = 0;
  let scores = 0;
  for (let x = 0; x < 4; x++) {
    // 每一列都实施相同方法
    let head = 0;
    let i = 0;
    while (i < 4) {
      for (i = head; i < 4; i++) {
        // 获取head起第一个非零值
        if (arr[x][i].value == 0) continue;
        else {
          // 如果此时head指向为0，说明head指向不正确，需要重置指向
          // 操作为：把当前值直接赋值给head，并且不更改head的值
          if (arr[x][head].value == 0) {
            // 如果head为0，则该值移到head处
            // 一个一个移上去，显示出动画
            for (let t = i; t > head; t--) {
              arr[x][t - 1].styles = changeColor(arr[x][t].value);
              arr[x][t - 1].value = arr[x][t].value;
              arr[x][t].value = 0;
              arr[x][t].styles = {};
            }
            // arr[x][head].value = arr[x][i].value;
            // arr[x][head].styles = changeColor(arr[x][head].value);
            // arr[x][i].value = 0;
            // arr[x][i].styles = {};
            steps++;
            break;
            // 以崭新的head重新进行for循环
          } else {
            // head指向不为0，此时指向正确
            // 第一次指向一定是本身，直接跳过即可
            if (i == head) continue;
            else {
              // 此时找到的值需要再与head进行比较
              if (arr[x][i].value != arr[x][head].value) {
                // 如果当前值和head值不相等，则把当前值推到顶上
                if (i == head + 1) {
                  head++;
                  break;
                } else {
                  for (let t = i; t > head + 1; t--) {
                    arr[x][t - 1].styles = changeColor(arr[x][t].value);
                    arr[x][t - 1].value = arr[x][t].value;
                    arr[x][t].value = 0;
                    arr[x][t].styles = {};
                  }
                  // arr[x][head + 1].value = arr[x][i].value;
                  // arr[x][head + 1].styles = changeColor(arr[x][head + 1].value);
                  // arr[x][i].value = 0;
                  // arr[x][i].styles = {};
                  steps++;
                  head++;
                  break;
                }
              } else {
                // 如果当前值和head值相等，则加入head中
                for (let t = i; t > head; t--) {
                  if (t == head + 1) {
                    arr[x][head].styles = changeColor(arr[x][head].value * 2);
                    arr[x][head].value = arr[x][t].value * 2;
                    arr[x][t].value = 0;
                    arr[x][t].styles = {};
                  } else {
                    arr[x][t - 1].styles = changeColor(arr[x][t].value);
                    arr[x][t - 1].value = arr[x][t].value;
                    arr[x][t].value = 0;
                    arr[x][t].styles = {};
                  }
                }
                // arr[x][head].value = arr[x][head].value * 2;
                // scores += arr[x][head].value;
                // arr[x][head].styles = changeColor(arr[x][head].value);
                // arr[x][i].value = 0;
                // arr[x][i].styles = {};
                steps++;
                head++;
                break;
              }
            }
          }
        }
      }
    }
  }
  if (steps != 0) arr = addNewBlock(arr, 1);
  return [steps, scores];
}

function pushRight(arr) {
  let steps = 0;
  let scores = 0;
  for (let y = 3; y >= 0; y--) {
    let head = 3;
    let i = 3;
    while (i >= 0) {
      for (i = head; i >= 0; i--) {
        if (arr[i][y].value == 0) continue;
        else {
          if (arr[head][y].value == 0) {
            arr[head][y].value = arr[i][y].value;
            arr[head][y].styles = changeColor(arr[head][y].value);
            arr[i][y].value = 0;
            arr[i][y].styles = {};
            steps++;
            break;
          } else {
            if (i == head) continue;
            else {
              if (arr[i][y].value != arr[head][y].value) {
                if (i == head - 1) {
                  head--;
                  break;
                } else {
                  arr[head - 1][y].value = arr[i][y].value;
                  arr[head - 1][y].styles = changeColor(arr[head - 1][y].value);
                  arr[i][y].value = 0;
                  arr[i][y].styles = {};
                  steps++;
                  head--;
                  break;
                }
              } else {
                arr[head][y].value = arr[head][y].value * 2;
                scores += arr[head][y].value;
                arr[head][y].styles = changeColor(arr[head][y].value);
                arr[i][y].value = 0;
                arr[i][y].styles = {};
                steps++;
                head--;
                break;
              }
            }
          }
        }
      }
    }
  }
  if (steps != 0) arr = addNewBlock(arr, 1);
  return [steps, scores];
}

function pushDown(arr) {
  let steps = 0;
  let scores = 0;
  for (let x = 0; x < 4; x++) {
    let head = 3;
    let i = 3;
    while (i >= 0) {
      for (i = head; i >= 0; i--) {
        if (arr[x][i].value == 0) continue;
        else {
          if (arr[x][head].value == 0) {
            arr[x][head].value = arr[x][i].value;
            arr[x][head].styles = changeColor(arr[x][head].value);
            arr[x][i].value = 0;
            arr[x][i].styles = {};
            steps++;
            break;
          } else {
            if (i == head) continue;
            else {
              if (arr[x][i].value != arr[x][head].value) {
                if (i == head - 1) {
                  head--;
                  break;
                } else {
                  arr[x][head - 1].value = arr[x][i].value;
                  arr[x][head - 1].styles = changeColor(arr[x][head - 1].value);
                  arr[x][i].value = 0;
                  arr[x][i].styles = {};
                  steps++;
                  head--;
                  break;
                }
              } else {
                arr[x][head].value = arr[x][head].value * 2;
                scores += arr[x][head].value;
                arr[x][head].styles = changeColor(arr[x][head].value);
                arr[x][i].value = 0;
                arr[x][i].styles = {};
                steps++;
                head--;
                break;
              }
            }
          }
        }
      }
    }
  }
  if (steps != 0) arr = addNewBlock(arr, 1);
  return [steps, scores];
}

function pushLeft(arr) {
  let steps = 0;
  let scores = 0;
  for (let y = 0; y < 4; y++) {
    let head = 0;
    let i = 0;
    while (i < 4) {
      for (i = head; i < 4; i++) {
        if (arr[i][y].value == 0) continue;
        else {
          if (arr[head][y].value == 0) {
            arr[head][y].value = arr[i][y].value;
            arr[head][y].styles = changeColor(arr[head][y].value);
            arr[i][y].value = 0;
            arr[i][y].styles = {};
            steps++;
            break;
          } else {
            if (i == head) continue;
            else {
              if (arr[i][y].value != arr[head][y].value) {
                if (i == head + 1) {
                  head++;
                  break;
                } else {
                  arr[head + 1][y].value = arr[i][y].value;
                  arr[head + 1][y].styles = changeColor(arr[head + 1][y].value);
                  arr[i][y].value = 0;
                  arr[i][y].styles = {};
                  head++;
                  steps++;
                  break;
                }
              } else {
                arr[head][y].value = arr[head][y].value * 2;
                scores += arr[head][y].value;
                arr[head][y].styles = changeColor(arr[head][y].value);
                arr[i][y].value = 0;
                arr[i][y].styles = {};
                steps++;
                head++;
                break;
              }
            }
          }
        }
      }
    }
  }
  if (steps != 0) arr = addNewBlock(arr, 1);
  return [steps, scores];
}

function changeColor(num) {
  switch (num) {
    case 2:
      return { background: "#ece4db", color: "#766F65" };
    case 4:
      return { background: "#ECE2CA", color: "#766F65" };
    case 8:
      return { background: "#EBB57C", color: "#F8F6F2" };
    case 16:
      return { background: "#EC9B67", color: "#F8F6F2" };
    case 32:
      return { background: "#E78367", color: "#F8F6F2" };
    case 64:
      return { background: "#E56948", color: "#F8F6F2" };
    case 128:
      return { background: "#E8D180", color: "#F8F6F2", "font-size": "300%" };
    case 256:
      return { background: "#E8CD72", color: "#F8F6F2", "font-size": "300%" };
    case 512:
      return { background: "#E8CB54", color: "#F8F6F2", "font-size": "300%" };
  }
}
