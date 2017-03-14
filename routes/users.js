// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var userSQL = require('../libs/db/Usersql');
var pool = mysql.createPool(dbConfig.mysql );
var commons = require("../libs/core/common");
var crypto = require('crypto');

// 添加用户
exports.addUser = function(req, res, next){
  var method = req.method;
  if(method === "GET"){
    commons.resFail(res, 101, "get请求方式无法接收，请用post提交！");
    return;
  }

  if(!req.session.sess_admin) 
    commons.resFail(res, 1, "需要登录才可以访问");
  else {
    pool.getConnection(function(err, connection) {  
    var param = req.query || req.params;   
    var md5 = crypto.createHash('md5');
    var password = md5.update(param.pwd).digest('hex');
    var date = new Date();
    connection.query(userSQL.insert, [param.name], function(err, result) {
          if(result) {      
            commons.resFail(res,1, "用户名重复,添加失败"); 
          }else{
            commons.resFail(res,1,"插入失败："+err);
          }
        connection.release();  
         });
    connection.query(userSQL.insert, [param.uid,param.name,password,date,param.remark], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "插入成功"); 
          }else{
            commons.resFail(res,1,"插入失败："+err);
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

 // 获取用户列表
exports.getUserInfoList = function(req, res, next){
  if(!req.session.sess_admin) 
    commons.resFail(res, 1, "需要登录才可以访问");
  else {
    pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var pageNo = param.pageNo || 1;
    var pageSize = param.pageSize || 10;
    var dataBegin = (pageNo -1 )*pageSize;
    connection.query(userSQL.getUserList, [pageSize,dataBegin], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "操作成功",result); 
          }else{
            commons.resFail(res,1,"操作失败("+err+")");
          }
        connection.release();  
         });
      });
  }
 };
