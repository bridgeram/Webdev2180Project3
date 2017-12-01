<?php

	session_start();
	include_once("schema_connect.php");

	$result = $db->query("SELECT * FROM user");

	$users = array();

	while($row = $result->fetch_assoc()){
		$users[$row["username"]] = array("username"=>$row["username"], "firstname"=>$row["firstname"], "lastname"=>$row["lastname"]);
	}

	print_r(json_encode($users));

?>