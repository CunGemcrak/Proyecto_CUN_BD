document.addEventListener('DOMContentLoaded', () => {
    // Botones a activar
    const modeloInput = document.getElementById('Modelo');
    const placaInput = document.getElementById('Placa');
    const MarcaaInput = document.getElementById('Marca');
    const ColorInput = document.getElementById('Color');
    const limpiarBtn = document.getElementById('btnLimpiar');
    const CreaBDInput = document.getElementById('CreaBD');
    const textarea = document.getElementById('CreaTabla');

    modeloInput.addEventListener('input', () => {
        const mensajeError = document.getElementById('Modelo-error');
        let modeloValue = modeloInput.value.trim();
        modeloValue = modeloValue.replace(/\D/g, '');
        modeloValue = modeloValue.slice(0, 4);
        modeloInput.value = modeloValue;
        if (modeloValue.length === 4) {
            mensajeError.textContent = '';
        } else {
            mensajeError.textContent = 'Ingresa solo 4 números.';
        }
    });

    placaInput.addEventListener('input', () => {
        const mensajeError = document.getElementById('Placa-error');
        placaInput.value = placaInput.value.toUpperCase();
        const placaValue = placaInput.value.trim().toUpperCase();
        const regex = /^[A-Z]{3}\d{3}$|^[A-Z]{3}\d{2}[A-Z]$/;
        if (regex.test(placaValue)) {
            mensajeError.textContent = '';
        } else {
            mensajeError.textContent = 'Placa inválida.';
        }
    });

    CreaBDInput.addEventListener('input', () => {
        const mensajeError = document.getElementById('CreaBD-error');
        let inputValue = CreaBDInput.value.trim().toLowerCase();
        inputValue = inputValue.replace(/[0-9]/g, ''); // Eliminar caracteres que sean números
        CreaBDInput.value = inputValue; // Asignar el nuevo valor al campo
        if (inputValue === '') {
            mensajeError.textContent = 'El campo no puede estar vacio.';
        } else {
            mensajeError.textContent = '';
        }
    });

    MarcaaInput.addEventListener('input', () => {
        const mensajeError = document.getElementById('Marca-error');
        MarcaaInput.value = MarcaaInput.value.toUpperCase();
        if (MarcaaInput.value.length > 15) {
            MarcaaInput.value = MarcaaInput.value.slice(0, 15);
            mensajeError.textContent = 'Máximo 15 caracteres';
        } else {
            mensajeError.textContent = '';
        }
    });

    ColorInput.addEventListener('input', () => {
        const mensajeError = document.getElementById('Color-error');
        ColorInput.value = ColorInput.value.toUpperCase();
        if (ColorInput.value.length > 10) {
            ColorInput.value = ColorInput.value.slice(0, 10);
            mensajeError.textContent = 'Máximo 10 caracteres';
        } else {
            mensajeError.textContent = '';
        }
    });

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

    textarea.addEventListener('input', () => {
        textarea.value = textarea.value.toLowerCase();
    });
});