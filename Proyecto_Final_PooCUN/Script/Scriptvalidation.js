function CrearDB(botonId) {
    
    if (botonId === 'btnCrear') {
        let creaBDValue = document.getElementById('CreaBD').value.trim();
       // alert("el valor enviado" + creaBDValue);
        let mensajeError = document.getElementById('CreaBD-error');
        if (creaBDValue === '') {
            mensajeError.innerText = 'Campo vacio.';
            var alert = alertify.alert("Crear Base de Datos","El campo no puede estar vacio").set('label', 'Aceptar'); 
            return false; 
        }else
        if (creaBDValue.includes(' ')) { // Verificar si hay espacios en blanco en el valor
            mensajeError.textContent = 'El campo no puede estar vacio.';
            var alert = alertify.alert("Crear Base de Datos","El campo no puede estar vacio").set('label', 'Aceptar'); 
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
                verDB('mensaje');
                var alert = alertify.alert("Crear Base de DAtos",data).set('label', 'Aceptar'); 

            })
            .catch(error => { 
                             console.error('Error:' + error);
            });
         
        }
       
    }


   
}





function verDB(mensaje) {
    mensaje;
   // alert("Entro en ver BD")
    const listaBasesDatos = document.getElementById('listaBasesDatos');
    const miSelectbd = document.getElementById('miSelectbd');
    const miSelectbdT = document.getElementById('miSelectbdT');
    
    miSelectbd.innerHTML = '';
    miSelectbdT.innerHTML = '';
    const optionDefault = document.createElement('option');
    optionDefault.value = "no";
    optionDefault.textContent = "Selecciona BD";
    miSelectbd.appendChild(optionDefault);
    const optionDefaultT = document.createElement('option');
    optionDefaultT.value = "no";
    optionDefaultT.textContent = "Selecciona BD";
    miSelectbdT.appendChild(optionDefaultT)

    
    fetch('php/phpauxiliar/busqueda.php')
        .then(response => {
            if (!response.ok) {
                throw new Error('Hubo un problema al obtener los datos.');
            }
            return response.json(); // Obtener la respuesta como JSON
        })
        .then(data => {
            console.log(data); // Mostrar la respuesta en la consola
            // Verificar si data.basesDatos es un array antes de usar forEach
            
            if (Array.isArray(data.basesDatos)) {
                // Limpiar contenido previo
                listaBasesDatos.innerHTML = '';

                // Crear la tabla
                const table = document.createElement('table');
                const thead = document.createElement('thead');
                const tbody = document.createElement('tbody');

                // Crear la fila de encabezado
                const headerRow = document.createElement('tr');
                const nameHeader = document.createElement('th');
                nameHeader.textContent = 'Bases de Datos';
                headerRow.appendChild(nameHeader);
                thead.appendChild(headerRow);
                table.appendChild(thead);

                // Agregar filas para cada base de datos
                data.basesDatos.forEach(baseDatos => {
                    const row = document.createElement('tr');
                    const nameCell = document.createElement('td');
                    nameCell.textContent = baseDatos;
                    row.appendChild(nameCell);

                    // Crear el botón de eliminar
                    const deleteButton = document.createElement('div');
                    deleteButton.textContent = 'Eliminar';
                    deleteButton.name = baseDatos;
                    deleteButton.id = baseDatos; 
                    deleteButton.classList.add('btnEliminar');
                   // deleteButton.dataset.baseDatos = baseDatos; // Guardar el nombre de la base de datos
                   // deleteButton.onclick(eliminarBaseDatos(baseDatos));
                    deleteButton.addEventListener('click', eliminarBaseDatos);
                    const buttonCell = document.createElement('td');
                    buttonCell.appendChild(deleteButton);
                    row.appendChild(buttonCell);

                    tbody.appendChild(row);

                    // Agregar opción al select
                    const option = document.createElement('option');
                    option.value = baseDatos;
                    option.textContent = baseDatos;
                    miSelectbd.appendChild(option);

                // Agregar opción al segundo select
                const optionT = document.createElement('option');
                optionT.value = baseDatos;
                optionT.textContent = baseDatos;
                miSelectbdT.appendChild(optionT);

                });

                table.appendChild(tbody);
                listaBasesDatos.appendChild(table);
            } else {
                console.error('Los datos obtenidos no son un array.');
            }
        })
        .catch(error => console.error('Error:', error));
}


function eliminarBaseDatos(event) {
   // alert(event.target.name);
    let bd = event.target.name;
    let mensajeError = document.getElementById('CreaBD-error');
    mensajeError.innerText ="";
    

    const formData = new FormData();
    formData.append('bd', bd); 
   try {
    
    
    fetch('php/Eliminar.php', {
        method: 'POST',
        body:formData, // Convertir el valor a JSON
      
    })
    
    .then(response => response.text())
    .then(data =>{
       
         mensajeError.innerText = data.trim();
         var alert = alertify.alert("Eliminar Base de Datos", data.trim()).set('label', 'Aceptar'); 
      
        console.error(data);
       
        verDB('mensaje');
       

    })
    .catch(error => { 
                     console.error('Error:' + error);
    });
   } catch (error) {
    mensajeError.innerText = "Error al eliminar la base de datos";
    var alert = alertify.alert("Eliminar Base de Datos", "Error al eliminar la base de datos").set('label', 'Aceptar'); 
        console.error("error"+error);
    
   }    
}



function btnCrearTable(mensaje){
    mensaje; 

    const valueBD = document.getElementById('miSelectbd').value;
    const tablaBD = document.getElementById('CreaTabla').value;
    const mensajeError = document.getElementById('CreaTabla-error');
    const regex = /\bcreate\s+table\b/;
   // alert("miSelectbd"+valueBD);
 //   alert("CreaTabla"+tablaBD);
 if(!regex.test(tablaBD)){
    mensajeError.innerText = "esto no esta creando una tabla";
    var alert = alertify.alert("Crear Tablas", "Esto no esta creando una tabla").set('label', 'Aceptar'); 
    
 }
else
    if(valueBD ==="no" ){
        mensajeError.innerText = "Selecciona una base de datos correcta";
        var alert = alertify.alert("Crear Tablas", "Selecciona una base de datos correcta").set('label', 'Aceptar'); 
    }else
    if(tablaBD ===""){
        mensajeError.innerText = "Agrega datos de SQL";
        var alert = alertify.alert("Crear Tablas", "Agrega datos de SQL").set('label', 'Aceptar'); 
    }else{
        const formData = new FormData();
        formData.append('bd', valueBD); // Agregar el valor de miSelectbd al FormData
        formData.append('tabla', tablaBD); 

            try {
                fetch('php/CrearTablas.php', {
                    method: 'POST',
                    body: formData, // enviamos los datos 
                  
                })
                
                .then(response => response.text())
                .then(data =>{
            
                        var alert = alertify.alert("Crear Tablas", data.trim()).set('label', 'Aceptar'); 
                   
                        mensajeError.innerText = data.trim();
                    
                        console.error(data);
                 //   alert(data);  // Muestra la respuesta del servidor en un alert
                   
    
                })
                .catch(error => { 
                                console.error('Error:' + error);
                });
                
            } catch (error) {
                mensajeError.innerText = 'Error al crear la tabla';
                var alert = alertify.alert("Crear Tablas", 'Error al crear la tabla').set('label', 'Aceptar'); 
            }
          
    }

}




//funciones para el ingresar placa
function btnActividad(mensaje){
   

    const valuePlaca = document.getElementById('Placa').value;
    const valueMarca = document.getElementById('Marca').value;
    const valueModelo = document.getElementById('Modelo').value;
    const valueColor = document.getElementById('Color').value;
    const miSelectbdT = document.getElementById('miSelectbdT').value;
    const mensajeError = document.getElementById('Datos-error');
    let validadr = valuePlaca.trim();
    let validadrmarca = valueMarca.trim();
    let validadrmodelo = valueModelo.trim();
    let validadrcolor = valueColor.trim();
    const regex = /^[A-Z]{3}\d{3}$|^[A-Z]{3}\d{2}[A-Z]$/;
    //alert(miSelectbdT);
    
    if(mensaje==="btnGuardar"){
        if(validadr.length === 0  || validadrmarca.length === 0  || validadrmodelo.length === 0  || validadrcolor.length === 0 || miSelectbdT==="no" ){
            mensajeError.innerHTML = "Selecione Base de datos y digite todos los campos";
            var alert = alertify.alert("Gurdar", "Selecione Base de datos y digite todos los campos").set('label', 'Aceptar'); 
        }else
        if(!regex.test(valuePlaca)){
            mensajeError.innerHTML ="placa mal digitada";

        }else{
        const formData = new FormData(); //actividad local del if
        formData.append('bd', miSelectbdT); // Agregar el valor de miSelectbd al FormData
        formData.append('actividad', 'btnGuardar'); 
        formData.append('tabla', 'auto'); 
        formData.append('placa', valuePlaca); 
        formData.append('marca', valueMarca); 
        formData.append('modelo', valueModelo); 
        formData.append('color', valueColor); 
        fetch('php/General.php', {
            method: 'POST',
            body: formData, // enviamos los datos 
          
        })
        
        .then(response => response.text())
        .then(data =>{
               
            mensajeError.innerText = data.trim();
                
            var alert = alertify.alert("Gurdar", data.trim()).set('label', 'Aceptar');
                       
           
            console.error(data);
            
           

        })
        .catch(error => { 
                        console.error('Error:' + error);
        });



    }
    
}else
    if(mensaje==="btnActualizar"){
   // alert("actualizar");

    if(validadr.length === 0  || validadrmarca.length === 0  || validadrmodelo.length === 0  || validadrcolor.length === 0 || miSelectbdT==="no" ){
        mensajeError.innerHTML ="Selecione Base de datos y digite una placa";
        var alert = alertify.alert("Actualizar", "Selecione Base de datos y digite una placa").set('label', 'Aceptar');
    }
    if(!regex.test(valuePlaca)){
        mensajeError.innerHTML ="placa mal digitada";
        var alert = alertify.alert("Actualizar", "placa mal digitada").set('label', 'Aceptar');

    }
    else{



    const formData = new FormData(); //actividad local del if
    formData.append('bd', miSelectbdT); // Agregar el valor de miSelectbd al FormData
    formData.append('actividad', 'btnActualizar'); 
    formData.append('tabla', 'auto'); 
    formData.append('placa', valuePlaca); 
    formData.append('marca', valueMarca); 
    formData.append('modelo', valueModelo); 
    formData.append('color', valueColor); 
    fetch('php/General.php', {
        method: 'POST',
        body: formData, // enviamos los datos 
      
    })
    
    .then(response => response.text())
    .then(data =>{
            
          
                mensajeError.innerText = data.trim();
                var alert = alertify.alert("Actualizar", data.trim()).set('label', 'Aceptar');
                limpiarbusqueda();
               // alert("Datos Actualizados");

               
      
                   
       
        console.error(data);
        
       

    })
    .catch(error => { 
                    console.error('Error:' + error);
    });

   
    }
}else
    if(mensaje==="btnEliminar"){
   // alert("Eliminar");
    
    if(validadr.length === 0 ){
        mensajeError.innerHTML = "Selecione Base de datos y digite una placa";
        var alert = alertify.alert("Actualizar", "Selecione Base de datos y digite una placa").set('label', 'Aceptar');
    }else{
    const formData = new FormData(); //actividad local del if
    formData.append('bd', miSelectbdT); // Agregar el valor de miSelectbd al FormData
    formData.append('actividad', 'btnEliminar'); 
    formData.append('tabla', 'auto'); 
    formData.append('placa', valuePlaca); 





    fetch('php/General.php', {
        method: 'POST',
        body: formData, // enviamos los datos 
      
    })
    
    .then(response => response.text())
    .then(data =>{
            if("error al eliminar los datos"===data.trim()){
           
            mensajeError.innerText = "Placa eliminada";
            var alert = alertify.alert("Eliminar", "Placa eliminada").set('label', 'Aceptar');
            }
            else{
                mensajeError.innerText = data.trim();
                var alert = alertify.alert("Eliminar", data.trim()).set('label', 'Aceptar');
                limpiarbusqueda();
                

            }
      
                   
       
        console.error(data);
        
       

    })
    .catch(error => { 
                    console.error('Error:' + error);
    });





    }
}

}

function buscarTabla(mensaje) {
    mensaje;
  

    const mensajeError = document.getElementById('Datos-error');
    const miSelectbdT = document.getElementById('miSelectbdT').value;
    mensajeError.innerHTML = '';

    if (miSelectbdT === 'no') {
        mensajeError.innerText = 'Selecciona base de datos';
        var alert = alertify.alert("Eliminar", 'Selecciona base de datos').set('label', 'Aceptar');
        limpiarbusqueda();

    } else {
        //alert("esta es la placa " + mensaje);
        const formData = new FormData(); //actividad local del if
        formData.append('bd', miSelectbdT); // Agregar el valor de miSelectbd al FormData
        formData.append('actividad', 'buscar');
        formData.append('placa', mensaje);
        formData.append('tabla', 'auto');

        fetch('php/General.php', {
                method: 'POST',
                body: formData, // enviamos los datos 

            })
            .then(response => response.json()) // Convertir la respuesta a JSON
            .then(data => {
                if (data.error) {
                    console.error(data.error);
                } else {
                    // Procesar los datos recibidos
                    data.forEach(dato => {
                        console.log('Placa:', dato.placa);
                        document.getElementById('Marca').value = dato.marca;
                        console.log('Marca:', dato.marca);
                        document.getElementById('Modelo').value = dato.modelo
                        console.log('Modelo:', dato.modelo);
                        document.getElementById('Color').value = dato.color
                        console.log('Color:', dato.color);
                        // Continúa con los demás datos que tengas en tu objeto JSON
                    });

                }
            })
            .catch(error => {
                console.error('Error:' + error);
            });
    }
}


function limpiarbusqueda(){
 
        document.getElementById('Placa').value = '';
        document.getElementById('Marca').value = '';
        document.getElementById('Modelo').value = '';
        document.getElementById('Color').value = '';
        document.getElementById('Placa-error').textContent = '';
        document.getElementById('Marca-error').textContent = '';
        document.getElementById('Modelo-error').textContent = '';
        document.getElementById('Color-error').textContent = ''; 
        document.getElementById('Datos-error').textContent = '';
       
 
        
}

document.addEventListener('DOMContentLoaded', function() {
    verDB('mensaje');
});