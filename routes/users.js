var User = require('./user');
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var userSQL = require('../libs/db/Usersql');
var pool = mysql.createPool(dbConfig.mysql );
var commons = require("../libs/core/common");
var crypto = require('crypto');

// 添加用户
exports.addUser = function(req, res, next){
  if(!req.session.sess_admin) 
    commons.resFail(res, 1, "需要登录才可以访问");
  else {
    pool.getConnection(function(err, connection) {  
    var param = req.query || req.params;   
    var md5 = crypto.createHash('md5');
    var password = md5.update(param.pwd).digest('hex');

    connection.query(userSQL.insert, [param.uid,param.name,password,param.remark], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "插入成功"); 
          }else{
            commons.resFail(res,1,"插入失败");
          }
        connection.release();  
         });
      });
  }
 };

// 获取用户
exports.getUserInfo = function(req, res, next){
  if(!req.session.sess_admin) 
    commons.resFail(res, 1, "需要登录才可以访问");
  else {
    pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(userSQL.getUserById, [param.uid], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "操作成功",result); 
          }else{
            commons.resFail(res,1,"操作失败");
          }
        connection.release();  
         });
      });
  }
 };
