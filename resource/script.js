// Selección de elementos del DOM
const form = document.querySelector('form');
const nombreInput = document.getElementById('nombre');
const correoInput = document.getElementById('correo');
const peliculaSelect = document.getElementById('pelicula');
const cantidadInput = document.getElementById('cantidad');

// Validación de entrada
function validarEntrada() {
  // Validar que el nombre tenga al menos 3 caracteres
  if (nombreInput.value.length < 3) {
    nombreInput.setCustomValidity('El nombre debe tener al menos 3 caracteres');
  } else {
    nombreInput.setCustomValidity('');
  }
  
  // Validar que el correo electrónico tenga un formato válido
  if (!correoInput.checkValidity()) {
    correoInput.setCustomValidity('El correo electrónico no es válido');
  } else {
    correoInput.setCustomValidity('');
  }
  
  // Validar que se haya seleccionado una película
  if (peliculaSelect.value === '') {
    peliculaSelect.setCustomValidity('Debe seleccionar una película');
  } else {
    peliculaSelect.setCustomValidity('');
  }
  
  // Validar que se haya seleccionado al menos 1 boleto
  if (cantidadInput.value < 1) {
    cantidadInput.setCustomValidity('Debe seleccionar al menos 1 boleto');
  } else {
    cantidadInput.setCustomValidity('');
  }
}

// Procesamiento del formulario
function procesarFormulario(event) {
  event.preventDefault();
  
  // Validar la entrada antes de enviar el formulario
  validarEntrada();
  
  // Si el formulario es válido, enviar los datos al servidor
  if (form.checkValidity()) {
    // Aquí podrías agregar el código para enviar los datos del formulario al servidor para procesar el pago y crear los boletos
    alert('¡Gracias por su compra!');
  }
}

// Agregar event listener para el envío del formulario
form.addEventListener('submit', procesarFormulario);
