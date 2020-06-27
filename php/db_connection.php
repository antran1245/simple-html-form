<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "testdata";

	try {
		$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		$sql = "INSERT INTO spheres (info, password, x_value, y_value, z_value) VALUES ('".$_POST["information"]."', '".$_POST["psw"]."', '".$_POST["x_value"]."', '".$_POST["y_value"]."', '".$_POST["z_value"]."')";
		$conn->exec($sql);
		echo "Connected Successfully";
	} catch(PDOException $e) {
		echo "Connection Failed: " . $e->getMessage();
	}
	$conn =null;
?>