var UserSQL = {  
	insert:'INSERT INTO user(uid,userName,password,createDate,remark) VALUES(?,?,?,?,?)', 
	getUserList:'SELECT * FROM user LIMIT ? OFFSET ?',  
	getUserById:'SELECT * FROM user WHERE uid = ? ',
	getUserByUserName:'SELECT * FROM user WHERE userName = ? ',
	login: 'SELECT * FROM user WHERE userName = ? and password = ?',
};
module.exports = UserSQL;