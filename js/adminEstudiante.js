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

let estudiantes = JSON.parse(localStorage.getItem("estudiantes")) || [];
let grupos = JSON.parse(localStorage.getItem("grupos")) || [];

// Traer grupos y mostrar en solapas
const addNewSolapaGrupo = () => {
    solapaGrupo.innerHTML = "";
    let solapa;

    grupos.forEach((element,i) => {
        solapa = document.createElement('solapa');
        solapa.innerHTML = `<li class="nav-item font-weight-bold">
                                 <a class="nav-link" href="#" onClick="mostrarClickGrup(${i})">${element.codGrupo} </a>
                             </li>`;
        solapaGrupo.appendChild(solapa);
    });
}
grupos.length > 0 && addNewSolapaGrupo(); 

// Mostrar info grupos
mostrarClickGrup = (i) =>{
    infoGrupos.innerHTML = "";
    let info;
    info = document.createElement('solapa');
    info.innerHTML = `
                    <div class="col-xl-12 col-lg-12">
                        <div class="card shadow mb-4">
                            <div
                                class="card-header py-3 d-flex flex-row align-items-center justify-content-between">
                                <h6 class="m-0 font-weight-bold text-primary">Lista de Estudiantes</h6>
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
                    <div class="d-flex justify-content-end flex-wrap">
                        <button type="submit" id="btnFormNuevoEst" class="btn btn-success btn-icon-split m-1"onClick="manageSection()">
                            <span class="icon text-white-50">
                                <i class="fas fa-check"></i>
                            </span>
                            <span class="text">Crear Nuevo Estudiante</span>
                        </button>
                    </div>`;
    infoGrupos.appendChild(info);

    grupoSelect = grupos.slice(i,i+1);
    grupoSelectCod=grupoSelect[0].codGrupo;
    console.log(grupoSelectCod);

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
    estudiantes.length > 0 && mostrarClickGrup(grupoSelectCod);
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


// setTimeout(() => {
// Crear estudiantes y agregarlo a storage 
//     class listaEstudiantes{
//         constructor(codEst,nombreEst, idEst, finEst, celEst, estadoEst, grupoEst){
//             this.codEst=codEst;
//             this.nombreEst=nombreEst;
//             this.idEst=idEst;
//             this.finEst=finEst;
//             this.celEst=celEst;
//             this.estadoEst="Activo";
//             this.grupoEst=grupoSelectCod;
//         }
//     }
//     const addEst = () =>{
//         let codEst=inputCodEst.value;
//         let nombreEst=inputNombreEst.value;
//         let idEst=inputIdEst.value;
//         let finEst=inputFinEst.value;
//         let celEst=inputCelEst.value;
    
//         let nuevaListEEst= new listaEstudiantes(codEst,nombreEst, idEst, finEst, celEst);
//         estudiantes.push(nuevaListEEst);
//         localStorage.setItem("estudiantes", JSON.stringify(estudiantes));
//         addNewListaEst;
//         Swal.fire({
//             title: 'Bien hecho!',
//             text: 'Nuevo Estudiante registrado con éxito',
//             icon: 'success',
//             showConfirmButton: false,
//             timer: 2000
//         });
//     }

//     // Formulario nuevo estudiante     
//     const formularioNewEst = () =>{
//         Swal.fire({
//             title: 'Nuevo Estudiante',
//             html: `<div class="card-body col-md-12 m-auto card shadow">
//                         <form class="col-md-12 text-left row g-3">
//                             <div class="col-md-12">
//                                 <label for="inputCodEst" class="form-label pt-2">Código estudiantil</label>
//                                 <input id="inputCodEst" type="text" class="form-control" required>
//                             </div>  
//                             <div class="col-md-12">
//                                 <label for="inputNombreEst" class="form-label pt-2">Nombre Completo</label>
//                                 <input id="inputNombreEst" type="text" class="form-control" required>
//                             </div> 
//                             <div class="col-md-12">
//                                 <label for="inputIdEst" class="form-label pt-2">Número de identificación</label>
//                                 <input id="inputIdEst" type="text" class="form-control" required>
//                             </div> 
//                             <div class="col-md-12">
//                                 <label for="inputFinEst" class="form-label pt-2">Fecha de ingreso</label>
//                                 <input id="inputFinEst" type="text" class="form-control" required>
//                             </div>
//                             <div class="col-md-12">
//                                 <label for="inputCelEst" class="form-label pt-2">Celular</label>
//                                 <input id="inputCelEst" type="text" class="form-control" required>
//                             </div>
//                         </form>
//                     </div>`,
//             confirmButtonText: 'Crear Estudiante',
//             focusConfirm: false,
//             preConfirm:() => {
//                 const codEst=Swal.getPopup().querySelector('#inputCodEst').value
//                 const nombreEst=Swal.getPopup().querySelector('#inputNombreEst').value
//                 const idEst=Swal.getPopup().querySelector('#inputIdEst').value
//                 const finEst=Swal.getPopup().querySelector('#inputFinEst').value
//                 const celEst=Swal.getPopup().querySelector('#inputCelEst').value
//                 return{codEst:codEst, nombreEst:nombreEst, idEst:idEst, finEst:finEst, celEst:celEst}
//             }
//         }).then((result) => {
//             if(result.isConfirmed){
//                 let codEst=inputCodEst.value;
//                 const buscadoE = estudiantes.find(estudiantesBus=>estudiantesBus.codEst===codEst);
//                 if (buscadoE){
//                     // resetInputsgrup();
//                     Swal.fire({
//                         title: 'Alerta!',
//                         text: 'El Estudiante ya existe',
//                         icon: 'warning',
//                         showConfirmButton: false,
//                         timer: 2500
//                     });
//                 } else{
//                     addEst();
//                 } 
//             }
//         });
//     }
//     btnFormNuevoEst.onclick = formularioNewEst;

//     // Agregar lista en DOM
//     const addNewListaEst = () => {
//         tablaEst.innerHTML = "";
//         let tr;

//         let filtradoEstudiantes = estudiantes.filter(estudianteFil=>estudianteFil.grupoEst===grupoSelectCod);
        
//         filtradoEstudiantes.forEach((element,i) => {
//             tr = document.createElement('tr');
    
//             tr.innerHTML = `<td>${element.codEst}</td>
//                             <td>${element.nombreEst}</td>
//                             <td>${element.idEst}</td>
//                             <td>${element.finEst}</td>
//                             <td>${element.celEst}</td>
//                             <td>${element.estadoEst}</td>
//                             <td>
//                                 <a class="btn btn-danger btn-circle btn-sm" onClick="deleteClick(${i})">
//                                      <i class="fas fa-trash"></i>
//                                 </a>
//                                 <a class="btn btn-warning btn-circle btn-sm" onClick="modificarClick(${i})">
//                                      <i class="fas fa-pen"></i>
//                                 </a>
//                             </td>`;     
//             tablaEst.appendChild(tr);

//         });
        
//         // let listado = document.getElementById('tablaEst');
//         // fetch('data/data.json')
//         // .then((res) => res.json())
//         // .then(data => {
//         //     data.forEach((data)=>{
//         //         let tr = document.createElement('tr');        
//         //         tr.innerHTML = `<td>${data.codEst}</td>
//         //                         <td>${data.nombreEst}</td>
//         //                         <td>${data.idEst}</td>
//         //                         <td>${data.finEst}</td>
//         //                         <td>${data.celEst}</td>
//         //                         <td>${data.estadoEst}</td>
//         //                         <td>
//         //                             <a class="btn btn-danger btn-circle btn-sm" onClick="deleteClick(${i})">
//         //                                 <i class="fas fa-trash"></i>
//         //                             </a>
//         //                             <a class="btn btn-warning btn-circle btn-sm" onClick="modificarClick(${i})">
//         //                                 <i class="fas fa-pen"></i>
//         //                             </a>
//         //                         </td>`;     
//         //         listado.appendChild(tr);
//         //     });
//         // });
//     }
//     estudiantes.length > 0 && addNewListaEst(); 
// // }, 3000);

