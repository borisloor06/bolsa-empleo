document.getElementById("icon-search").addEventListener("click", mostrar_buscador);
document.getElementById("busqueda").addEventListener("click", ocultar_buscador);
const salir = document.querySelector('.fa-sign-out-alt')

bars_search =       document.getElementById("barra-busqueda");
cover_ctn_search =  document.getElementById("busqueda");
inputSearch =       document.getElementById("inputSearch");
box_search =        document.getElementById("box-search");

function mostrar_buscador(){

    bars_search.style.top = "80px";
    cover_ctn_search.style.display = "block";
    inputSearch.focus();

}

function ocultar_buscador(){

    bars_search.style.top = "-10px";
    cover_ctn_search.style.display = "none";
    inputSearch.value = "";

}
document.getElementById("icon-menu").addEventListener("click", mostrar_menu);
salir.addEventListener('click', logout)

function mostrar_menu(){

    document.getElementById("move-content").classList.toggle('move-container-all');
    document.getElementById("show-menu").classList.toggle('show-lateral');
}
function logout(){
    window.location = '/login'
}