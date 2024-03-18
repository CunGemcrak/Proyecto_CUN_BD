<?php
include("conexion.php");

if(isset($_POST["btnCrear"])){
    echo   "Crear base de datos";
}else


if(isset($_POST["Placa"])){  
    echo "Entro en eliminar";
}


if(isset($_POST["btnEliminar"])){  
    echo "Entro en eliminar";
}else
if(isset($_POST["btnActualizar"])){  
    echo "Entro en btnActualizar ";
}else
if(isset($_POST["btnGuardar"])){  
    echo "Entro en btnGuardar ";
}else{
    echo "no entro";
}




?>