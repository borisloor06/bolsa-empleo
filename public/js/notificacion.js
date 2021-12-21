const noti = document.querySelector('.notificacion')


noti.addEventListener('click', mostrarNoti)
noti.addEventListener('blur', mostrarNoti)



function mostrarNoti(e){
    const mostrar = document.querySelector('.notification-container')

    if(mostrar.style.display == 'none'){
        mostrar.style.display = 'block';
    }else{
        mostrar.style.display = 'none';
    }
}

