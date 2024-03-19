<?php
    $dbname = $_POST['bd'];
    include("conexion.php");

    $accion = $_POST['actividad'];


    if ($accion === 'btnGuardar') {
        
    $dbname = $_POST['bd'];
    
    $tabla = $_POST['tabla'];
    $placa = $_POST['placa'];
    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $color = $_POST['color'];
        $sql_insert_value = "INSERT INTO $tabla (placa, marca, modelo, color) VALUES ('$placa',' $marca', '$modelo', '$color')";
        //$stmt = $conn->prepare($sql_insert_value);
       // $stmt->bind_param("ssss", );

       if($conn->query($sql_insert_value)===true){
            echo "Datos Guardados Correctamente";
        } else {
            echo "Error al guardar los datos";
        }

      
    
}if ($accion === 'buscar') {
    try {
        $placa = $_POST['placa'];
        $tabla = $_POST['tabla'];
        $sql_select = "SELECT * FROM $tabla WHERE placa = '$placa'";
        $result = $conn->query($sql_select);

        if ($result) {
            if ($result->num_rows > 0) {
                $data = array();
                while ($row = $result->fetch_assoc()) {
                    $data[] = $row;
                }
                echo json_encode($data); // Convertir el array en objeto JSON y devolverlo
            } else {
                echo json_encode(array("error" => "No se encontraron datos con la placa especificada."));
            }
        } else {
            echo json_encode(array("error" => "Error en la consulta: " . $conn->error));
        }
    } catch (Exception $e) {
        echo json_encode(array("error" => "Error en la búsqueda: " . $e->getMessage()));
    }
}
else
if($accion=="btnActualizar"){
   
    
    $tabla = $_POST['tabla'];
    $placa = $_POST['placa'];
    $marca = $_POST['marca'];
    $modelo = $_POST['modelo'];
    $color = $_POST['color'];

    $placa = $_POST['placa'];
    $tabla = $_POST['tabla'];
    $sql_select = "UPDATE $tabla SET placa = '$placa', marca = '$marca', modelo = '$modelo', color = '$color' WHERE placa = '$placa'";
    if($conn->query($sql_select)===true){
        echo "Datos Actualizados";
    }else{
        echo "error al actualizar los datos";
    }













}else
if($accion== "btnEliminar"){
    $tabla = $_POST['tabla'];
    $placa = $_POST['placa'];

    $sql_select = "DELETE FROM $tabla WHERE placa='$placa '";

if($conn->query($sql_select)===true){
        echo "Datos Eliminados";
    }else{
        echo "error al eliminar los datos";
    }




}




else {
    echo "Faltan datos para realizar la operación";
}

$conn->close();
?>