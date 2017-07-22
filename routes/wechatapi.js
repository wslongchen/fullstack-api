  var crypto = require('crypto');
  var mysql = require('mysql');
  var wechat = require('wechat');
  var http = require('http');
  var querystring = require("querystring");
  const Wechat = require('webwx-api');
  var mailer = require("../libs/core/mail");
  var wechatSql = require('../libs/db/wechatsql');
  const fs = require('fs')
  var dbConfig = require('../libs/db/mysql');
  var pool = mysql.createPool(dbConfig.mysql );

  //let config = JSON.parse(fs.readFileSync('./data.json'));
  let bot = new Wechat();
  let delName = new Array();
  let breakName = new Array();
  let currentName ="";
  let currentThreadId = '';
  let mId = '';

  var token="weixin";

  // 监听
  exports.listener = function(req, res, next){
      try{
          var signature = req.query.signature;
          var timestamp = req.query.timestamp;
          var nonce = req.query.nonce;
          var echostr = req.query.echostr;
          /*  加密/校验流程如下： */
          //1. 将token、timestamp、nonce三个参数进行字典序排序
          var array = new Array(token,timestamp,nonce);
          array.sort();
          var str = array.toString().replace(/,/g,"");

          //2. 将三个参数字符串拼接成一个字符串进行sha1加密
          var sha1Code = crypto.createHash("sha1");
          var code = sha1Code.update(str,'utf-8').digest("hex");
          //3. 开发者获得加密后的字符串可与signature对比，标识该请求来源于微信
          if(code===signature){
              res.send(echostr);
              console.log(""+echostr);
          }else{
              res.send("error");
          }
      }catch(error){
           console.log("error:"+error);
      }
  };

  //f6a4b574b35b4da1aa1477ca193bb687
  exports.wechat_method=wechat(token,function (req,res) {

      var message=req.weixin;
      if (message && message.MsgType == 'text') {
          var text = '';
          var description = '';
          switch (message.Content) {
              case '关键词1':
                  res.reply({
                      content: 'hello world!',
                      type: 'text'
                  });
                  break;
              case '关键词2':
                  text = '关键词2';
                  description = message.ToUserName + '----' + message.FromUserName;
                  res.reply([
                      {
                          title: text,
                          description: description,
                          picurl: '图片绝对地址',
                          url: '' }
                  ]);
                  break;
              default:
                 //默认回复文本消息
                  try{
                           var post_data = querystring.stringify({
                          key: 'f6a4b574b35b4da1aa1477ca193bb687',
                          info: message.Content
                          });
                  var options = {
                          host: 'www.tuling123.com',
                          port: 80,
                          path: '/openapi/api',
                          method: 'POST',
                          rejectUnauthorized: false,
                          headers: {
                                  "Content-Type": 'application/x-www-form-urlencoded', //这个一定要有
                          }
                  };
                  var req2 = http.request(options, function (res2) {
                          res2.setEncoding('utf8');
                          res2.on('data', function (chunk) {

                          var result = eval("(" + chunk + ")");
                           res.reply({
                                  content: result.text,
                                  type: 'text'
                          });
                  });
           });
                          req2.write(post_data);
                          req2.end();
                  }catch(e){
                          console.log(e+"");
                  }

                  break;
          }
      } else if (message && message.Event) {
          switch (message.Event) {
              case 'subscribe':
                  res.reply({
                      content: '欢迎大大关注小安安，么么哒～',
                      type: 'text'
                  });
                  break;
              case 'unsubscribe':    //取消关注
                  break;
              default:
                  res.reply({
                      content: 'O(∩_∩)O~',
                      type: 'text'
                  });
                  break;
          }
      }
  });

  //wechat
  exports.wechat = function(req, res) {
      if(currentThreadId!=''){
      	res.send('当前已经有人在使用，请稍后再尝试。');
      	return;
      }
      bot = new Wechat();
      delName = new Array();
      breakName = new Array();
      currentName = "";
      mId = '';
      currentThreadId = 'person';
      bot.start();
      bot.on('uuid', uuid => {
        res.redirect(302, 'https://login.weixin.qq.com/qrcode/' + uuid);
      });
      bot.on('loginLater',() =>{
        currentThreadId = '';
        bot.stop();
      });
      bot.on('login', () => {
        console.log('登录了')
      })
  };


  exports.wechatout = function(req, res) {
      if(currentThreadId != ''){
        bot.stop();
        currentThreadId = '';
        mId = '';
        res.send('成功退出');
      }else{
        res.send('当前没有扫描进程，请不要重复退出');
      }
      
  };

      bot.on('message', msg => {
        /**
         * 获取消息时间
         */
         /* console.log(`[*]----------${msg.getDisplayTime()}----------`)*/
         
      let config = JSON.parse(fs.readFileSync('./data.json'));
        /**
         * 判断消息类型
         */
        switch (msg.MsgType) {

          case bot.conf.MSGTYPE_TEXT:
          
           /**
           * 获取消息发送者的显示名
           */
           if(bot.contacts[msg.FromUserName].isSelf){
            //本人
            console.log('回复消息给：'+bot.contacts[msg.ToUserName].NickName)
           }else{
              if(bot.contacts[msg.FromUserName].getDisplayName() === config.manageWechat){
                  //发送给指定公众号，获取口令
                  let m=msg.Content.split(':\n');
                  if(m == config.checkSign){
                      //口令一致，开始检测好友状态，通过发送消息的形式。
                      sendMsgCheckStatus();
                      //并发送邮件通知已经开始扫描
                      sendMail(bot.user.NickName,"开始检测"+bot.user.NickName+"的好友状态，并进行备注清理！")
                  }
              }
            console.log('发送人：'+bot.contacts[msg.FromUserName].getDisplayName())
           }
            break
          case bot.conf.MSGTYPE_IMAGE:

            break
          case 10000:
          	if(msg.Status == 4){
          		//被拒收，或者拉黑了//消息已发出，但被对方拒收了//验证
              //更改备注
              //let m=msg.Content.split(':\n');
               let name = bot.contacts[msg.FromUserName].getDisplayName()
              if(msg.Content.indexOf('拒收') > -1){
                bot.updateRemarkName(msg.ToUserName,'僵尸-'+'拉黑-'+ name)
                breakName.push(name)
              }else if(msg.Content.indexOf('验证') > -1){
                bot.updateRemarkName(msg.ToUserName,'僵尸-'+'被删-'+ name)
                delName.push(name)
              }
          	}
            break
          case bot.conf.MSGTYPE_VOICE:
            break
          case bot.conf.MSGTYPE_EMOTICON:

            break
          case bot.conf.MSGTYPE_VIDEO:
          case bot.conf.MSGTYPE_MICROVIDEO:

            break
          case bot.conf.MSGTYPE_APP:
            if (msg.AppMsgType == 6) {

            }
            break
          default:
            break
        }
      })

  bot.on('logout', () => {
    if(currentThreadId != ''){
      currentThreadId = '';
    }
  })

  //发送消息检查好友状态
  function sendMsgCheckStatus(){
      let SPECIALUSERS = ['newsapp', 'fmessage', 'filehelper', 'weibo', 'qqmail', 'fmessage', 'tmessage',
      'qmessage', 'qqsync', 'floatbottle', 'lbsapp', 'shakeapp', 'medianote', 'qqfriend',
      'readerapp', 'blogapp', 'facebookapp', 'masssendapp', 'meishiapp', 'feedsapp', 'voip',
      'blogappweixin', 'weixin', 'brandsessionholder', 'weixinreminder', 'wxid_novlwrv3lqwv11',
      'gh_22b87fa7cb3c', 'officialaccounts', 'notification_messages', 'wxid_novlwrv3lqwv11',
      'gh_22b87fa7cb3c', 'wxitil', 'userexperience_alarm', 'notification_messages'
    ];
      let contacts = bot.contacts;
      console.log(Object.keys(contacts).length);
      let i =1;
      for (let x in contacts){
        //遍历每一个联系人
        if(!contacts[x].UserName.startsWith('@@') && contacts[x].VerifyFlag == 0 && SPECIALUSERS.indexOf(contacts[x].UserName) == -1 && !contacts[x].isSelf){
          //非群聊,非公众号,非自己，非特殊帐号
          console.log('NickName:'+contacts[x].NickName+',RemarkName:'+contacts[x].RemarkName+',VerifyFlag:'+contacts[x].VerifyFlag+',DisplayName:'+contacts[x].DisplayName+',StarFriend:'+contacts[x].StarFriend)
          //发送消息
          const rs = fs.createReadStream("./qr.jpg");
          //bot.sendMsg({file:rs,filename:'qr.jpg'},contacts[x].UserName)
          bot.uploadMedia(rs, 'qr.jpg', contacts[x].UserName)
          .then(res => {
            switch (res.ext) {
              case 'bmp':
              case 'jpeg':
              case 'jpg':
              case 'png':
                mId = res.mediaId;
                return bot.sendPic(res.mediaId, contacts[x].UserName)
              default:
                return bot.sendDoc(res.mediaId, res.name, res.size, res.ext, contacts[x].UserName)
            }
          })
        }
        if(Object.keys(bot.contacts).length ==i){
          //最后一个人
          currentName = contacts[x].UserName
          sendMail(bot.user.NickName,"结束"+bot.user.NickName+"的好友状态，拉黑的共"+breakName.length+"人，删除的共"+delName.length+"人，并进行了备注！")
          addData(bot.user.NickName,bot.user.Sex,bot.user.HeadImgUrl,delName.toString(),breakName.toString(),delName.length,breakName.length)
        }else{
          console.log('开始检测'+bot.user.NickName+'的第'+i+'个好友。');
          i++;
        }
      }
  }

  function sendMail(name,content){
    mailer.send(name,name+"的好友清理",content,function(err,info){
      if (err) {
        console.log('发送邮件通知出错');
        return;
      }else{
        console.log('发送邮件通知成功')
      }
    });
  }


  // 添加
  function addData(nickName,sex,headImgUrl,delFriendName,breFriendName,delFriendCount,breFriendCount){
  pool.getConnection(function(err, connection) {   
      var date = new Date();
      if(connection){
        connection.query(wechatSql.insert, [null,nickName,sex,headImgUrl,delFriendName,breFriendName,delFriendCount,breFriendCount,date], function(err, result) {
          if(result) {
            console.log("插入成功"); 
          }else{
            console.log("插入失败："+err);
          }
          connection.release();  
        });
      }
      if(err){
        console.log("服务器连接失败："+err);
      }
    });
  };