// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var articleSQL = require('../libs/db/articlesql');
var pool = mysql.createPool(dbConfig.mysql );
var commons = require("../libs/core/common");
var cfg = require("../libs/core/config");
var mailer = require("../libs/core/mail");

// 添加文章
exports.sendMail = function(req, res, next){
	var param = req.body;
	var from =param.name+"("+param.email+")";
  mailer.send(from,param.title,param.content,function(err,info){
    if (err) {
      commons.resFail(res,1,"发送失败："+err);
      return;
    }else{
    	commons.resSuccess(res, "发送成功");
    }
  });
};