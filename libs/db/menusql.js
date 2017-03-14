var Menu = {  
                insert:'INSERT INTO Menu(mid,menuName,url,sort,status,remark) VALUES(?,?,?,?,?,?)', 
                getMenuList:'SELECT * FROM Menu WHERE status=1 LIMIT ? OFFSET ?',  
                getMenuById:'SELECT * FROM Menu WHERE mid = ? ',
              };
module.exports = Menu;