let buttons = document.querySelectorAll('#eliminar')
let add = document.getElementById('add')

buttons.forEach((button) =>{
    button.addEventListener('click', quitar)
})
add.addEventListener('click', añadir)

function quitar(e){
    let padre = e.target.parentNode
    let eliminar = padre.parentNode.children[Array.prototype.indexOf.call(padre.parentNode.children, padre)]
    let val = prompt("Seguro desea eliminar? ", "Si")
    if(eliminar.nodeName=="DIV" && val.toLowerCase()=="si"){
        padre.parentNode.removeChild(eliminar);
  }
}

function añadir(){
    window.location = '/oferta'
}



