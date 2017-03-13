var UserSQL = {  
                insert:'INSERT INTO User(uid,userName,password,remark) VALUES(?,?,?,?)', 
                queryAll:'SELECT * FROM User',  
                getUserById:'SELECT * FROM User WHERE uid = ? ',
                login: 'SELECT * FROM User WHERE userName = ? and password = ?',
              };
module.exports = UserSQL;