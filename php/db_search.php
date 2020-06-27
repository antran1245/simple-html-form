<?php
	$servername = "localhost";
	$username = "root";
	$password = "";
	$database = "testdata";
	$content = "";
	$contentPassword = "";
	$x_value = $_POST['searchX_value'];
	$y_value = $_POST['searchY_value'];
	$z_value = $_POST['searchZ_value'];
	try {
		$conn = new PDO("mysql:host=$servername;dbname=$database", $username, $password);
		$conn->setAttribute(PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION);
		if (isset($_POST['search'])) {
			$x_value = $_POST['search-x'];
			$y_value = $_POST['search-y'];
			$z_value = $_POST['search-z'];
		}
		$result = $conn->prepare("SELECT info, password, x_value, y_value, z_value FROM spheres WHERE x_value='".$x_value."' AND y_value='".$y_value."' AND z_value='".$z_value."'");
		$result->execute();
		$result = $result->fetchAll();
		if($result != 0) {
			foreach ($result as $row) {
				$content .= $row['info'];
				$contentPassword .= $row['password'];
			}
		}
		echo "Connected Successfully";
	} catch(PDOException $e) {
		echo "Connection Failed: " . $e->getMessage();
	}
	$conn =null;
?>
<script src="../js/three.js"></script>
<script src="../js/OrbitControls.js"></script>
<script src="../dic.js"></script>
<script> func(<?php echo json_encode($content);?>,<?php echo json_encode($contentPassword);?>);</script>
