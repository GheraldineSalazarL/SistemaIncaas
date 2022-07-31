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

let inputHorGrupM=document.getElementById('inputHorGrupM');
let inputDocGrupM=document.getElementById('inputDocGrupM');

let codGrupM = document.getElementById("codGrupM");
let btnModifGrup = document.getElementById("btnModifGrup");

// Agregar docentes al DOM 
let docentes = JSON.parse(localStorage.getItem("docentes")) || [];

inputDocGrup.innerHTML = "";
inputDocGrupM.innerHTML = "";
let option;
  
docentes.forEach((element,i) => {
    option = document.createElement('option');
    option.setAttribute("value",`${element.nombre}`);
    
    option.innerHTML = `${element.nombre}`;
    inputDocGrup.appendChild(option);
    inputDocGrupM.appendChild(option);
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
    inputHorGrupM.value ="";
    inputDocGrupM.value ="";
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
                                        <a class="btn btn-warning btn-circle btn-sm mr-1" onClick="modificarClickGrup(${i})" href="#formularioModifGrup">
                                            <i class="fas fa-pen"></i>
                                        </a>
                                        <a class="btn btn-danger btn-circle btn-sm mr-1"  onClick="deleteClickGrup(${i})">
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
formularioModifGrup.className = 'oculto';
let section = true;
modificarClickGrup = (i) =>{
    const manageSection = ()=>{
        section = !section;
        switch (section) {
            case true:
                formularioModifGrup.className = 'oculto';
                break;
            case false:
                formularioModifGrup.className = 'visible';
                break;
        }
    }
    manageSection();

    codGrupM.innerHTML ="";
    codGrupoModif = grupos.slice(i,i+1);
    codGrupoModifCodigo=codGrupoModif[0].codGrupo;
    codGrupM.setAttribute("value",`${codGrupoModifCodigo}`);

    btnModifGrup.onclick = (e) =>{
        e.preventDefault();
    
        let horGrupM = inputHorGrupM.value;
        let docGrupM = inputDocGrupM.value;
    
        const buscadoGrup = grupos.find(grupoBus=>grupoBus.codGrupo===codGrupoModifCodigo);
        if (buscadoGrup){
            if(horGrupM !== ''){buscadoGrup.horGrupo = horGrupM;}
            if(docGrupM !== ''){buscadoGrup.docGrupo = docGrupM;}
    
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
}
