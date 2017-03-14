
var index = require("./index")
var user = require("./users");


var app = null;

exports.startUrls = function(app) {
	this.app=app;
	app.get("/", index.index);
	app.get("/api/index", index.main);
	app.use("/api/v1/login", index.login);
	app.use("/api/v1/user/addUser", user.addUser);
	app.use("/api/v1/user/getUserInfoList", user.getUserInfoList);
};