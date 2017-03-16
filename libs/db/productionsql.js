var Production = {  
                insert:'INSERT INTO production(pid,name,description,author,type,tag,content,time,url,img,remark) VALUES(?,?,?,?,?,?,?,?,?,?,?)', 
                getProductList:'SELECT * FROM production LIMIT ? OFFSET ?',  
                getProductById:'SELECT * FROM production WHERE pid = ? ',
              };
module.exports = Production;