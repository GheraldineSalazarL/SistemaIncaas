/**
 * @ProyectoSisteamaIncaas: Este script obtiene las funcionalidades de adminGrupo.
 * 
 * @version: v1.0.0
 * @author: Gheraldine Salazar
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */


//  Elementos 
let btnCrearGrup = document.getElementById("btnCrearGrup");
let inputCodGrup=document.getElementById('inputCodGrup');
let inputHorGrup=document.getElementById('inputHorGrup');
let inputDocGrup=document.getElementById('inputDocGrup');
let mensjFormGrup = document.getElementById("mensjFormGrup");

// Agregar docentes al DOM 
let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

inputDocGrup.innerHTML = "";
let option;
  
docentes.forEach((element,i) => {
    option = document.createElement('option');
    option.setAttribute("value",`${element.nombre}`);
    
    option.innerHTML = `${element.nombre}`;
    inputDocGrup.appendChild(option);
});

//  Nuevo gupo
let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

btnCrearGrup.onclick = (e) =>{
    e.preventDefault(); 
    let codGrupo=inputCodGrup.value.toUpperCase();
    const buscadog = grupos.find(grupoBus=>grupoBus.codGrupo===codGrupo);
    if (buscadog){
        resetInputsgrup();
        Swal.fire({
            title: 'Alerta!',
            text: 'El grupo ya existe',
            icon: 'warning',
            showConfirmButton: false,
            timer: 2500
        });
    } else{
        addGrup();
    } 
}
class listaGrupos{
    constructor(codGrupo,horGrupo, docGrupo){
        this.codGrupo=codGrupo;
        this.horGrupo=horGrupo;
        this.docGrupo=docGrupo;
    }
}
const addGrup = () =>{
    let codGrupo=inputCodGrup.value.toUpperCase();
    let horGrupo=inputHorGrup.value;
    let docGrupo=inputDocGrup.value;

    if(codGrupo===''){
        mensjFormGrup.innerHTML = "¡Ingrese el código del grupo!";
        setTimeout(() => {mensjFormGrup.innerHTML = "";}, 2000);
    }else if(horGrupo===''){
        mensjFormGrup.innerHTML = "¡Ingrese el horario del grupo!";
        setTimeout(() => {mensjFormGrup.innerHTML = "";}, 2000);
    }else if(docGrupo==='' || docGrupo==='Seleccione'){
        mensjFormGrup.innerHTML = "¡Ingrese el docente asignado para el grupo!";
        setTimeout(() => {mensjFormGrup.innerHTML = "";}, 2000);
    }else{
        let nuevoGrupo = new listaGrupos(codGrupo,horGrupo, docGrupo);
        grupos.push(nuevoGrupo);
        localStorage.setItem("grupos", JSON.stringify(grupos));
        resetInputsgrup();
        Swal.fire({
            title: 'Bien hecho!',
            text: 'Nuevo grupo registrado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
        addNewGrupo();
        // inicialize();
    }
}

// Limpiar formulario
const resetInputsgrup = () =>{
    inputCodGrup.value ="";
    inputHorGrup.value ="";
    inputDocGrup.value ="";
}

// Mostrar grupos creados
const addNewGrupo = () => {
    cardGrupos.innerHTML = "";
    let card;

    grupos.forEach((element,i) => {
        card = document.createElement('card');
        card.setAttribute("id",i);

        card.innerHTML = `<div class="p-2 mb-4" >
                            <div class="card border-left-info shadow h-100 py-2">
                                <div class="card-body pt-2 pb-2 pr-4 pl-4">
                                    <div class="row no-gutters align-items-center pb-2">
                                        <div class="col mr-2">
                                            <div class="h8 font-weight-bold text-info text-uppercase mb-1" id="nombreGrupo">${element.codGrupo} </div>
                                            <div class="text-xs mb-0 font-weight-bold text-gray-800" id="numEstud">${element.horGrupo}</div>
                                            <div class="text-xs mb-0 font-weight-bold text-gray-800" id="numEstud">${element.docGrupo}</div>
                                            
                                        </div>
                                        <div class="col-auto">
                                            <i class="fa-solid fa-address-book fa-2x text-gray-300"></i>
                                        </div>
                                    </div>
                                    <div class="row justify-content-end">
                                        <a class="btn btn-warning btn-circle btn-sm mr-1" onClick="modificarClickGrup(${i})">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                        <a class="btn btn-danger btn-circle btn-sm mr-1" onClick="deleteClickGrup(${i})">
                                        <i class="fas fa-trash"></i>
                                        </a>
                                    </div>
                                </div>
                            </div>
                        </div>`;
                        
        cardGrupos.appendChild(card);
    });
}
grupos.length > 0 && addNewGrupo(); 

// Eliminar grupo 
deleteClickGrup = (index) =>{
    let deletedGrup = grupos.splice(index, 1); 
    localStorage.setItem("grupos",JSON.stringify(grupos));
    addNewGrupo(); 
}

// Modificar grupo 
modificarClickGrup = (i) =>{
    codGrupoModif = grupos.slice(i,i+1);
    console.log(codGrupoModif);
    codGrupoModifCodigo=codGrupoModif[0].codGrupo;
    console.log(codGrupoModifCodigo);
 
    Swal.fire({
        title: 'Modificar Grupo',
        html: `<div class="card-body col-md-12 m-auto card shadow">
            <form class="col-md-12 text-left row g-3">
                    <div class="col-md-4">
                        <label class="col-md-12 pl-0 ">Código</label>
                        <input type="text" class="form-control" value="${codGrupoModifCodigo}" disabled>
                    </div>
                    <div class="col-md-4">
                        <label for="inputHorGrupM" class="form-label">Horario</label>
                        <input id="inputHorGrupM" type="text" class="form-control" required>
                    </div>
                    <div class="col-md-4">
                        <label for="inputDocGrupM" class="form-label">Docente</label>
                        <select class="form-control" id="inputDocGrupM" required>
                            <option selected disabled value="">Seleccione</option>
                            <option value="Administrador">Administrador</option>
                            <option value="Docente">Docente</option>
                            <option value="Asesor">Asesor</option>
                        </select>
                    </div>
                </form>
            </div>`,
            confirmButtonText: 'Modificar Grupo',
            focusConfirm: false,
            preConfirm:() => {
                const horGrupM = Swal.getPopup().querySelector('#inputHorGrupM').value
                const docGrupM = Swal.getPopup().querySelector('#inputDocGrupM').value
                return{horGrupM:horGrupM, docGrupM:docGrupM}
            }
        }).then((result) => {
            if(result.isConfirmed){
                const buscado = grupos.find(grupoBus=>grupoBus.codGrupo===codGrupoModifCodigo);
                if (buscado){
                    if(result.value.horGrupM !== ''){buscado.horGrupo = result.value.horGrupM;}
                    if(result.value.docGrupM !== ''){buscado.docGrupo = result.value.docGrupM;}
        
                    localStorage.setItem("grupos",JSON.stringify(grupos));
                    addNewGrupo();
                    resetInputsgrup();
                    Swal.fire({
                        title: 'Bien hecho!',
                        text: 'Grupo modificado con éxito',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            }
            
        })
}

