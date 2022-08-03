/**
 * @ProyectoSisteamaIncaas: Este script obtiene las funcionalidades de adminEstudiante.
 * 
 * @version: v1.0.0
 * @author: Gheraldine Salazar
 *
 * History:
 *  - v1.0.0 – Primera entrega
 */


//  Elementos 
let solapaGrupo = document.getElementById("solapaGrupo");
let btnFormNuevoEst = document.getElementById("btnFormNuevoEst");

let formularioEstudiante = document.getElementById("formularioEstudiante");
let btnCrearEst = document.getElementById("btnCrearEst");
let inputCodEst = document.getElementById("inputCodEst");
let inputNombreEst = document.getElementById("inputNombreEst");
let inputIdEst = document.getElementById("inputIdEst");
let inputFinEst = document.getElementById("inputFinEst");
let inputCelEst = document.getElementById("inputCelEst");

let inputNombreEstM = document.getElementById("inputNombreEstM");
let inputIdEstM = document.getElementById("inputIdEstM");
let inputFinEstM = document.getElementById("inputFinEstM");
let inputCelEstM = document.getElementById("inputCelEstM");

let show_data = document.getElementById('show_data');

let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

// Traer grupos y mostrar en solapas
const addNewSolapaGrupo = () => {
    solapaGrupo.innerHTML = "";
    let solapa;

    grupos.forEach((element,i) => {
        solapa = document.createElement('solapa');
        solapa.innerHTML = `<li class="nav-item font-weight-bold">
                                 <a class="nav-link" href="#" id="show_data" onClick="mostrarClickGrup(${i})">${element.codGrupo} </a>
                             </li>`;
        solapaGrupo.appendChild(solapa);
    });
}
grupos.length > 0 && addNewSolapaGrupo(); 

// Mostrar info grupos
mostrarClickGrup = (i) =>{
    grupoSelectCod=grupos[i].codGrupo;
    
    infoGrupos.innerHTML = "";
    let info;
    info = document.createElement('info');
    info.innerHTML = `
                    <div class="d-flex justify-content-end flex-wrap my-2">
                        <button type="submit" id="btnFormNuevoEst" class="btn btn-success btn-icon-split m-1"onClick="manageSection()">
                            <span class="icon text-white-50">
                                <i class="fas fa-check"></i>
                            </span>
                            <span class="text">Crear Nuevo Estudiante</span>
                        </button>
                    </div>
                    `;
    infoGrupos.appendChild(info);

    infoGrupos2.innerHTML = "";
    let info2;
    info2 = document.createElement('info2');
    info2.innerHTML = `
                    <div class="col-xl-12 col-lg-12">
                        <div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Lista de Estudiantes ${grupoSelectCod}</h6>
                            </div>
                            <div class="card-body">
                                <table class="table">
                                    <thead>
                                    <tr>
                                        <th class="table-secondary" scope="col">Código</th>
                                        <th class="table-secondary" scope="col">Nombre</th>
                                        <th class="table-secondary" scope="col">Identificación</th>
                                        <th class="table-secondary" scope="col">Fecha Ingreso</th>
                                        <th class="table-secondary" scope="col">Celular</th>
                                        <th class="table-secondary" scope="col">Estado</th>
                                        <th class="table-secondary" scope="col">Acción</th>
                                    </tr>
                                    </thead>
                                    <tbody id="tablaEst">

                                    </tbody>
                                </table>
                            </div>
                        </div>
                    </div>
                    `;
    infoGrupos2.appendChild(info2);


    // Crear estudiantes y agregarlo al storage 
    btnCrearEst.onclick = (e) =>{
        e.preventDefault(); 
        let codEst=inputCodEst.value;
        const buscadoE = estudiantes.find(estudiantesBus=>estudiantesBus.codEst===codEst);
        if (buscadoE){
            // resetInputsgrup();
            Swal.fire({
                title: 'Alerta!',
                text: 'El Estudiante ya existe',
                icon: 'warning',
                showConfirmButton: false,
                timer: 2500
            });
        } else{
            addEst();
        }
    }
    class listaEstudiantes{
        constructor(codEst,nombreEst, idEst, finEst, celEst, estadoEst, grupoEst){
            this.codEst=codEst;
            this.nombreEst=nombreEst;
            this.idEst=idEst;
            this.finEst=finEst;
            this.celEst=celEst;
            this.estadoEst="Activo";
            this.grupoEst=grupoSelectCod;
        }
    }
    const addEst = () =>{
        let codEst=inputCodEst.value;
        let nombreEst=inputNombreEst.value;
        let idEst=inputIdEst.value;
        let finEst=inputFinEst.value;
        let celEst=inputCelEst.value;
    
        let nuevaListEEst= new listaEstudiantes(codEst,nombreEst, idEst, finEst, celEst);
        estudiantes.push(nuevaListEEst);
        localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
        resetInputsEst();
        Swal.fire({
            title: 'Bien hecho!',
            text: 'Nuevo Estudiante registrado con éxito',
            icon: 'success',
            showConfirmButton: false,
            timer: 2000
        });
        addNewListaEst;
    }

    // Agregar lista en DOM 
    const addNewListaEst = () => {
        tablaEst.innerHTML = "";
        let tr;

        let filtradoEstudiantes = estudiantes.filter(estudianteFil=>estudianteFil.grupoEst===grupoSelectCod);
        
        filtradoEstudiantes.forEach((element,i) => {
            tr = document.createElement('tr');

            tr.innerHTML = `<td>${element.codEst}</td>
                            <td>${element.nombreEst}</td>
                            <td>${element.idEst}</td>
                            <td>${element.finEst}</td>
                            <td>${element.celEst}</td>
                            <td>${element.estadoEst}</td>
                            <td>
                                <a class="btn btn-danger btn-circle btn-sm" onClick="deleteClick(${i})">
                                        <i class="fas fa-trash"></i>
                                </a>
                                <a class="btn btn-warning btn-circle btn-sm" onClick="modificarClick(${i})">
                                        <i class="fas fa-pen"></i>
                                </a>
                            </td>`;     
            tablaEst.appendChild(tr);
        });
    }
    estudiantes.length > 0 && addNewListaEst();

    // Eliminar estudiante
    deleteClick = (index) =>{
        let es=estudiantes[i].codEst;    
        let posEst = estudiantes.findIndex(x => x.codEst === es);
        let deletedEst = estudiantes.splice(posEst,1);
        localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
        addNewListaEst(); 
        // inicialize(); // actualiza los elementos del Dashboard
    }

    // Modificar usuario
    modificarClick = (i) =>{
        let estModifUsuario = estudiantes[i].codEst;
        let estModifComp = estudiantes[i].codEst+" - "+estudiantes[i].nombreEst;
        console.log(estModifComp);
        Swal.fire({
            title: 'Modificar Estudiante',
            html: `<div class="card-body col-md-12 m-auto card shadow">
                <form class="col-md-12 text-left row g-3">
                        <div class="col-md-12>
                            <label class="col-md-12 pl-0 ">Usuario</label>
                            <input type="text" class="form-control" value="${estModifComp}" disabled>
                            </div>
                        <div class="col-md-12">
                            <label for="inputNombreEstM" class="form-label pt-2">Nombre Completo</label>
                            <input id="inputNombreEstM" type="text" class="form-control" required>
                        </div>
                        <div class="col-md-6">
                            <label for="inputIdEstsM" class="form-label pt-2">Identificación</label>
                            <input id="inputIdEstsM" type="text" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label for="inputFinEstM" class="form-label pt-2">Fecha de Ingreso</label>
                            <input id="inputFinEstM" type="date" class="form-control">
                        </div>
                        <div class="col-md-6">
                            <label for="inputCelEstM" class="form-label pt-2">Celular</label>
                            <input id="inputCelEstM" type="cel" class="form-control">
                        </div>
                    </form>
                </div>`,
                confirmButtonText: 'Editar Estudiante',
                focusConfirm: false,
                preConfirm:() => {
                    const nombreEstM = Swal.getPopup().querySelector('#inputNombreEstM').value
                    const idEstsM = Swal.getPopup().querySelector('#inputIdEstsM').value
                    const finEstM = Swal.getPopup().querySelector('#inputFinEstM').value
                    const celEstM = Swal.getPopup().querySelector('#inputCelEstM').value
                    return{nombreEstM:nombreEstM, idEstsM:idEstsM, finEstM:finEstM, celEstM:celEstM}
                }
        }).then((result) => {
            if(result.isConfirmed){
                const buscado = estudiantes.find(estBus=>estBus.codEst===estModifUsuario);
                if (buscado){
                    if(result.value.nombreEstM !== ''){buscado.nombreEst = result.value.nombreEstM}
                    if(result.value.idEstsM !== ''){buscado.idEsts = result.value.idEstsM}
                    if(result.value.finEstM !== ''){buscado.finEst = result.value.finEstM}
                    if(result.value.celEstM !== ''){buscado.celEst = result.value.celEstM}
        
                    localStorage.setItem("estudiantes",JSON.stringify(estudiantes));
                    addNewListaEst();
                    resetInputsEst();
                    Swal.fire({
                        title: 'Bien hecho!',
                        text: 'Estudiante modificado con éxito',
                        icon: 'success',
                        showConfirmButton: false,
                        timer: 2500
                    });
                }
            }
            
        })
    }
    cargarEstudiantes();
}

//  Boton Desplegar formulario de nuevo Estudiantes
let section = true;
formularioEstudiante.className = 'oculto';
const manageSection = ()=>{
    section = !section;
    switch (section) {
        case true:
            formularioEstudiante.className = 'oculto';
            break;
        case false:
            formularioEstudiante.className = 'visible';
            break;
    }
}

// Limpiar formulario
const resetInputsEst = () =>{
    inputCodEst.value ="";
    inputNombreEst.value ="";
    inputIdEst.value ="";
    inputFinEst.value ="";
    inputCelEst.value ="";
}

// Fetch 
function cargarEstudiantes(){
    let listado = document.getElementById('tablaEst');
    fetch('data/data.json')
    .then((res) => res.json())
    .then(data => {
        data.forEach((data)=>{
            let tr = document.createElement('tr');        
            tr.innerHTML = `<td>${data.codEst}</td>
                            <td>${data.nombreEst}</td>
                            <td>${data.idEst}</td>
                            <td>${data.finEst}</td>
                            <td>${data.celEst}</td>
                            <td>${data.estadoEst}</td>
                            <td></td>
                            <td></td>`;     
            listado.appendChild(tr);
        });
    });
}



// const getData = () => {
//     let loader = document.getElementById('loader');
//     loader.className = 'loader-show';
//     return new Promise((resolve, reject) => {
//         setTimeout(() => {
//             loader.className = 'loader-hide';
//             resolve(data)
//         }, 5000)
//     })     
// }
// getData().then(response => {
//     response.forEach(element => {
//         let listado = document.getElementById('tablaEst');
//         fetch('data/data.json')
//         .then((res) => res.json())
//         .then(data => {
//             data.forEach((data)=>{
//                 let tr = document.createElement('tr');        
//                 tr.innerHTML = `<td>${data.codEst}</td>
//                                 <td>${data.nombreEst}</td>
//                                 <td>${data.idEst}</td>
//                                 <td>${data.finEst}</td>
//                                 <td>${data.celEst}</td>
//                                 <td>${data.estadoEst}</td>
//                                 <td></td>
//                                 <td></td>`;     
//                 listado.appendChild(tr);
//             });
//         }).catch(error => {
//             reject(error);
//         })

//     });
   
// })
