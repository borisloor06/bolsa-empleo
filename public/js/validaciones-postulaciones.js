
let contenido = document.querySelector(".post-contenido");
let contenido_blank = document.querySelector(".post-contenido-blank");

//mensaje de aceptaciopn o de rechazo
let btn_aceptar = document.getElementById("btn_aceptar");
let btn_rechazar = document.getElementById("btn_rechazar")
let btn_info = document.getElementById("btn_info");

document.getElementById("icon-menu").addEventListener("click", mostrar_menu);
btn_aceptar.addEventListener('click', msjAceptar)
btn_rechazar.addEventListener('click', msjRechazar)
btn_info.addEventListener('click', mostrar)

function mostrar_menu(){
    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}
// mostar contenido del postulado

function mostrar(e){
    contenido.style.display = "none";
   // contenido_blank.style.display = "flex";
    contenido.style.opacity = "0";
    contenido_blank.style.opacity = "1";
    if(e != undefined){
        contenido.style.display = "block";
   // contenido_blank.style.display = "flex";
    contenido.style.opacity = "1";
    contenido_blank.style.opacity = "0";
    }
}


function msjAceptar(){
    alert("Aceptaste la solicitud")
    mostrar();
}
function msjRechazar(){
    alert("Rechazaste la solicitud")
    mostrar()
}
