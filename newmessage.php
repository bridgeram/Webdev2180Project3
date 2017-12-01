<?php

	session_start();
	include_once("schema_connect.php");

	$sender = $_GET["sender"];
	$recipients = $_GET["recipients"];
	$subject = $_GET["subject"];
	$body = $_GET["body"];
	
	$myArray = explode(',', $recipients);
	
	
	foreach ($myArray as $recipient) {
		if($recipient=="admin"){
			echo "Cant_admin";
			exit;
		}
	
		$result = $db->query("SELECT * FROM user WHERE username='$recipient'");
    	if($result->num_rows == 0){
        	echo "User_notfound";     
        	exit;
    	}
	
	
    	$r = $db->query("SHOW TABLE STATUS WHERE name='message'");
    	$new_message_id = $r->fetch_assoc()["Auto_increment"];
		$success = $db->query( "INSERT INTO message (recipient_ids, user_id, subject, body, date_sent) VALUES ('$recipient', '$sender', '$subject', '$body', NOW())");

	};
	
	
	
	
	if(!$success)
		echo "failure";
	else
		echo "success";

?>