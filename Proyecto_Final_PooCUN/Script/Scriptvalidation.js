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
                verDB('mensaje');

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
    alert(event.target.name);
    let bd = event.target.name;

    const formData = new FormData();
    formData.append('bd', bd); 
    

    fetch('php/Eliminar.php', {
        method: 'POST',
        body:formData, // Convertir el valor a JSON
      
    })
    
    .then(response => response.text())
    .then(data =>{
        if (data.trim() === "Bd Borrada correctamente" ||  data.trim() === "Error al borrar crear la bd") {
       //     mensajeError.innerText = data.trim();
            alert(data.trim());
        } 
                   
        else {
           // mensajeError.innerText = 'Error al borrar BD';
            alert('Error al borrar BD');
        }
        console.error(data);
       // alert(data);  // Muestra la respuesta del servidor en un alert
        verDB('mensaje');
       

    })
    .catch(error => { 
                     console.error('Error:' + error);
    });


   

    
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
 }
else
    if(valueBD ==="no" ){
        mensajeError.innerText = "Selecciona una base de datos correcta";
    }else
    if(tablaBD ===""){
        mensajeError.innerText = "Agrega datos de SQL";
    }else{
        const formData = new FormData();
        formData.append('bd', valueBD); // Agregar el valor de miSelectbd al FormData
        formData.append('tabla', tablaBD); 


            fetch('php/CrearTablas.php', {
                method: 'POST',
                body: formData, // enviamos los datos 
              
            })
            
            .then(response => response.text())
            .then(data =>{
                if (data.trim() === "Tabla Creada correctamente" ||  data.trim() === "Error al crear la Tabla") {
                    mensajeError.innerText = data.trim();
                } 
                           
                else {
                    mensajeError.innerText = 'Error al crear la tabla';
                }
                console.error(data);
                alert(data);  // Muestra la respuesta del servidor en un alert
               

            })
            .catch(error => { 
                            console.error('Error:' + error);
            });
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
            alert("Selecione Base de datos y digite todos los campos");
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
               
                    mensajeError.innerText = "Rgistrado";
                
          
                       
           
            console.error(data);
            
           

        })
        .catch(error => { 
                        console.error('Error:' + error);
        });



    }
    
}else
    if(mensaje==="btnActualizar"){
    alert("actualizar");

    if(validadr.length === 0  || validadrmarca.length === 0  || validadrmodelo.length === 0  || validadrcolor.length === 0 || miSelectbdT==="no" ){
        alert("Selecione Base de datos y digite una placa");
    }
    if(!regex.test(valuePlaca)){
        mensajeError.innerHTML ="placa mal digitada";

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
            if("error al actualizar los datos"===data.trim()){
           
            mensajeError.innerText = "Placa ya registrada";
            }
            else{
                mensajeError.innerText = data.trim();
                limpiarbusqueda();
                alert("Datos Actualizados");

            }
      
                   
       
        console.error(data);
        
       

    })
    .catch(error => { 
                    console.error('Error:' + error);
    });

   
    }
}else
    if(mensaje==="btnEliminar"){
    alert("Eliminar");
    
    if(validadr.length === 0 ){
        alert("Selecione Base de datos y digite una placa");
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
            }
            else{
                mensajeError.innerText = data.trim();
                limpiarbusqueda();
                alert("Datos Eliminados");

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

    if (miSelectbdT === 'no') {
        mensajeError.innerText = 'Selecciona base de datos';
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
}

document.addEventListener('DOMContentLoaded', function() {
    verDB('mensaje');
});