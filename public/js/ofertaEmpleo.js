const inputs = document.querySelectorAll('input');
const cancel = document.getElementById("cancel")

inputs.forEach(
    (input) => {
        input.addEventListener('blur', validar);
        input.addEventListener('keyup', validar);
    }
)
cancel.addEventListener('click', cancelar);

function validar(e){
    valor = e.target.value;
    notificacion = document.querySelector(".notification");
    if(valor==null||valor.length==0){
        notificacion.innerHTML ="El campo no puede estar vacío";
        document.querySelector(".notification").style.backgroundColor = "#c93e3ed9";
        e.target.style.borderColor = "#c93e3ed9";
        e.target.style.outline = "none";
        notificacion.style.display = "flex";
        setTimeout(() => {
            document.querySelector(".notification").style.display = "none";
		}, 3000);
    }else{
        document.querySelector(".notification").style.display = "none";
            e.target.style.borderColor = "#1ed12ddc";
    }
}

function showNotification() {
    document.getElementById("name-error").innerHTML = "";
    document.querySelector('.form-container').reset();
    document.querySelector(".notification").innerHTML ="El formulario fue enviado sin errores";
    document.querySelector(".notification").style.display = "flex";
    setTimeout(function() {
        document.querySelector(".notification").style.display = "none";
    }, 3000);
}

function cancelar(){
    window.location = '/empresa'
}