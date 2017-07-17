


exports.getDateNow = function(){
  var dateNow = new Date();
  var year = dateNow.getFullYear();
  var month = dateNow.getMonth();
  var day = dateNow.getDate();
  return new Date(year, month, day);
  //return year + "-" + month + "-" + day;
  //return new Date("yyyy-MM-dd");
};

//为当前日期添加月份
exports.addMonths = function(date, month) {
  var dateNow = date;
  var year = dateNow.getFullYear();
  var month = dateNow.getMonth() + month;
  var day = dateNow.getDate();
  if (parseInt(month / 12) > 0) {
      year += parseInt(month / 12)
  }
                //console.log("year:" + year + " month:" + month + " day:" + day);
  return new Date(year, month, day);

}

//添加日
exports.addDays = function(date, days) {
  return new Date(date.setDate(date.getDate() + days));
}

//是否超过时限，超过返回true，没有是false
exports.isDateLimit = function(indexDate, limitDate) {
  //console.log("【indexDate:】" + indexDate + " 【limitDate:】" + limitDate);
  //console.log(indexDate <= limitDate ? true : false);
  return indexDate <= limitDate ? true : false;
}