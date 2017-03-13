
var index = require("./index")
var user = require("./users");


var app = null;

exports.startUrls = function(app) {
	this.app=app;
	app.get("/", index.main);
	app.get("/login", index.login);
	app.get("/addUser", user.addUser);
};