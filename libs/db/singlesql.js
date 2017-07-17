var Single = {  
	insert:'INSERT INTO single(sid,title,createDate,readDate,author,tag,type,excerpt,content,url,headerImage,resources,isRead,remark) VALUES(?,?,?,NULL,?,?,?,?,?,?,?,?,?,?)', 
	getSingleList:'SELECT * FROM single LIMIT ? OFFSET ? ;',  
	getSingleListAll:'SELECT sId FROM single', 
	getSingleById:'SELECT * FROM single WHERE sid = ? ',
	getSingleByDate:'SELECT * FROM single WHERE createDate >= ? and createDate <= ? and isRead =?',
	getSumSingle:'SELECT count(sId) FROM single',
};
module.exports = Single;