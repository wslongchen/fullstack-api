var commons = require("../libs/core/common");
var config = require("../libs/core/config");
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var userSQL = require('../libs/db/Usersql');
var menu = require('../libs/db/menusql');
var pool = mysql.createPool(dbConfig.mysql );
var crypto = require('crypto');

//WEB
exports.index = function(req,res){
  commons.renderTemplate(res,"index",{user:req.session.sess_admin?req.session.sess_admin:''});
};
exports.manage = function(req,res){
  commons.renderTemplate(res,"manage",{user:req.session.sess_admin?req.session.sess_admin:''});
};
//API
exports.main = function(req, res) {
	if(!req.session.sess_admin)	
		commons.resFail(res, 1, "需要登录才可以访问");
};

exports.login = function(req, res) {
  if(!req.session.sess_admin) 
    commons.renderTemplate(res,"login");
};

exports.loginUser = function(req, res) {

  var method = req.method;
  if(method === "GET"){
    commons.resFail(res, 101, "get请求方式无法接收，请用post提交！");
    return;
  }

	var param = req.body;
	var name = param.username;
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
  if(connection){
    connection.query(userSQL.login, [name,password], function(err, result) {
        if(result) {      
            if(result.length>0){
              req.session.sess_admin = {
                name: result.userName,
                pwd: result.password,
                createDate: result.createDate
              };
              commons.resSuccess(res, "登录成功",result);
             }else{
              commons.resFail(res, 1, "用户名或密码错误");
             }
          }else{
            commons.resFail(res, 1, "用户名或密码错误"+err);
          }
        connection.release();  
         });
      }
      if(err){
        commons.resFail(res, 1, "服务器出错"+err);
      }
    });
};