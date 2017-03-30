var Article = {  
	insert:'INSERT INTO article(aid,title,createDate,modifyDate,author,tag,type,excerpt,content,url,headerImage,resources,remark) VALUES(?,?,?,?,?,?,?,?,?,?,?,?,?)', 
	getArticleList:'SELECT * FROM article LIMIT ? OFFSET ? ;',  
	getArticleListAll:'SELECT aId FROM article', 
	getArticleById:'SELECT * FROM article WHERE aid = ? ',
	getSumArticle:'SELECT count(aId) FROM article',
};
module.exports = Article;