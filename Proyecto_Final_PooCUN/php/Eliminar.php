<?php
$dbname = $_POST['bd'];

if (isset($_POST["bd"])) {
    include("conexion.php");
    $sql = "DROP DATABASE $dbname";
    if ($conn->query($sql) === TRUE) {
        // La base de datos se eliminó correctamente
        echo "Base de datos eliminada correctamente";
        $conn->select_db('auxili_db_proyecto');
         try {   
                $sql = "DELETE FROM bd WHERE nombre = '$dbname'";
                
                // Ejecutar la consulta SQL
                if ($conn->query($sql)) {
                    // La eliminación se realizó correctamente
                    echo "Registro eliminado correctamente";
                } else {
                    // Hubo un error al ejecutar la consulta
                    echo "Error al eliminar el registro: ";
                }
            } catch (Exception $e) {
                echo "Error al crear la base de datos ".$e->getMessage();
            }
 

    } else {
        // Hubo un error al ejecutar la consulta SQL
        echo "Error al eliminar la base de datos: " . $conn->error;
    }





}
else{
    echo"No hay datos para eliminar";
}



$conn->close();

?>