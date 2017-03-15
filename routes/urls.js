
var index = require("./index")
var user = require("./users");
var menu = require("./menu");


var app = null;

exports.startUrls = function(app) {
	this.app=app;
	app.get(["/","/web/index"], index.index);
	app.get("/api/index", index.main);
	app.use("/api/v1/login", index.login);
	app.use("/api/v1/user/addUser", user.addUser);
	app.use("/api/v1/user/getUserInfoList", user.getUserInfoList);
	app.use("/api/v1/menu/getMenuList", menu.getMenuList);
};