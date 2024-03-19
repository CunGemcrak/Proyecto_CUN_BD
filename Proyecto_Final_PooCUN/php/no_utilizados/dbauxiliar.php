<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auxili_db_proyecto"; // Nombre de la base de datos que deseas usar

$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}



// Verificar si la base de datos ya existe
$sql_check = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$dbname'";
$result = $conn->query($sql_check);

if ($result->num_rows > 0) {
  
} else {

// Crear la base de datos
$sql = "CREATE DATABASE $dbname";
$conn->query($sql) === true;
$conn->select_db($dbname);
        
        // Crear la tabla en la base de datos
        $sql_create_table = "CREATE TABLE bd (
            id INT(6) UNSIGNED AUTO_INCREMENT PRIMARY KEY,
            nombre VARCHAR(30) NOT NULL,
            fecha_creacion TIMESTAMP DEFAULT CURRENT_TIMESTAMP
        )";
$conn->query($sql_create_table);




}


$conn->close();
?>