

DROP DATABASE IF EXISTS cheapomail;
CREATE DATABASE cheapomail;
USE cheapomail;

DROP TABLE IF EXISTS `user`;
CREATE TABLE `user` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`firstname` varchar(20) NOT NULL,
	`lastname` varchar(20) NOT NULL,
	`username` varchar(16) NOT NULL,
	`password` varchar(32) NOT NULL,
	UNIQUE (`username`)
); 


INSERT INTO `user` VALUES (NULL, 'Admin', 'Admin', 'admin', 'bdc87b9c894da5168059e00ebffb9077');/*password1234*/
INSERT INTO `user` VALUES (NULL, 'Omar', 'Christie', 'ochristie', '62b6271e5030b702c20d2a39fb6afb71');/*Passwords:Madcat1000*/
INSERT INTO `user` VALUES (NULL, 'Sabreen', 'Hasan', 'shasan', '2dfa0295ec18b1ba29069414e71333cc');/*Password: Madcat1333*/



DROP TABLE IF EXISTS `message`;
CREATE TABLE `message` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`recipient_ids` varchar(20) NOT NULL,
	`user_id` varchar(20) NOT NULL,
	`subject` varchar(128) NOT NULL,
	`body` mediumtext NOT NULL,
	`date_sent` datetime NOT NULL
); 


DROP TABLE IF EXISTS `message_read`;
CREATE TABLE `message_read` (
	`id` int(11) PRIMARY KEY NOT NULL auto_increment,
	`message_id` varchar(20) NOT NULL,
	`reader_id` varchar(20) NOT NULL,
	`date` datetime NOT NULL
);

