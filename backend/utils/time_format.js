function getFormatedDate() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  // let str = date.getFullYear() + "-" + month + "-" + day;
  let str = month + "-" + day + "-" + date.getFullYear();
  return str;
}
function getMonthDate() {
  let date = new Date();
  let month = date.getMonth() + 1;
  let day = date.getDate();
  month = (month < 10 ? "0" : "") + month;
  day = (day < 10 ? "0" : "") + day;
  let str = month + "-" + date.getFullYear();
  return str;
}

function timeConverter(UNIX_timestamp) {
  var a = new Date(UNIX_timestamp);
  var months = [
    "Jan",
    "Feb",
    "Mar",
    "Apr",
    "May",
    "Jun",
    "Jul",
    "Aug",
    "Sep",
    "Oct",
    "Nov",
    "Dec"
  ];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();
  var time =
    date + " " + month + " " + year + " " + hour + ":" + min + ":" + sec;
  return time;
}
module.exports.HumanDate = getFormatedDate;
module.exports.GetMonth = getMonthDate;
module.exports.timeConverter = timeConverter;
