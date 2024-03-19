<?php
$servername = "localhost";
$username = "root";
$password = "";

$conn = new mysqli($servername, $username, $password, $dbname);
if ($conn->connect_error) {     
    die("Error en la Conexion". $conn->connect_error); 
}
?>