	var Member = {  
		insert:'INSERT INTO member(mid,name,nickName,avatar,age,sex,description,tag,site,email,phone,qq,wechat,github,createDate,uid,remark) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?,?)', 
		getMemberList:'SELECT * FROM member LIMIT ? OFFSET ?',  
		getMemberById:'SELECT * FROM member WHERE mid = ? ',
	};
	module.exports = Member;