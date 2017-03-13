var commons = require("../libs/core/common");
var User = require('./user');
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var userSQL = require('../libs/db/Usersql');
var pool = mysql.createPool(dbConfig.mysql );
var crypto = require('crypto');

exports.main = function(req, res) {
	if(!req.session.sess_admin)	
		commons.resFail(res, 1, "需要登录才可以访问");
};

exports.login = function(req, res) {
	var param = req.query || req.params;
	var name = param.name;
	var pwd = param.pwd;
	
	if(!name || name == "") {
		commons.resFail(res, 1, "用户名不能为空");
		return;
	}
	if(!pwd || pwd == "") {
		commons.resFail(res, 1, "密码不能为空");
		return;
	}
	var md5 = crypto.createHash('md5');
    var password = md5.update(pwd).digest('hex');

    pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.login, [name,password], function(err, result) {
          if(result) {      
             if(result.length>0){
             	commons.resSuccess(res, "登录成功",result);
             }else{
             	commons.resFail(res, 1, "用户名或密码错误");
             }
          }else{
            commons.resFail(res, 1, "用户名或密码错误");
          }
        connection.release();  
         });
      });
};