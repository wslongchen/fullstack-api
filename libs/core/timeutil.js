
//获取时间
exports.getDateNow = () => {
  var dateNow = new Date();
  var year = dateNow.getFullYear();
  var month = dateNow.getMonth();
  var day = dateNow.getDate();
  return new Date(year, month, day);
  //return year + "-" + month + "-" + day;
  //return new Date("yyyy-MM-dd");
};

// 对Date的扩展，将 Date 转化为指定格式的String
// 月(M)、日(d)、小时(h)、分(m)、秒(s)、季度(q) 可以用 1-2 个占位符， 
// 年(y)可以用 1-4 个占位符，毫秒(S)只能用 1 个占位符(是 1-3 位的数字) 
// 例子： 
// (new Date()).Format("yyyy-MM-dd hh:mm:ss.S") ==> 2006-07-02 08:09:04.423 
// (new Date()).Format("yyyy-M-d h:m:s.S")      ==> 2006-7-2 8:9:4.18 
exports.formatDate =  (date,fmt) => {  
    var o = {
        "M+": date.getMonth() + 1, //月份 
        "d+": date.getDate(), //日 
        "h+": date.getHours(), //小时 
        "m+": date.getMinutes(), //分 
        "s+": date.getSeconds(), //秒 
        "q+": Math.floor((date.getMonth() + 3) / 3), //季度 
        "S": date.getMilliseconds() //毫秒 
    };
    if (/(y+)/.test(fmt)) fmt = fmt.replace(RegExp.$1, (date.getFullYear() + "").substr(4 - RegExp.$1.length));
    for (var k in o)
    if (new RegExp("(" + k + ")").test(fmt)) fmt = fmt.replace(RegExp.$1, (RegExp.$1.length == 1) ? (o[k]) : (("00" + o[k]).substr(("" + o[k]).length)));
    return fmt;
}

//为当前日期添加月份
exports.addMonths = (date, month) => {
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
exports.addDays = (date, days) => {
  return new Date(date.setDate(date.getDate() + days));
}

//是否超过时限，超过返回true，没有是false
exports.isDateLimit = (indexDate, limitDate) => {
  //console.log("【indexDate:】" + indexDate + " 【limitDate:】" + limitDate);
  //console.log(indexDate <= limitDate ? true : false);
  return indexDate <= limitDate ? true : false;
}

exports.getDayBeginDate = (date) => {
  var dateNow;
  if(typeof date=='object' && date.constructor== Date){
    dateNow = date;
  }else if(typeof date == 'string' && date.constructor == String){
    dateNow = new Date(date);
  }
  var year = dateNow.getFullYear();
  var month = dateNow.getMonth();
  var day = dateNow.getDate();
  var hh = 0;
  var mm = 0;
  var ss = 0; 
  return new Date(year,month,day,hh,mm,ss);
}

exports.getDayEndDate = (date,fmt) => {
  var dateNow;
  if(typeof date=='object' && date.constructor== Date){
    dateNow = date;
  }else if(typeof date == 'string' && date.constructor == String){
    dateNow = new Date(date);
  }
  var year = dateNow.getFullYear();
  var month = dateNow.getMonth();
  var day = dateNow.getDate();
  var hh = 23;
  var mm = 59;
  var ss = 59; 
  return new Date(year,month,day,hh,mm,ss);
}