    // 导入MySQL模块
    var mysql = require('mysql');
  var dbConfig = require('./libs/db/mysql');
  var single = require('./routes/single');
  var formidable = require("formidable");
  var cheerio = require('cheerio');
  var fs = require('fs');
  var http = require('http');

  var name = 'http://wslongchen.github.io/2016/08/04/Android%E8%87%AA%E5%AE%9A%E4%B9%89%E6%8E%A7%E4%BB%B6%E6%B5%85%E8%B0%88/#more';
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
          var $ = cheerio.load(html); //采用cheerio模块解析html
          var title=$('h1').text().trim();
          var content = $('div.post-body').html().trim();
          console.log(content);
          addArticle(title,content);
      });

   }).on('error', function (err) {
    console.log(err);
   });
   return item;
  }

 function addArticle(title,content){
          var author = "MrPan";
          var tag = "Aritle,Study";
          var type = "0";
          var excerpt = "";
          var url = "/web/blog/single?aid="+id;
          var headerImage = "";
          var resources ="";
          var remark = "";
          single.addSingle();
  }