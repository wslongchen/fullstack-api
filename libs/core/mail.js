var nodemailer = require('nodemailer');
var transporter = nodemailer.createTransport({
    //https://github.com/andris9/nodemailer-wellknown#supported-services 支持列表
    service: 'smtp.163.com',
    port: 465, // SMTP 端口
    auth: {
        user: 'mrpann@163.com',
        //这里密码不是qq密码，是你设置的smtp密码
        pass: 'longchen520'
    }
});


exports.sendMails = function(req, res, next){
   var param = req.query || req.params;
   var mailOptions = {
            from: 'mrpann@163.com', // 发件地址
            to: '1049058427@qq.com', // 收件列表
            subject: 'FullStack反馈', // 标题
            //text和html两者只支持一种
            text: "param.title", // 标题
            html: "param.content" // html 内容
        };
        console.log("mail param:"+param.name+","+param.email+","+param.title+","+param.content);
        transporter.sendMail(mailOptions, function(error, info){
        if(error){
            return console.log(error);
        }
        console.log('Message sent: ' + info.response);

    });
};