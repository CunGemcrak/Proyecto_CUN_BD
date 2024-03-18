document.addEventListener('DOMContentLoaded', () => {
    const modeloInput = document.getElementById('Modelo');
    const mensajeError = document.getElementById('Modelo-error');

    modeloInput.addEventListener('input', () => {
        let modeloValue = modeloInput.value.trim();
        // Eliminar caracteres que no sean números del valor ingresado
        modeloValue = modeloValue.replace(/\D/g, '');

        // Limitar el valor a 4 caracteres
        modeloValue = modeloValue.slice(0, 4);

        // Actualizar el valor del input con solo 4 números
        modeloInput.value = modeloValue;

        // Verificar si el valor ingresado contiene exactamente 4 dígitos
        if (modeloValue.length === 4 ) {
            mensajeError.textContent = ''; // Borrar mensaje de error
        } else {
            mensajeError.textContent = 'Ingresa solo 4 números.';
        }
    });
});


document.addEventListener('DOMContentLoaded', () => {
    const placaInput = document.getElementById('Placa');
    const mensajeError = document.getElementById('Placa-error');

    placaInput.addEventListener('input', () => {
        placaInput.value = placaInput.value.toUpperCase();

        const placaValue = placaInput.value.trim().toUpperCase();
        const regex = /^[A-Z]{3}\d{3}$|^[A-Z]{3}\d{2}[A-Z]$/;

        if (regex.test(placaValue)) {
            mensajeError.textContent = '';
        } else {
            mensajeError.textContent = 'Placa inválida.';
        }


    });
});



document.addEventListener('DOMContentLoaded', () => {
    const placaInput = document.getElementById('CreaBD');
    const mensajeError = document.getElementById('CreaBD-error');

    placaInput.addEventListener('input', () => {
        let inputValue = placaInput.value.trim().toLowerCase();
        inputValue = inputValue.replace(/[0-9]/g, ''); // Eliminar caracteres que sean números

        placaInput.value = inputValue; // Asignar el nuevo valor al campo

        if (inputValue === '') {
            mensajeError.textContent = 'El campo no puede estar vacio.';
        } else {
            mensajeError.textContent = '';
        }
    });
});










document.addEventListener('DOMContentLoaded', () => {
    const placaInput = document.getElementById('Marca');
    const mensajeError = document.getElementById('Marca-error');

    placaInput.addEventListener('input', () => {
        placaInput.value = placaInput.value.toUpperCase();
        if (placaInput.value.length > 15) {
            placaInput.value = placaInput.value.slice(0, 15);
            mensajeError = 'maximo 15 caracteres';
        }


    });
});



document.addEventListener('DOMContentLoaded', () => {
    const placaInput = document.getElementById('Color');
    const mensajeError = document.getElementById('Color-error');

    placaInput.addEventListener('input', () => {
        placaInput.value = placaInput.value.toUpperCase();
        if (placaInput.value.length > 10) {
            placaInput.value = placaInput.value.slice(0, 15);
            mensajeError = 'maximo 10 caracteres';
        }


    });
});



document.addEventListener('DOMContentLoaded', () => {
    const limpiarBtn = document.getElementById('btnLimpiar');

    limpiarBtn.addEventListener('click', () => {
        document.getElementById('Placa').value = '';
        document.getElementById('Marca').value = '';
        document.getElementById('Modelo').value = '';
        document.getElementById('Color').value = '';
        document.getElementById('Placa-error').textContent = '';
        document.getElementById('Marca-error').textContent = '';
        document.getElementById('Modelo-error').textContent = '';
        document.getElementById('Color-error').textContent = '';
    });
});





