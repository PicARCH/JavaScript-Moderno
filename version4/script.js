
 
//VARIABLES
const marca=document.querySelector("#marca");
const anio=document.querySelector('#anio');
const precioMinimo=document.querySelector('#precioMinimo');
const precioMaximo=document.querySelector('#precioMaximo');
const puertas=document.querySelector('#puertas');
const transmision=document.querySelector('#transmision');
const color=document.querySelector('#color');

// contenedor para los resultados
const resultado=document.querySelector('#resultados');


const anioMaximo=new Date().getFullYear();
const anioMinimo=anioMaximo-10; 

// generar un objeto con la busqueda
const datosBusqueda={
    marca:'' ,
    año:'',
    precioMinimo:'' ,
    precioMaximo:'',
    puertas:'',
    transmision:'' ,
    color:''
}


//EVENTOS
/*
- Este código espera a que toda la página web se haya cargado completamente.
- Cuando la página esté lista, se ejecutará la función mostrarAutos().
*/
document.addEventListener('DOMContentLoaded',()=>{
    mostrarAutos(autos);//mostrar autos al cargar

    //llenar las opciones de años
    llenarSelect();

})

// event listener para los select de Buqueda (llenar el objeto)
marca.addEventListener('change',e=>{
    datosBusqueda.marca=e.target.value;
    filtrarAuto();
})
anio.addEventListener('change',e=>{
    datosBusqueda.año=e.target.value;
    filtrarAuto();
})
precioMinimo.addEventListener('change',e=>{
    datosBusqueda.precio_Minimo=e.target.value;
    filtrarAuto();
})
precioMaximo.addEventListener('change',e=>{
    datosBusqueda.precioMaximo=e.target.value;
    filtrarAuto();
})
puertas.addEventListener('change',e=>{
    datosBusqueda.puertas=e.target.value;
    filtrarAuto();
})
transmision.addEventListener('change',e=>{
    datosBusqueda.transmision=e.target.value;
    filtrarAuto();
})
color.addEventListener('change',e=>{
    datosBusqueda.color=e.target.value;
    filtrarAuto();
//    console.log(datosBusqueda)
})


//FUNCIONES
function mostrarAutos(autos){
    limpiarHTML();//elimine el HTML previo
    autos.forEach(auto=>{
        const autoHTML=document.createElement('p');
        autoHTML.textContent=`${auto.marca}  |  ${auto.modelo}  |  ${auto.año}  |  ${auto.precio}  |  ${auto.puertas}  |  ${auto.color}  |  ${auto.transmision}`

        // insertar en HTML
        resultado.appendChild(autoHTML);

    })
}
// limpiar html
function limpiarHTML(){
    while(resultado.firstChild){
        resultado.removeChild(resultado.firstChild);

    }
}

//Generar los años del select
function llenarSelect(){
    for(let i=anioMaximo ;i>anioMinimo;i--){//rango de años reduce
        const option=document.createElement('option');
        option.value=i;
        option.textContent=i;
        anio.appendChild(option);// Agregar el HTML
    }
}

// funcion que filtra en base a al busqueda
function filtrarAuto(){
    const resultado=autos.filter(filtrarMarca).filter(filtrarAnio).filter(filtrarMinimo).filter(filtrarMaximo).filter(filtrarPuerta).filter(filtrarTransmision).filter(filtrarColor);
    //console.log(resultado)
    if(resultado.length>=1){
        mostrarAutos(resultado)
    }else{
        MensajeSinResultado();
    }
}
function MensajeSinResultado(){
    limpiarHTML();
    const noResultado=document.createElement('div');
    noResultado.textContent='No hay Resultados, intente nuevamente';
    resultado.appendChild(noResultado)
}

function filtrarMarca(auto){
    if(datosBusqueda.marca){
        return auto.marca===datosBusqueda.marca;
    }
    return auto;
}
function filtrarAnio(auto){
    if(datosBusqueda.año){
        return auto.año===parseInt(datosBusqueda.año);
    }
    return auto;
}
function filtrarMinimo(auto){
    if(datosBusqueda.precioMinimo){
        return auto.precio >= datosBusqueda.precioMinimo;
    }
    return auto;
}
function filtrarMaximo(auto){
    if(datosBusqueda.precioMaximo){
        return auto.precio <= datosBusqueda.precioMaximo;
    }
    return auto;
}
function filtrarPuerta(auto){
    if(datosBusqueda.puertas){
        return auto.puertas === parseInt(datosBusqueda.puertas);
    }
    return auto;
}
function filtrarTransmision(auto){
    if(datosBusqueda.transmision){
        return auto.transmision === datosBusqueda.transmision;
    }
    return auto;
}
function filtrarColor(auto){
    if(datosBusqueda.color){
        return auto.color === datosBusqueda.color;
    }
    return auto;
}