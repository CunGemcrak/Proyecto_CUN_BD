<?php
$servername = "localhost";
$username = "root";
$password = "";
$dbname = "auxili_db_proyecto";

$conn = new mysqli($servername, $username, $password, $dbname);

if ($conn->connect_error) {
    die("Error de conexión: " . $conn->connect_error);
}

$sql = "SELECT nombre FROM bd"; // Cambia 'bd' por el nombre de tu tabla
$result = $conn->query($sql);

$data = array();

if ($result->num_rows > 0) {
    while ($row = $result->fetch_assoc()) {
        $data[] = $row['nombre'];
    }
}

$conn->close();
// Crear un objeto con los datos
$objeto = new stdClass();
$objeto->basesDatos = $data;

// Establecer encabezado para indicar que la respuesta es JSON
header('Content-Type: application/json');

// Devolver el objeto como JSON
echo json_encode($objeto);
?>