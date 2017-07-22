var WechatData = {  
	insert:'INSERT INTO wechat_check(id,nickName,sex,headImgUrl,delFriendName,breFriendName,delFriendCount,breFriendCount,createDate) VALUES(?,?,?,?,?,?,?,?,?)', 
	getDataList:'SELECT * FROM wechat_check LIMIT ? OFFSET ? ;',  
	getDataListAll:'SELECT id FROM wechat_check', 
	getSingleById:'SELECT * FROM wechat_check WHERE nickName = ? ',
};
module.exports = WechatData;