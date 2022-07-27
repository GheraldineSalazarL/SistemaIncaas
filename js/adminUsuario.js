/**
 * @ProyectoSisteamaIncaas: Este script obtiene las funcionalidades de adminUsuario.
 * 
 * @version: v1.0.0
 * @author: Gheraldine Salazar
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */


//  Elementos 
let btnNuevoUser = document.getElementById("btnNuevoUser");

let inputUs=document.getElementById('inputUs');
let inputRolUs=document.getElementById('inputRolUs');
let inputNombreUs=document.getElementById('inputNombreUs');
let inputEmailUs=document.getElementById('inputEmailUs');
let inputCelUs=document.getElementById('inputCelUs');
let btnCrearUser = document.getElementById("btnCrearUser");


//  Boton Desplegar formulario de nuevo usuario
let section = true;
formularioUsers.className = 'oculto';
const manageSection = ()=>{
    section = !section;
    switch (section) {
        case true:
            formularioUsers.className = 'oculto';
            break;
        case false:
            formularioUsers.className = 'visible';
            break;
    }
}
btnNuevoUser.onclick = manageSection;

// Crear usuarios y agregarlo a Storage
let usuarios = JSON.parse(localStorage.getItem("usuarios")) || [];

btnCrearUser.onclick = (e) =>{
    e.preventDefault(); 
    let usuario=inputUs.value;
    const buscado = usuarios.find(usuarioBus=>usuarioBus.usuario===usuario);
    if (buscado){
        // resetInputs();
        Swal.fire({
            title: 'Alerta',
            text: 'El usuario ya existe',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2000
        });
    } else{
        addUs();
    } 
}
class listaUsuarios{
    constructor(usuario,rol,nombre,email,cel){
        this.usuario=usuario;
        this.rol=rol;
        this.nombre=nombre;
        this.email=email;
        this.cel=cel;
    }
}
const addUs = () =>{
    let usuario=inputUs.value;
    let rol=inputRolUs.value;
    let nombre=inputNombreUs.value;
    let email=inputEmailUs.value;
    let cel=inputCelUs.value;

    
    
    if(usuario !== '' && nombre !== '' && rol !== ''){
        let nuevoUsuario = new listaUsuarios(usuario,rol,nombre,email);
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));
        
        // resetInputs();
        Swal.fire({
            title: 'Bien hecho!',
            text: 'Nuevo usuario registrado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 2500,
        });
        // addNewListaUsuarios();
        // addDoc();
        // inicialize();
    }else{
        // resetInputs();
        Swal.fire({
            title: 'Error',
            text: 'Debe completar los campos de usuario, nombre, rol y password obligatoriamente',
            icon: 'error',
            showConfirmButton: false,
            timer: 3000
        });
    }
}

