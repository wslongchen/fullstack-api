var Menu = {  
	insert:'INSERT INTO menu(mid,menuName,url,sort,status,remark) VALUES(?,?,?,?,?,?)', 
	getMenuList:'SELECT * FROM menu WHERE status=1 LIMIT ? OFFSET ?',  
	getMenuById:'SELECT * FROM menu WHERE mid = ? ',
};
module.exports = Menu;