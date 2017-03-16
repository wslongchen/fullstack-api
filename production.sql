/*
Navicat MySQL Data Transfer

Source Server         : local
Source Server Version : 50160
Source Host           : localhost:3306
Source Database       : fullstack

Target Server Type    : MYSQL
Target Server Version : 50160
File Encoding         : 65001

Date: 2017-03-16 18:20:12
*/

SET FOREIGN_KEY_CHECKS=0;

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
INSERT INTO `production` VALUES ('1', 'stu unger rise', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-01.jpg', null);
INSERT INTO `production` VALUES ('2', 'stu unger rise', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'design', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-02.jpg', null);
INSERT INTO `production` VALUES ('3', 'stu unger rise', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'design', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-03.jpg', null);
INSERT INTO `production` VALUES ('4', 'stu unger rise', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'design', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-04.jpg', null);
INSERT INTO `production` VALUES ('5', 'stu unger rise', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-05.jpg', null);
INSERT INTO `production` VALUES ('6', 'stu unger rise', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-01.jpg', null);
INSERT INTO `production` VALUES ('7', 'stu unger rise', 'Accessories Here you can find the best computer monitor, printer, scanner, speaker, projector. hardware and more', 'MrPan', 'photography', 'design / development', 'About 64% of all on-line teens say that do things online that they wouldn’t want their time in chatrooms. Some of the classify their behavior as “cyber affair” More then 60% of employees use company PC for the persional needs during their work hours as 80', '2017-03-16 17:41:43', 'www.sitedomen.com', '/img/uploads/portfolio/prj-02.jpg', null);
