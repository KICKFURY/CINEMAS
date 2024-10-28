const precioBoleto = {
    normal: 100,
    vip: 180,
}

const datosContainerGeneral = {
    fecha: document.getElementById('fecha'),
    cinemas: document.getElementById('cinemas'),
    pelicula: document.getElementById('pelicula'),
    horario: document.getElementById('horario')
}

const datosContainerBoletos = {
    cantidadNormal: document.getElementById('txtCantNormal'),
    cantidadVIP: document.getElementById('txtCantVIP'),
    tipoBoleto: ""
}

const asientos = {
    asiento: document.getElementsByName('asiento'),
    seleccionados: []
}

const datos_Generales = {
    nombre: document.getElementById('txtNombreCompra'),
    email: document.getElementById('txtEmailCompra')
}

const datos_container_tarjeta = {
    nombre: document.getElementById('txtNombreTarjeta'),
    numero: document.getElementById('txtNumberTarjeta'),
    mes: document.getElementById('cmbMes'),
    year: document.getElementById('cmbAnio'),
    cvv: document.getElementById('txtCVV'),
}

const datosReflejadosTabla = {
    asientos: asientos.seleccionados,
    pelicula: datosContainerGeneral.pelicula,
    boleto: "",
    cantidadNormal: 0,
    cantidadVIP: 0,
    subtotal: 0,
    total: 0,
    calcularSubTotalSinCombo() {
        this.subtotal = (this.cantidadNormal * precioBoleto.normal) + (this.cantidadVIP * precioBoleto.vip)
        this.total = this.subtotal
    },
    calcularSubTotalConCombo(precioCombo) {
        let calculo = ((this.cantidadNormal * precioBoleto.normal) + (this.cantidadVIP * precioBoleto.vip) + precioCombo)
        this.subtotal = calculo
        if (datosContainerGeneral.fecha.value != "5" && datosContainerGeneral.fecha.value != "6") {
            this.total = calculo * 0.85
        } else {
            this.total = calculo
        }        
    }
}

export { datosContainerGeneral, datosContainerBoletos, precioBoleto, asientos,
        datos_Generales, datos_container_tarjeta, datosReflejadosTabla }