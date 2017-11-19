

/*===================================== CREATE DATABASE AND SELECT IT ======================*/

drop database IF EXISTS cheapomail;
create database cheapomail;
use cheapomail;

/*======================= CREATING TABLES ===================================================*/


/* clean up old tables;
   must drop tables with foreign keys first
   due to referential integrity constraints
 */
drop table IF EXISTS user;
drop table IF EXISTS messages;
drop table IF EXISTS messages_read;


create table user(
  user_id int auto_increment not null,
  firstname varchar(50)	not null,
  lastname varchar(50) not null,
  username varchar(50) not null ,
  password varchar (20) not null,
  primary key(user_id)
  );


create table messages (
  message_id int auto_increment not null,
  recipient_ids varchar(50)  not null,
  sender_id varchar(50) not null,
  subject varchar(50) not null ,
  body varchar (300) not null,
  date_sent date,    
  primary key(message_id)
  ); 


create table messages_read (
  message_read_id int auto_increment not null,
  message_id int auto_increment not null,
  reader_id varchar(50) not null,
  date_read date,    
  primary key (message_read_id,message_id), 
  foreign key (message_id) references messages(message_id) on delete cascade on update cascade
  ); 

  INSERT INTO user VALUES("",'Yanique','Lawrence','Admin', sha1('password123'));
