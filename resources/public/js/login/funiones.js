import { newUserRegister } from "./objects.js";

var registerNewUserB = false

let usuarioLocal = localStorage.getItem('email')
let contraLocal = localStorage.getItem('psw')

function showRegisterForm() {
    let register = document.querySelector('.container__registrar')
    let iniciarSecion = document.querySelector('.container__iniciarSecion')
    iniciarSecion.style.display = "none"
    register.style.display = ""
}

function showInicioForm() {
    let register = document.querySelector('.container__registrar')
    let iniciarSecion = document.querySelector('.container__iniciarSecion')
    register.style.display = "none"
    iniciarSecion.style.display = ""
}

function registerNewUser() {
    if (newUserRegister.psw.value != newUserRegister.configPsw.value) {
        alert("La contraseña no coincide")
        registerNewUserB = false
    } else {
        localStorage.setItem('email', `${newUserRegister.correo.value}`)
        localStorage.setItem('psw', `${newUserRegister.configPsw.value}`)
        usuarioLocal = localStorage.getItem('email')
        contraLocal = localStorage.getItem('psw')
        registerNewUserB = true
        showInicioForm()
    }
}

function validarLogin(correo, psw) {
    let email = document.getElementById('txtEmail')
    let password = document.getElementById('txtPsw')

    let correoInvitado = "admin@gmail.com"
    let contraInvitado = "123"

    if (correo == "" && psw == "") {
        correo = correoInvitado
        psw = contraInvitado
    }

    if (email.value != correoInvitado && password.value != contraInvitado) {
        if (email.value == correo && password.value == contraLocal) {
            localStorage.setItem('nombre', `${newUserRegister.usuario.value}`)
            localStorage.setItem('correo', `${newUserRegister.correo.value}`)
            alert(`Bienvenido a CINEMAS ${newUserRegister.usuario.value}`)
            window.open('/resources/views/home/home.html', '_self')
        } else {
            alert("Credenciales Incorrectas")
        }
    } else if (email.value != "" && password.value != "") {
        if (email.value == correoInvitado && password.value == contraInvitado) {
            localStorage.setItem('nombre', `admin`)
            localStorage.setItem('correo', `${newUserRegister.correo.value}`)
            alert("Bienvenido a CINEMAS")
            window.open('/resources/views/home/home.html', '_self')
        } else {
            alert("Credenciales Incorrectas")
        }
    }
}

function addEvents() {
    document.getElementById('formulario-login').addEventListener("submit", (evento) => {
        evento.preventDefault()
        validarLogin(usuarioLocal, contraLocal)
    })
    
    document.getElementById('formulario-register').addEventListener("submit", (evento) => {
        evento.preventDefault()
        registerNewUser()
    })

    document.getElementById('btnRegistrar').addEventListener("click", showRegisterForm)
    document.getElementById('btnInicio').addEventListener("click", showInicioForm)
}

export { showRegisterForm, showInicioForm, registerNewUser,
        validarLogin, addEvents }