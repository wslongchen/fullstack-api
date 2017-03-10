var mysql = require('mysql');

var connection = mysql.createConnection({
	host : 'localhost',
	user : 'root',
	password : '123456';
});

connection.connect();

connection.query('SELECT * FROM USER',function(err,rows,fields){
	if(err) throw err;
	console.log('The solution is:',rows[0].solution);
});

connection.end();