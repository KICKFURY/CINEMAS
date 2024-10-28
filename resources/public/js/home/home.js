import { validarEntrada, agregarValoresCantidadBoletos, addEvents, cargarLoading,
        mostrarHomeView, generarFechasSemana, agregarFechasAlSelect } from "./controller.js"

window.onload = function() {
  addEvents()
  validarEntrada()
  agregarValoresCantidadBoletos()
  cargarLoading()
}

window.addEventListener("load", function() {
  const fechasSemana = generarFechasSemana()
  mostrarHomeView()
  agregarFechasAlSelect(fechasSemana)
  validarEntrada()
})

window.addEventListener('beforeunload', function(event) {
  event.returnValue = '';
});