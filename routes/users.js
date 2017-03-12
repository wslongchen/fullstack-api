var express = require('express');
var router = express.Router();
var URL = require('url');

var User = require('./user');
// 导入MySQL模块
var mysql = require('mysql');
var dbConfig = require('../lib/db/mysql');
var userSQL = require('../lib/db/Usersql');

var pool = mysql.createPool( dbConfig.mysql );

// 响应一个JSON数据
var responseJSON = function (res, ret) {
     if(typeof ret === 'undefined') { 
          res.json({     code:'-200',     msg: '操作失败'   
        }); 
    } else { 
      res.json(ret); 
  }};

  // 添加用户
router.get('/addUser', function(req, res, next){
 // 从连接池获取连接 
pool.getConnection(function(err, connection) { 
// 获取前台页面传过来的参数  
 var param = req.query || req.params;   
// 建立连接 增加一个用户信息 
connection.query(userSQL.insert, [param.uid,param.name], function(err, result) {
        if(result) {      
             result = {   
                      code: 200,   
                     msg:'增加成功'
             };  
        }     

     // 以json形式，把操作结果返回给前台页面     
       responseJSON(res, result);   

     // 释放连接  
      connection.release();  

       });
    });
 });

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user api');
});

router.get('/getUserInfo',function(req,res,next){
	var user = new User();
	var params = URL.parse(req.url,true).query;
	if(params.id == '1'){
		user.name= "mrpan";
		user.age = "23";
		user.city = "北京市";
	}else{
		user.name = "longchen";
		user.age = "22";
		user.city = "上海市";
	}

	var response = {status:1,data:user};
	res.send(JSON.stringify(response));
});

module.exports = router;