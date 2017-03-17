// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var memberSQL = require('../libs/db/membersql');
var pool = mysql.createPool(dbConfig.mysql );
var commons = require("../libs/core/common");

// 添加作品
exports.addMember = function(req, res, next){
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
    var date = new Date();
    connection.query(memberSQL.insert, [param.pid,param.name,param.description,param.author,param.type,param.tag,param.content,date,param.url,param.img,param.remark], function(err, result) {
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

// 获取作品
exports.getProduction = function(req, res, next){
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    connection.query(memberSQL.getMemberById, [param.mid], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "操作成功",result); 
          }else{
            commons.resFail(res,1,"操作失败");
          }
        connection.release();  
         });
      });
 };

 // 获取作品列表
exports.getMemberList = function(req, res, next){
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var pageNo = param.pageNo || 1;
    var pageSize = param.pageSize || 10;
    var dataBegin = (pageNo -1 )*pageSize;
    connection.query(memberSQL.getMemberList, [pageSize,dataBegin], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "操作成功",result); 
          }else{
            commons.resFail(res,1,"操作失败("+err+")");
          }
        connection.release();  
         });
      });
 };
