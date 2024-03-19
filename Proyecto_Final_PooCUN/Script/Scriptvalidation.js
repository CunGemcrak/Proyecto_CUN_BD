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
    miSelectbd.innerHTML = '';
    const optionDefault = document.createElement('option');
    optionDefault.value = "no";
    optionDefault.textContent = "Selecciona BD";
    miSelectbd.appendChild(optionDefault);

    
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
   // alert("miSelectbd"+valueBD);
 //   alert("CreaTabla"+tablaBD);

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

