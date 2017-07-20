    // 导入MySQL模块
    var mysql = require('mysql');
  var dbConfig = require('./libs/db/mysql');
  var single = require('./routes/single');
  var formidable = require("formidable");
  var cheerio = require('cheerio');
  var fs = require('fs');
  var http = require('https');
  var timeUtil = require('./libs/core/timeutil');


  var name = 'https://zhuanlan.zhihu.com/api/columns/beautyicom/posts?limit=2&offset=0';
  startRequest(name);

  function startRequest(url) {
    var item="";
       //采用http模块向服务器发起一次get请求      
       http.get(url, function (res) {  
          var html = '';        //用来存储请求网页的整个html内容
          var titles = [];        
          res.setEncoding('utf-8'); //防止中文乱码
          //监听data事件，每次取一块数据
          res.on('data', function (chunk){   
            html += chunk;
        });
       //监听end事件，如果整个网页内容的html都获取完毕，就执行回调函数
       res.on('end', function () {
          var zhuanlan = JSON.parse(html);

          addArticle(zhuanlan[1].title,zhuanlan[1].content,zhuanlan[1].author.name,zhuanlan[1].titleImage);
      });

   }).on('error', function (err) {
    console.log(err);
   });
   return item;
  }

 function addArticle(title,content,author,titleImage){
          var tag = "Aritle,Study";
          var type = "0";
          var excerpt = "";
          content = content.replace('\"',"'");
          var headerImage = titleImage;
          var resources =titleImage;
          var remark = "知乎专栏";
          single.addSingle(title,author,tag,excerpt,content,remark,headerImage,resources);
  }