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
let formularioUsers=document.getElementById('formularioUsers');


let inputUs=document.getElementById('inputUs');
let inputRolUs=document.getElementById('inputRolUs');
let inputNombreUs=document.getElementById('inputNombreUs');
let inputEmailUs=document.getElementById('inputEmailUs');
let inputCelUs=document.getElementById('inputCelUs');
let btnCrearUser = document.getElementById("btnCrearUser");
let mensjFormUs = document.getElementById("mensjFormUs");

let tablaUs = document.getElementById("tablaUs");

let inputRolUsM=document.getElementById('inputRolUsM');
let inputNombreUsM=document.getElementById('inputNombreUsM');
let inputEmailUsM=document.getElementById('inputEmailUsM');
let inputCelUsM=document.getElementById('inputCelUsM');

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
let docentes = JSON.parse(localStorage.getItem("docentes")) || [];


btnCrearUser.onclick = (e) =>{
    e.preventDefault(); 
    let usuario=inputUs.value;
    const buscado = usuarios.find(usuarioBus=>usuarioBus.usuario===usuario);
    if (buscado){
        resetInputs();
        Swal.fire({
            title: 'Alerta',
            text: 'El usuario ya existe',
            icon: 'warning',
            showConfirmButton: false,
            timer: 3000
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
    
    if(usuario===''){
        mensjFormUs.innerHTML = "¡Ingrese el usuario!";
        setTimeout(() => {mensjFormUs.innerHTML = "";}, 3000);
    }else if(rol==='' || rol==='Seleccione'){
        mensjFormUs.innerHTML = "¡Ingrese el rol del usuario!";
        setTimeout(() => {mensjFormUs.innerHTML = "";}, 3000);
    }else if(nombre===''){
        mensjFormUs.innerHTML = "¡Ingrese el nombre del usuario!";
        setTimeout(() => {mensjFormUs.innerHTML = "";}, 3000);
    }else{
        let nuevoUsuario = new listaUsuarios(usuario,rol,nombre,email,cel);
        usuarios.push(nuevoUsuario);
        localStorage.setItem("usuarios", JSON.stringify(usuarios));

        let filtradoDocentes = usuarios.filter(usuarioFil=>usuarioFil.rol==="Docente");
        localStorage.setItem("docentes", JSON.stringify(filtradoDocentes));
       
        resetInputs();
        Swal.fire({
            title: 'Bien hecho!',
            text: 'Nuevo usuario registrado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 3000,
        });
        addNewListaUsuarios();
        // inicialize();
    }
}

// Limpiar formulario
const resetInputs = () =>{
    inputUs.value ="";
    inputRolUs.value ="";
    inputNombreUs.value ="";
    inputEmailUs.value ="";
    inputCelUs.value ="";
}

// Agregar lista en DOM
const addNewListaUsuarios = () => {
    tablaUs.innerHTML = "";
    let tr;

    usuarios.forEach((element,i) => {
        tr = document.createElement('tr');
        tr.setAttribute("id",i);

        tr.innerHTML = `<td>${i+1}</td>
                        <td>${element.usuario}</td>
                        <td>${element.nombre}</td>
                        <td>${element.cel}</td>
                        <td>${element.email}</td>
                        <td>${element.rol}</td>
                        <td> </td>
                        <td>
                            <a class="btn btn-danger btn-circle btn-sm" onClick="deleteClick(${i})">
                                 <i class="fas fa-trash"></i>
                            </a>
                            <a class="btn btn-warning btn-circle btn-sm" onClick="modificarClick(${i})">
                                 <i class="fas fa-pen"></i>
                            </a>
                        </td>`;     
        tablaUs.appendChild(tr);
    });
}
usuarios.length > 0 && addNewListaUsuarios(); 

// Eliminar usuario
deleteClick = (index) =>{
    let us=usuarios[index].usuario;    
    let posDoc = docentes.findIndex(x => x.usuario === us);
    let deleteddoc = docentes.splice(posDoc,1);
    let deletedUs = usuarios.splice(index, 1); 
    localStorage.setItem("usuarios",JSON.stringify(usuarios));
    localStorage.setItem("docentes",JSON.stringify(docentes));
    addNewListaUsuarios(); 
    // inicialize(); // actualiza los elementos del Dashboard
}

// Modificar usuario
modificarClick = (i) =>{
    let userModif = usuarios.slice(i,i+1);
    let userModifUsuario=userModif[0].usuario;
 
    Swal.fire({
        title: 'Modificar Usuario',
        html: `<div class="card-body col-md-12 m-auto card shadow">
            <form class="col-md-12 text-left row g-3">
                    <div class="col-md-6">
                        <label class="col-md-12 pl-0 ">Usuario</label>
                        <input type="text" class="form-control" value="${userModifUsuario}" disabled>
                        </div>
                    <div class="col-md-6">
                        <label for="inputRolUsM" class="form-label">Rol</label>
                        <select class="form-control" id="inputRolUsM" required>
                            <option selected disabled value="">Seleccione</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Docente">Docente</option>
                            <option value="Asesor">Asesor</option>
                        </select>
                    </div>
                    <div class="col-md-12">
                        <label for="inputNombreUsM" class="form-label pt-2">Nombre Completo</label>
                        <input id="inputNombreUsM" type="text" class="form-control" required>
                    </div>
                    <div class="col-md-6">
                        <label for="inputEmailUsM" class="form-label pt-2">Email</label>
                        <input id="inputEmailUsM" type="email" class="form-control">
                    </div>
                    <div class="col-md-6">
                        <label for="inputCelUsM" class="form-label pt-2">Celular</label>
                        <input id="inputCelUsM" type="cel" class="form-control">
                    </div>
                </form>
            </div>`,
            confirmButtonText: 'Modificar Usuario',
            focusConfirm: false,
            preConfirm:() => {
                const rolM = Swal.getPopup().querySelector('#inputRolUsM').value
                const nombreM = Swal.getPopup().querySelector('#inputNombreUsM').value
                const emailM = Swal.getPopup().querySelector('#inputEmailUsM').value
                const celM = Swal.getPopup().querySelector('#inputCelUsM').value
                return{rolM:rolM, nombreM:nombreM, emailM:emailM, celM:celM}
            }
    }).then((result) => {
        if(result.isConfirmed){
            const buscado = usuarios.find(usuarioBus=>usuarioBus.usuario===userModifUsuario);
            if (buscado){
                if(result.value.rolM !== "Seleccione" && result.value.rolM !== ''){buscado.rol = result.value.rolM}
                if(result.value.nombreM !== ''){buscado.nombre = result.value.nombreM}
                if(result.value.emailM !== ''){buscado.email = result.value.emailM}
                if(result.value.celM !== ''){buscado.cel = result.value.celM}
    
                localStorage.setItem("usuarios",JSON.stringify(usuarios));
                addNewListaUsuarios();
                resetInputs();
                Swal.fire({
                    title: 'Bien hecho!',
                    text: 'Usuario modificado con éxito',
                    icon: 'success',
                    showConfirmButton: false,
                    timer: 2500
                });
            }
        }
        
    })
}



