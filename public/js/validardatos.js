let inputs = document.querySelectorAll("input")

inputs.forEach((input)=>{
    input.addEventListener('blur', validar);
    input.addEventListener('keyup', validar);
})


document.addEventListener("click", revisar)

function revisar(){
    let inputs = document.querySelectorAll("input")

    inputs.forEach((input)=>{
        input.addEventListener('blur', validar);
        input.addEventListener('keyup', validar);
    })
}

function validar(e){
    inputs = document.querySelectorAll("input")
    
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
        return false;
    }else{
        document.querySelector(".notification").style.display = "none";
            e.target.style.borderColor = "white";
            return true;
    }
}