<?php
$bd = $_POST["CreaBD"];
include("dbauxiliar.php");
$servername = "localhost";
$username = "root";
$password = "";


$conn = new mysqli($servername, $username, $password);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

// Obtener el nombre de la base de datos del cuerpo de la solicitud POST


// Escapar el nombre de la base de datos para evitar inyección de SQL
$bd = $conn->real_escape_string($bd);


// Verificar si la base de datos ya existe
$sql_check = "SELECT SCHEMA_NAME FROM INFORMATION_SCHEMA.SCHEMATA WHERE SCHEMA_NAME = '$bd'";
$result = $conn->query($sql_check);

if ($result->num_rows > 0) {
    echo "La base de datos '$bd' ya existe.";
} else {

// Crear la base de datos
$sql = "CREATE DATABASE $bd";
if ($conn->query($sql) === true) {
    echo "Base de datos creada";

  
        // Insertar el valor $bd en la tabla 'bd'
        $conn->select_db('auxili_db_proyecto');
        $sql_insert_value = "INSERT INTO bd (nombre) VALUES ('$bd')";
        $conn->query($sql_insert_value) ;
    } 
}

$conn->close();







?>