// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../libs/db/mysql');
var articleSQL = require('../libs/db/articlesql');
var pool = mysql.createPool(dbConfig.mysql );
var commons = require("../libs/core/common");
var formidable = require("formidable");  
var form = new formidable.IncomingForm();

// 添加文章
exports.addArticle = function(req, res, next){
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
      if(connection){
        connection.query(articleSQL.insert, [param.aid,param.title,param.date,date,param.author,param.type,param.excerpt,content,param.url,param.headerImage,param.resources,param.remark], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "插入成功"); 
          }else{
            commons.resFail(res,1,"插入失败："+err);
          }
            connection.release();  
         });
      }
      if(err){
        commons.resFail(res,1,"服务器连接失败："+err);
      }
      });
  }
 };

// 获取文章
exports.getArticle = function(req, res, next){
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    if(connection){
      connection.query(articleSQL.getArticleById, [param.aid], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "操作成功",result); 
          }else{
            commons.resFail(res,1,"操作失败");
          }
        connection.release();  
         });
    }
    if(err){
      commons.resFail(res,1,"服务器连接失败："+err);
    }
      });
 };

 // 获取文章列表
exports.getArticleList = function(req, res, next){
  pool.getConnection(function(err, connection) {
    var param = req.query || req.params;
    var pageNo = param.pageNo || 1;
    var pageSize = param.pageSize || 10;
    var dataBegin = (pageNo -1 )*pageSize;
    if(connection){
      connection.query(articleSQL.getArticleList, [pageSize,dataBegin], function(err, result) {
          if(result) {      
            commons.resSuccess(res, "操作成功",result); 
          }else{
            commons.resFail(res,1,"操作失败("+err+")");
          }
        connection.release();  
         });
    }
    if(err){
       commons.resFail(res,1,"服务器连接失败："+err);
    }
      });
 };

  // 上传图片
exports.uploadImage = function(req, res, next){
  var form = new formidable.IncomingForm();  
  form.uploadDir = global.yjGlobal.config.routeDirs[2].rootDir+"\\client\\companyPic\\";    
  form.parse(req, function(error, fields, files){  
    var fName = (new Date()).getTime();  
        var file = files.file;  
        switch (file.type){  
          case "image/jpeg":  
              fName = fName + ".jpg";  
              break;  
          case "image/png":  
              fName = fName + ".png";  
              break;  
          default :  
              fName =fName + ".png";  
              break;
          }                         
  var uploadDir = "\\client\\companyPic\\" + fName;
      req.query=fields;  
      req.query.CompanyPicAddress="\\companyPic\\" + fName; 
      console.log("fields:"+fields+",");          
  try{  
      fs.renameSync(file.path, uploadDir);  
      }catch(e){  
        console.log(e);  
        }  
      });
 };
