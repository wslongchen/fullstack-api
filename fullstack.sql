/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50160
Source Host           : localhost:3306
Source Database       : fullstack

Target Server Type    : MYSQL
Target Server Version : 50160
File Encoding         : 65001

Date: 2017-03-27 18:28:29
*/

SET FOREIGN_KEY_CHECKS=0;

-- ----------------------------
-- Table structure for article
-- ----------------------------
DROP TABLE IF EXISTS `article`;
CREATE TABLE `article` (
  `aid` varchar(255) NOT NULL,
  `title` varchar(255) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `modifyDate` datetime DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `type` int(11) DEFAULT NULL COMMENT '0:文章，1：图片,2：多图,3:视频',
  `excerpt` varchar(255) DEFAULT NULL,
  `content` longtext,
  `url` varchar(255) DEFAULT NULL,
  `headerImage` varchar(255) DEFAULT NULL,
  `resources` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL
) ENGINE=InnoDB DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of article
-- ----------------------------
INSERT INTO `article` VALUES ('1', '标题', '2017-03-17 17:47:55', '2017-03-17 17:47:53', 'MrPan', 'Work, Team', '2', '描述', 'Your brand is the core of your marketing, the central theme around your products and services. Your brand is not your Logo or your Company Name unless of course you are Microsoft or the Yellow Pages online directory.', '/web/blog/single?aid=1', '/img/uploads/post-image.jpg', '/img/uploads/post-image.jpg,/img/uploads/blog-video-img.png', '');
INSERT INTO `article` VALUES ('2', '标题', '2017-03-17 17:47:55', '2017-03-17 17:47:53', 'MrPan', 'Work, Team', '1', '描述', 'Your brand is the core of your marketing, the central theme around your products and services. Your brand is not your Logo or your Company Name unless of course you are Microsoft or the Yellow Pages online directory.', '/web/blog/single?aid=2', '/img/uploads/post-image.jpg', '/img/uploads/post-image.jpg', '');
INSERT INTO `article` VALUES ('3', '标题', '2017-03-17 17:47:55', '2017-03-17 17:47:53', 'MrPan', 'Work, Team', '3', '描述', 'Your brand is the core of your marketing, the central theme around your products and services. Your brand is not your Logo or your Company Name unless of course you are Microsoft or the Yellow Pages online directory.', '/web/blog/single?aid=3', '/img/uploads/post-image.jpg', '/img/uploads/post-image.jpg', '');
INSERT INTO `article` VALUES ('a1490174749016', '2183201741@qq.com', '2017-03-22 17:25:49', '2017-03-22 17:25:49', 'MrPan', 'Work, Team2', '0', '', '<p>test</p>\n', '/web/blog/single?aid=a1490174749016', '', '', null);

-- ----------------------------
-- Table structure for member
-- ----------------------------
DROP TABLE IF EXISTS `member`;
CREATE TABLE `member` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `nickName` varchar(255) DEFAULT NULL,
  `avatar` varchar(255) DEFAULT NULL,
  `age` int(11) DEFAULT NULL,
  `sex` int(11) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `site` varchar(255) DEFAULT NULL,
  `email` varchar(255) DEFAULT NULL,
  `phone` varchar(255) DEFAULT NULL,
  `qq` varchar(255) DEFAULT NULL,
  `wechat` varchar(255) DEFAULT NULL,
  `github` varchar(255) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `uid` int(11) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=3 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of member
-- ----------------------------
INSERT INTO `member` VALUES ('1', '龙晨', 'MrPan', '/img/uploads/avatar/avatar-54x54-01.png', '23', '1', '一言不合就开始撕逼的程序员。', '码农 /  帅哥', 'wwww.mrpann.cn', '1049058427@qq.com', '15574968442', '1049058427', 'wslongchen', 'github.com/wslongchen', '2017-03-17 13:57:49', null, null);
INSERT INTO `member` VALUES ('2', '龙晨', 'A', '/img/uploads/avatar/avatar-54x54-01.png', '23', '1', '一言不合就开始撕逼的程序员。', '码农 /  帅哥', 'wwww.mrpann.cn', '1049058427@qq.com', '15574968442', '1049058427', 'wslongchen', 'github.com/wslongchen', '2017-03-17 13:57:49', null, null);

-- ----------------------------
-- Table structure for menu
-- ----------------------------
DROP TABLE IF EXISTS `menu`;
CREATE TABLE `menu` (
  `mid` int(11) NOT NULL AUTO_INCREMENT,
  `menuName` varchar(255) DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `sort` int(255) DEFAULT NULL,
  `status` int(11) DEFAULT '0',
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`mid`)
) ENGINE=InnoDB AUTO_INCREMENT=7 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of menu
-- ----------------------------
INSERT INTO `menu` VALUES ('1', '首页', '/web/index', '0', '1', null);
INSERT INTO `menu` VALUES ('2', '作品', '/web/production', '0', '1', null);
INSERT INTO `menu` VALUES ('3', '成员', '/web/member', '0', '1', null);
INSERT INTO `menu` VALUES ('4', '搜索', '/web/search', '0', '1', null);
INSERT INTO `menu` VALUES ('5', '文章', '/web/blog', '0', '1', null);
INSERT INTO `menu` VALUES ('6', '关于', '/web/contact', '0', '1', null);

-- ----------------------------
-- Table structure for production
-- ----------------------------
DROP TABLE IF EXISTS `production`;
CREATE TABLE `production` (
  `pid` int(11) NOT NULL AUTO_INCREMENT,
  `name` varchar(255) DEFAULT NULL,
  `description` varchar(255) DEFAULT NULL,
  `author` varchar(255) DEFAULT NULL,
  `type` varchar(255) DEFAULT NULL,
  `tag` varchar(255) DEFAULT NULL,
  `content` longtext,
  `time` datetime DEFAULT NULL,
  `url` varchar(255) DEFAULT NULL,
  `img` varchar(255) DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`pid`)
) ENGINE=InnoDB AUTO_INCREMENT=8 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of production
-- ----------------------------
INSERT INTO `production` VALUES ('1', 'name1', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-01.jpg', null);
INSERT INTO `production` VALUES ('2', 'name2', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'design', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-02.jpg', null);
INSERT INTO `production` VALUES ('3', 'name3', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'design', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-03.jpg', null);
INSERT INTO `production` VALUES ('4', 'name4', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'design', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-04.jpg', null);
INSERT INTO `production` VALUES ('5', 'name5', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-05.jpg', null);
INSERT INTO `production` VALUES ('6', 'name6', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-01.jpg', null);
INSERT INTO `production` VALUES ('7', 'name7', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-02.jpg', null);

-- ----------------------------
-- Table structure for user
-- ----------------------------
DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
  `uid` int(11) NOT NULL AUTO_INCREMENT,
  `userName` varchar(255) DEFAULT NULL,
  `password` varchar(255) DEFAULT NULL,
  `createDate` datetime DEFAULT NULL,
  `remark` varchar(255) DEFAULT NULL,
  PRIMARY KEY (`uid`)
) ENGINE=InnoDB AUTO_INCREMENT=4 DEFAULT CHARSET=utf8;

-- ----------------------------
-- Records of user
-- ----------------------------
INSERT INTO `user` VALUES ('2', 'test', 'e10adc3949ba59abbe56e057f20f883e', '2017-03-14 15:09:13', 'test');
INSERT INTO `user` VALUES ('3', 'longchen', 'e10adc3949ba59abbe56e057f20f883e', '2017-03-14 14:35:24', '测试专用');
