export default function getTime() {
  let time = new Date();
  let year = time.getFullYear();
  let month = time.getMonth() + 1;
  let date = time.getDate();
  //padStart补足位数
  let currentDate = `${year}年${month}月${date}日`;
  return currentDate;
}
