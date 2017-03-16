// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var menu = require('../libs/db/menusql');
var pool = mysql.createPool(dbConfig.mysql );
var commons = require("../libs/core/common");
var crypto = require('crypto');

 // 获取菜单列表
exports.getMenuList = function(req, res, next){
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var pageNo = param.pageNo || 1;
    var pageSize = param.pageSize || 10;
    var dataBegin = (pageNo -1 )*pageSize;
    connection.query(menu.getMenuList, [pageSize,dataBegin], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "操作成功",result); 
          }else{
            commons.resFail(res,1,"操作失败("+err+")");
          }
        connection.release();  
         });
      });
 };

 //WEB
exports.production = function(req,res){
  commons.renderTemplate(res,"production");
};

exports.member = function(req,res){
  commons.renderTemplate(res,"member");
}

exports.search = function(req,res){
  commons.renderTemplate(res,"search");
}

exports.blog = function(req,res){
  commons.renderTemplate(res,"blog");
}

exports.contact = function(req,res){
  commons.renderTemplate(res,"contact");
}