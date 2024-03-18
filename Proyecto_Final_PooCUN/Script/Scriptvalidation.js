function CrearDB(botonId) {
    
    if (botonId === 'btnCrear') {
        let creaBDValue = document.getElementById('CreaBD').value.trim();
       // alert("el valor enviado" + creaBDValue);
        let mensajeError = document.getElementById('CreaBD-error');
        if (creaBDValue === '') {
            mensajeError.innerText = 'Campo vacio.';
            return false; 
        }else
        if (creaBDValue.includes(' ')) { // Verificar si hay espacios en blanco en el valor
            mensajeError.textContent = 'El campo no puede estar vacio.';
        }else
        
        {
            fetch('php/CrearDB.php', {
                method: 'POST',
                body:'CreaBD=' + encodeURIComponent(creaBDValue), // Convertir el valor a JSON
                headers: {
                    'Content-Type': 'application/x-www-form-urlencoded'  //Tipo de contenido para enviar datos como formulario
                }
            })
            
            .then(response => response.text())
            .then(data =>{
                mensajeError.innerText = data;
             //   alert(data);
            })
            .catch(error => { 
              //  mensajeError.innerText = 'Error:'. error;
             //   alert('Error:' + error);
                console.error('Error:' + error);
            });
          //  document.getElementById('miFormulario').submit();
        }
    }
  //  return validarFormulario();
}



function EliminarDB(botonId){
    let creaBDValue = document.getElementById('CreaBD').value.trim();
    // alert("el valor enviado" + creaBDValue);
     let mensajeError = document.getElementById('CreaBD-error');
    if (botonId === 'btnEliminarDB') {
    if(creaBDValue === ''){
        mensajeError.innerText = 'Campo vacio';
    }else{
        mensajeError.innerText = 'Campo lleno';
    }
    }
}

