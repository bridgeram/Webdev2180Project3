<?php

	session_start();
	include_once("schema_connect.php");

	$message_id = $_GET["message_id"];
	$reader_id = $_GET["reader_id"];
	
	//check befor adding
	$result = $db->query("SELECT * FROM message_read WHERE message_id='$message_id'");
    if($result->num_rows > 0){
        exit;
    }

	$db->query("INSERT INTO message_read (message_id, reader_id, date) VALUES ('$message_id', '$reader_id', NOW())");

?>