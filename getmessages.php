<?php

	session_start();
	include_once("schema_connect.php");
	$id = $_GET["id"];
	$subject = $_GET["subject"];


if($subject == "all"){
       	// get messages for specified recipient
    	$result = $db->query("SELECT * FROM message WHERE recipient_ids='$id' ORDER BY date_sent DESC LIMIT 10");
    
    if($result->num_rows > 0){
        echo '<ul>';
    foreach ($result as $row) {
      //echo '<li>' . $row['name'] . ' is ruled by ' . $row['head_of_state'] . '</li>';
      $mes_id= $row['subject'];
      $result2 = $db->query("SELECT * FROM message_read WHERE message_id= '$mes_id'");//should be message id
      foreach ($result2 as $row2) {
          $date_read= $row2['date'];
      }
      if($result2->num_rows > 0){
      	echo '<p class="messages" id="'.$row['subject'].'">'. $row['user_id'] . ' -------     ' . $row['subject'] . '----'.$row['date_sent']. "----" .'Date read: '.$date_read .'</p>';
      }else{
      	echo '<p class="messages" id="'.$row['subject'].'">'.'<b>' . $row['user_id'] . ' ------- '     . $row['subject'] .'----'. $row['date_sent'] . '</b>'.'</p>';
      }
    }
    echo '</ul>';
    }else{
        echo ("No Message");
    } 
}else{
    $result = $db->query("SELECT * FROM message WHERE recipient_ids='$id' ORDER BY date_sent DESC LIMIT 10");
    foreach ($result as $row) {
        if($row['subject'] == $subject){
            $sendinguser = $row['user_id'];
            $userresult = $db->query("SELECT * FROM user WHERE username='$sendinguser'");
            foreach ($userresult as $row3){
                $fname= $row3['firstname'];
                $lname= $row3['lastname'];
                echo '<h3>'."Date Sent: ". $row['date_sent'] . '</h3>';
                echo '<h3>'."Sender Name:  ". $fname." ".$lname. '</h3>';
                echo '<h1>'."Subject: ". $row['subject'] . '</h3>';
                echo '<h3>'."Body: " . '</h3>';
                echo '<p>'. $row['body'] . '</p>';
                echo '<button id="return">Return to inbox</button>';
            }
        }
    }
}





?>
