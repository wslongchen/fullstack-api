var UserSQL = {  
                insert:'INSERT INTO User(uid,userName,password,createDate,remark) VALUES(?,?,?,?,?)', 
                getUserList:'SELECT * FROM User LIMIT ? OFFSET ?',  
                getUserById:'SELECT * FROM User WHERE uid = ? ',
                getUserByUserName:'SELECT * FROM User WHERE userName = ? ',
                login: 'SELECT * FROM User WHERE userName = ? and password = ?',
              };
module.exports = UserSQL;