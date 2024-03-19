<?php
$dbname = $_POST['bd'];

if (isset($_POST["bd"]) && isset($_POST["tabla"])) {
    include("conexion.php");

    $sql = $_POST["tabla"];

    try {   
        // Ejecutar la consulta SQL
        $result = $conn->query($sql);

        if ($result === true) {
            echo "Tabla Creada correctamente";
        } else {
            echo "Error al crear la Tabla";
        }
    } catch (Exception $e) {
        echo "Error al ejecutar la consulta: " . $e->getMessage(); // Mostrar mensaje de error específico
    }

    $conn->close();
} else {
    echo "Enviar datos correctos";
}
?>