<?php header('Content-Type: text/html; charset=ISO-8859-15');   //needed to process strings with accents

    session_start();
    include_once("schema_connect.php");    // connection setup

    $fname = $_GET["firstname"];
    $lname = $_GET["lastname"];
    $username = $_GET["username"];
    $pass = $_GET["pass"];
    $cpass = $_GET["cpass"];

    // check that passwords match
    if(strcmp($pass, $cpass) != 0){
        echo "password_mismatch";
        exit;
    }

    // check that username is not taken
    $result = $db->query("SELECT * FROM user WHERE username='$username'");
    if($result->num_rows > 0){
        echo "name_taken";     
        exit;
    }

    $r = $db->query("SHOW TABLE STATUS WHERE name='user'");
    $new_user_id = $r->fetch_assoc()["Auto_increment"];
    $h_pass = md5($pass);
    console.log($new_user_id);

    // add user info
    $success = $db->query("INSERT INTO user (firstname, lastname, username, password) VALUES ('$fname', '$lname', '$username', '$h_pass')");

    if(!$success){
        echo "failed";
        exit;
    }

    echo "success";
    
?>