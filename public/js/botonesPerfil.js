const edit = document.getElementById("editar")
const adds = document.querySelectorAll("#add")
const quits = document.querySelectorAll("#quit")
const save = document.getElementById("save")
const cancel = document.getElementById("cancel")


if(edit != null){
    edit.addEventListener('click', editar)
}

if(adds != null){
    adds.forEach((add)=>{
        add.addEventListener('click', añadir)
    })
}
if(quits != null){
    quits.forEach((quit)=>{
        quit.addEventListener('click', quitar)
    })
}
if(save != null){
    save.addEventListener('click', guardar)
}
if(cancel != null){
    cancel.addEventListener('click', cancelar)
}

function editar(){
    window.location = '/edit'
}
function añadir(e){
    let input = document.createElement("input");
    input.setAttribute('type', 'text');
    e.target.parentNode.insertBefore(input, e.target);
}
function quitar(e){
    let padre = e.target.parentNode
    let eliminar = padre.children[Array.prototype.indexOf.call(padre.children, e.target)-2]
    if(eliminar.nodeName=="INPUT"){
        padre.removeChild(eliminar);
  }
}

function guardar(){
    window.location = '/perfil'
}
function cancelar(){
    window.location.href = '/perfil'
}