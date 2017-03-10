var express = require('express');
var router = express.Router();
var URL = require('url');

var User = require('./user');

/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('user api');
});

module.exports = router;

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