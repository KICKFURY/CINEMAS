// Importa los diferentes contenedores del sitio web
import {
    container_general, container_Seleccion_Boleto, container_seleccion_combo,
    container_seleccionar_asientos, container_tabla, container_datos_generales,
    container_rellenado_informacion
} from './contenedores.js'

// Importa los diferentes objetos del sitio web
import {
    datosContainerGeneral, datosContainerBoletos, precioBoleto, asientos,
    datos_Generales, datos_container_tarjeta, datosReflejadosTabla
} from './objetos.js'

// Importa los LKM utilizados en el sitio web
import {
    mensageCombos, opcionesCombo
} from './keys/LKM.js'

var mostrar = true
var bandera = true
var aplicaDescuento = false

let contadorNormal = 0
let contadorVIP = 0

// Ocultar Contenedores
function hideContainers() {
    container_Seleccion_Boleto.style.display = 'none'
    container_seleccion_combo.style.display = 'none'
    container_seleccionar_asientos.style.display = 'none'
    container_datos_generales.style.display = 'none'
    container_rellenado_informacion.style.display = 'none'
    container_tabla.style.display = 'none'
}

// Regresar contendedores
function showContainerGeneral() {
    container_Seleccion_Boleto.style.display = 'none'
    container_seleccion_combo.style.display = 'none'
    container_general.style.display = ''
    regresarValoresEstadoOriginal()
    agregarValoresCantidadBoletos()
    desabilidarContadoresDeBoletos(false)
}

// Restablecer a sus valores iniciales los elementos del contenedor de la sellecion de boletos
function regresarValoresEstadoOriginal() {
    aplicaDescuento = false
    contadorNormal = 0
    contadorVIP = 0
}

// Regresar a seleccion de boletos
function regresarSeleccionBoleto() {
    container_seleccionar_asientos.style.display = 'none'
    container_Seleccion_Boleto.style.display = ''
    limpiarAsientos()
}

// Limpiar todos los asientos
function limpiarAsientos() {
    for (let index = 0; index < asientos.asiento.length; index++) {
        asientos.asiento[index].checked = false
        asientos.asiento[index].disabled = false
        if (index == asientos.asiento.length - 1) {
            asientos.seleccionados = []
            document.getElementById('btnRealizarPago').disabled = true
        }
    }
}

// Validar los datos de entradas del primer contenedor
function validarEntrada() {
    document.getElementById('btnComprar').disabled = true
    hideContainers()
    let btn = document.getElementById('btnSiguiente1')

    if (datosContainerGeneral.fecha.value == null || datosContainerGeneral.fecha.value == '') {
        datosContainerGeneral.pelicula.disabled = true
        datosContainerGeneral.horario.disabled = true
        btn.disabled = true
    }

    datosContainerGeneral.cinemas.disabled = datosContainerGeneral.fecha.value == null || datosContainerGeneral.fecha.value == '' ? true : false

    if (datosContainerGeneral.cinemas.value == null || datosContainerGeneral.cinemas.value == '') {
        datosContainerGeneral.horario.disabled = true
    }

    datosContainerGeneral.pelicula.disabled = datosContainerGeneral.cinemas.value == null || datosContainerGeneral.cinemas.value == '' ? true : false

    datosContainerGeneral.horario.disabled = datosContainerGeneral.pelicula.value == null || datosContainerGeneral.pelicula.value == '' ? true : false

    if (datosContainerGeneral.horario.value != '') {
        btn.disabled = false
    }
}

// Validacion en la seleccion de asientos
function validarAsientosSeleccionados() {
    datosReflejadosTabla.cantidadNormal = datosContainerBoletos.cantidadNormal.value
    datosReflejadosTabla.cantidadVIP = datosContainerBoletos.cantidadVIP.value
    let cantidadBoletos = parseInt(datosContainerBoletos.cantidadNormal.value) + parseInt(datosContainerBoletos.cantidadVIP.value)
    for (var i = 0; i < asientos.asiento.length; i++) {
        if (asientos.asiento[i].checked) {
            if (bandera) {
                asientos.seleccionados.push(asientos.asiento[i].value)
                bandera = false
            } else {
                if (asientos.seleccionados.includes(asientos.asiento[i].value)) {
                    continue
                }
                asientos.seleccionados.push(asientos.asiento[i].value)
            }
        }
    }

    if (asientos.seleccionados.length >= cantidadBoletos) {
        for (var i = 0; i < asientos.asiento.length; i++) {
            asientos.asiento[i].disabled = true
            document.getElementById('btnRealizarPago').disabled = false
        }
    } else {
        document.getElementById('btnRealizarPago').disabled = true
    }
}

// Ocultar el primer contenedor 
function hideContainerGeneral() {
    container_general.style.display = 'none'
    container_Seleccion_Boleto.style.display = ''
}

// Mostrar seleccion de boletos
function showSeleccionBoleto() {
    hideContainerGeneral()
    validarSeleccionBoletos()
}

// Ocultar el contenedor de boletos
function hideContainerBoletos() {
    document.getElementById('btnRealizarPago').disabled = true
    container_seleccion_combo.style.display = 'none'
    container_general.style.display = 'none'
    container_Seleccion_Boleto.style.display = 'none'
    container_seleccionar_asientos.style.display = ''
}

// Mostrar la tabla
function showTableFullData() {
    document.getElementById('btnComprar').disabled = false
    container_general.style.display = 'none'
    container_Seleccion_Boleto.style.display = 'none'
    container_seleccionar_asientos.style.display = 'none'
    container_tabla.style.display = ''
    configureTable()
}

// Mostrar o Oculta el conenedor de compra combo
function compraBoletoShowOrHide() {
    let description = document.getElementById('descriptionCombo')
    let opciones = document.getElementById('opcionesCombo')
    let btnCompra = document.getElementById('btnAdquirirCompra')
    btnCompra.addEventListener("click", agregarComboCompra)
    let message = ""
    let options = ""

    if (mostrar) {
        mostrar = false
        container_seleccion_combo.style.display = ''
        desabilidarContadoresDeBoletos(true)
    } else {
        mostrar = true
        container_seleccion_combo.style.display = 'none'
        desabilidarContadoresDeBoletos(false)
    }

    switch (datosContainerGeneral.fecha.value) {
        case "1":
            message = mensageCombos.lunes
            options = opcionesCombo.lunes
            break
        case "2":
            message = mensageCombos.martes
            options = opcionesCombo.martes
            break
        case "3":
            message = mensageCombos.miercoles
            options = opcionesCombo.miercoles
            break
        case "4":
            message = mensageCombos.jueves
            options = opcionesCombo.jueves
            break
        case "5":
            message = mensageCombos.viernes
            options = opcionesCombo.viernes
            break
        case "6":
            message = mensageCombos.sabado
            options = opcionesCombo.sabado
            break
        case "7":
            message = mensageCombos.domingo
            options = opcionesCombo.domingo
            break
        default:
            break
    }

    description.innerHTML = message
    opciones.innerHTML = options
    btnCompra.innerHTML = `Añadir a la compra`
}

// Agregar precio a los diferentes tipos de combos
function agregarComboCompra() {
    alert("Combo agregado exitosamente")
    aplicaDescuento = true
    document.getElementById('btnAdquirirCompra').disabled = true
    document.getElementById('btnEliminarCompra').disabled = false
    seleccionarDiaCombo(datosContainerGeneral.fecha.value)
}

// Selecciona el precio del combo
function seleccionarDiaCombo(fecha) {
    switch (fecha) {
        case "1":
            datosReflejadosTabla.calcularSubTotalConCombo(200)
            break
        case "2":
            datosReflejadosTabla.calcularSubTotalConCombo(60)
            break
        case "3":
            datosReflejadosTabla.calcularSubTotalConCombo(60)
            break
        case "4":
            datosReflejadosTabla.calcularSubTotalConCombo(300)
            break
        case "5":
            datosReflejadosTabla.calcularSubTotalConCombo(40)
            break
        case "6":
            datosReflejadosTabla.calcularSubTotalConCombo(40)
            break
        case "7":
            datosReflejadosTabla.calcularSubTotalConCombo(300)
            break
        default:
            break
    }
}

// configuracion de la tabla de datos
function configureTable() {
    let tabla = document.getElementById('data-table')
    let head = document.createElement('tr')
    let fila = document.createElement('tr')

    let subTotal
    let cellDescuento
    let total

    if (aplicaDescuento) {
        seleccionarDiaCombo(datosContainerGeneral.fecha.value)
        subTotal = datosReflejadosTabla.subtotal
        cellDescuento = datosContainerGeneral.fecha.value != "5" && datosContainerGeneral.fecha.value != "6" ? "15%" : "No aplica"
        total = datosReflejadosTabla.total
    } else {
        datosReflejadosTabla.calcularSubTotalSinCombo()
        subTotal = datosReflejadosTabla.subtotal
        cellDescuento = "No aplica"
        total = datosReflejadosTabla.total
    }
    console.log(datosReflejadosTabla.asientos)
    if (datosReflejadosTabla.cantidadNormal > 0 && datosReflejadosTabla.cantidadVIP > 0) {
        head.innerHTML = `
        <th>Asientos</th>
        <th>Pelicula</th>
        <th>Boleto</th>
        <th>Precio Boleto Normal</th>
        <th>Cantidad Boleto Normal</th>
        <th>Precio Boleto VIP</th>
        <th>Cantidad Boleto VIP</th>
        <th>Subtotal</th>
        <th>Descuento</th>
        <th>Total</th>
        `
    
        fila.innerHTML = `
        <td>${datosReflejadosTabla.asientos}</td>
        <td>${datosReflejadosTabla.pelicula.value}</td>
        <td>Normal + VIP</td>
        <td>C$ ${precioBoleto.normal.toFixed(2)}</td>
        <td>${datosReflejadosTabla.cantidadNormal}</td>
        <td>C$ ${precioBoleto.vip.toFixed(2)}</td>
        <td>${datosReflejadosTabla.cantidadVIP}</td>
        <td>C$ ${subTotal.toFixed(2)}</td>
        <td>${cellDescuento}</td>
        <td>C$ ${total.toFixed(2)}</td> 
        `
    } else {
        let precio
        let cantidad
        // MARK: - Cambiar por un terminario
        if (datosContainerBoletos.tipoBoleto.match("normal")) {
            precio = precioBoleto.normal
            cantidad = datosReflejadosTabla.cantidadNormal
        } else {
            precio = precioBoleto.vip
            cantidad = datosReflejadosTabla.cantidadVIP
        }

        head.innerHTML = `
        <th>Asientos</th>
        <th>Pelicula</th>
        <th>Boleto</th>
        <th>Cantidad</th>
        <th>Precio Boleto</th>
        <th>Subtotal</th>
        <th>Descuento</th>
        <th>Total</th>
        `

        fila.innerHTML = `
        <td>${datosReflejadosTabla.asientos}</td>
        <td>${datosReflejadosTabla.pelicula.value}</td>
        <td>${datosContainerBoletos.tipoBoleto}</td>
        <td>${cantidad}</td>
        <td>C$ ${precio.toFixed(2)}</td>
        <td>C$ ${subTotal.toFixed(2)}</td>
        <td>${cellDescuento}</td>
        <td>C$ ${total.toFixed(2)}</td>
        `
    }

    tabla.appendChild(head)
    tabla.appendChild(fila)
}

// Funcionalidades de los boletos
function validarSeleccionBoletos() {
    document.getElementById('txtCantNormal').disabled = true
    document.getElementById('txtCantVIP').disabled = true
    if (parseInt(datosContainerBoletos.cantidadNormal.value) > 0 || parseInt(datosContainerBoletos.cantidadVIP.value) > 0) {
        document.getElementById('btnAdquirir').disabled = false
        document.getElementById('btnSiguiente2').disabled = false
    } else {
        document.getElementById('btnAdquirir').disabled = true
        document.getElementById('btnSiguiente2').disabled = true
    }
}

// Dismiuir en uno la cantidad de boletos
function menos() {
    if (event.target.id == "btnMenosNormal") {
        if (contadorNormal != 0) {
            let input = document.getElementById('txtCantNormal')
            input.value = --contadorNormal
        }
    } else {
        if (contadorVIP != 0) {
            let input = document.getElementById('txtCantVIP')
            input.value = --contadorVIP
        }
    }
    validarSeleccionBoletos()
    capturarCantidadBoletos()
}

// Aumentar en uno la cantidad de boletos
function mas() {
    if (event.target.id == "btnMasNormal") {
        if (contadorNormal != 10) {
            let input = document.getElementById('txtCantNormal')
            input.value = ++contadorNormal
            datosContainerBoletos.tipoBoleto = "normal"
        }
    } else {
        if (contadorVIP != 10) {
            let input = document.getElementById('txtCantVIP')
            input.value = ++contadorVIP
            datosContainerBoletos.tipoBoleto = "vip"
        }
    }
    validarSeleccionBoletos()
    capturarCantidadBoletos()
}

// Capturar los valores de las cantidades de boletos
function capturarCantidadBoletos() {
    datosReflejadosTabla.cantidadNormal = datosContainerBoletos.cantidadNormal.value
    datosReflejadosTabla.cantidadVIP = datosContainerBoletos.cantidadVIP.value
}

// Desactivar los botones de aumentar y dsminuir la cantidad de boletos
function desabilidarContadoresDeBoletos(value) {
    document.getElementById('btnMasVIP').disabled = value
    document.getElementById('btnMenosVIP').disabled = value

    document.getElementById('btnMasNormal').disabled = value
    document.getElementById('btnMenosNormal').disabled = value
}

// Agregar el valor 0 a los inputs de las cantidades de boletos
function agregarValoresCantidadBoletos() {
    document.getElementById('btnMasNormal').addEventListener("click", mas)
    document.getElementById('btnMenosNormal').addEventListener("click", menos)

    document.getElementById('btnMasVIP').addEventListener("click", mas)
    document.getElementById('btnMenosVIP').addEventListener("click", menos)

    document.getElementById('txtCantNormal').value = "0"
    document.getElementById('txtCantVIP').value = "0"
}

// Datos Generales
// Mostrar contenedor datos generales
function showDtosGenerales() {
    container_datos_generales.style.display = ''
    datos_Generales.nombre.value = localStorage.getItem('nombre')
    datos_Generales.email.value = localStorage.getItem('correo')
    container_tabla.style.display = 'none'
}

// Tarjeta credito
// Validar activacion de boton para la confirmacion del pago
function validarBtnConfirmarCompra() {
    document.getElementById('btnConfirmacionPago').disabled = true
    if (datos_container_tarjeta.nombre.value != "" && datos_container_tarjeta.numero.value != "" && datos_container_tarjeta.mes.value != "" && datos_container_tarjeta.year.value != "" && datos_container_tarjeta.cvv.value.length > 2) {
        document.getElementById('btnConfirmacionPago').disabled = false
    } else {
        document.getElementById('btnConfirmacionPago').disabled = true
    }
}

function obtenerFechaEnEspañol(fecha) {
    const options = { weekday: 'long', day: '2-digit', month: '2-digit', year: 'numeric' }
    return fecha.toLocaleDateString('es-ES', options)
}

function obtenerPrimerDiaSemana() {
    const hoy = new Date()
    const diaSemana = hoy.getDay()
    const diferencia = (diaSemana + 7 - 1) % 7
    hoy.setDate(hoy.getDate() - diferencia)
    return hoy
}

function generarFechasSemana() {
    const primerDiaSemana = obtenerPrimerDiaSemana()
    const fechasSemana = [];
    for (let i = 0; i < 7; i++) {
        const fecha = new Date(primerDiaSemana);
        fecha.setDate(primerDiaSemana.getDate() + i)
        fechasSemana.push(fecha)
    }
    return fechasSemana
}

function agregarFechasAlSelect(fechas) {
    const select = document.getElementById('fecha')
    let contador = 1
    for (let i = 0; i < fechas.length; i++) {
        const fecha = fechas[i];
        const option = document.createElement('option')
        option.value = contador++
        option.text = obtenerFechaEnEspañol(fecha)
            if (fecha < new Date()) {
                option.disabled = true
            }
        select.appendChild(option)
    }
}

// Eventos de la pagina 
// Agregaa los diferentes eventos a los disparadores del sitio web
function addEvents() {
    document.getElementById('btnEliminarCompra').disabled = true
    datosContainerGeneral.fecha.addEventListener("click", validarEntrada)
    datosContainerGeneral.cinemas.addEventListener("click", validarEntrada)
    datosContainerGeneral.pelicula.addEventListener("click", validarEntrada)
    datosContainerGeneral.horario.addEventListener("click", validarEntrada)

    document.getElementById("btnSiguiente1").addEventListener("click", showSeleccionBoleto)
    document.getElementById("btnSiguiente2").addEventListener("click", hideContainerBoletos)
    document.getElementById("btnRealizarPago").addEventListener("click", showTableFullData)

    document.getElementById("btnAnterior1").addEventListener("click", showContainerGeneral)
    document.getElementById("regresarSeleccionBoleto").addEventListener("click", regresarSeleccionBoleto)

    document.getElementById("btnAdquirir").addEventListener("click", compraBoletoShowOrHide)
    document.getElementById('btnEliminarCompra').addEventListener("click", () => {
        alert("Combo eliminado exitosamente")
        aplicaDescuento = false
        document.getElementById('btnEliminarCompra').disabled = true
        document.getElementById('btnAdquirirCompra').disabled = false
    })

    for (let index = 1; index < 6; index++) {
        document.getElementById('rdaA' + index).addEventListener("click", validarAsientosSeleccionados)
    }

    for (let index = 1; index < 6; index++) {
        document.getElementById('rdaB' + index).addEventListener("click", validarAsientosSeleccionados)
    }

    for (let index = 1; index < 6; index++) {
        document.getElementById('rdaC' + index).addEventListener("click", validarAsientosSeleccionados)
    }

    for (let index = 1; index < 6; index++) {
        document.getElementById('rdaD' + index).addEventListener("click", validarAsientosSeleccionados)
    }

    for (let index = 1; index < 6; index++) {
        document.getElementById('rdaE' + index).addEventListener("click", validarAsientosSeleccionados)
    }

    document.getElementById('btnLimpiarAsientos').addEventListener("click", limpiarAsientos)

    document.getElementById('btnComprar').addEventListener("click", showDtosGenerales)

    document.getElementById('formulario-datos-generales').addEventListener('submit', (evento) => {
        evento.preventDefault()
        validarBtnConfirmarCompra()
        container_datos_generales.style.display = 'none'
        container_rellenado_informacion.style.display = ''
    })

    document.getElementById('btnConfirmacionPago').addEventListener("click", () => {
        validarBtnConfirmarCompra()
        return confirmacion()
    })

    datos_container_tarjeta.nombre.addEventListener('keyup', validarBtnConfirmarCompra)
    datos_container_tarjeta.numero.addEventListener('keyup', validarBtnConfirmarCompra)
    datos_container_tarjeta.mes.addEventListener('click', validarBtnConfirmarCompra)
    datos_container_tarjeta.year.addEventListener('click', validarBtnConfirmarCompra)
    datos_container_tarjeta.cvv.addEventListener('keyup', validarBtnConfirmarCompra)
}

// Confirmacion de la compra
function confirmacion() {
    let resp = confirm("Desea realizar la compra?")
    return resp ? true : false
}

// Cargar pantalla de carga
function cargarLoading() {
    document.querySelector('.loading').style.display = ''
}

// Mostrar el el contenedor principal
function mostrarHomeView() {
    document.querySelector('.loading').style.display = 'none'
}

// Exportar las funciones requeridas para usarlas en el home.js
export { validarEntrada, agregarValoresCantidadBoletos, addEvents, cargarLoading,
        mostrarHomeView, generarFechasSemana, agregarFechasAlSelect }