var Article = {  
	insert:'INSERT INTO article(aid,title,createDate,modifyDate,author,tag,type,excerpt,content,url,headerImage,resources,remark) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', 
	getArticleList:'SELECT * FROM article LIMIT ? OFFSET ?',  
	getArticleById:'SELECT * FROM article WHERE mid = ? ',
};
module.exports = Article;