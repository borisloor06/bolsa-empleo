const formulario = document.getElementById('formulario');
const inputs = document.querySelectorAll('#formulario input');
const cancel = document.getElementById("cancel")

const expresiones = {
	//usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, // Letras, numeros, guion y guion_bajo
	nombre: /^([a-zA-Z]{4,})\s([a-zA-Z]+)*$/, // Letras y espacios, pueden llevar acentos.
	password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // Tener al menos 8 carácteres, una mayúscula y un número
	correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
	telefono: /^(09)\d{8}$/, // 09 hasta completar 10 digitos.
	cedula: /^\d{10}$/,
	ruc: /^\d{10}(001)$/,
	letras: /^[A-Za-z]{4,100}/
}

const campos = {
	//usuario: false,
	nombre: false,
	apellido: false,
	password: false,
	correo: false,
	telefono: false,
	cedula: false,
	ruc: false,
	empresa: false,
	actividad: false,
	sede: false,
	type: false,
	pais: false,
	provincia: false,
	ciudad: false,
	direccion: false
}

const validarFormulario = (e) => {
	switch (e.target.name) {
		/*case "usuario":
			validarCampo(expresiones.usuario, e.target, 'usuario');
		break;*/
		case "nombre":
			validarCampo(expresiones.nombre, e.target, 'nombre');
			break;
		case "apellido":
			validarCampo(expresiones.nombre, e.target, 'apellido');
			break;
		case "password":
			validarCampo(expresiones.password, e.target, 'password');
			validarPassword2();
			break;
		case "password2":
			validarPassword2();
			break;
		case "correo":
			validarCampo(expresiones.correo, e.target, 'correo');
			break;
		case "telefono":
			validarCampo(expresiones.telefono, e.target, 'telefono');
			break;
		case "telefono1":
			validarCampo(expresiones.telefono, e.target, 'telefono1');
			break;
		case "cedula":
			validarCampo(expresiones.cedula, e.target, 'cedula');
			break;
		case "ruc":
			validarCampo(expresiones.ruc, e.target, 'ruc');
			break;
		case "empresa":
			validarCampo(expresiones.letras, e.target, 'empresa');
			break;
		case "actividad":
			validarCampo(expresiones.letras, e.target, 'actividad');
			break;
		case "sede":
			validarCampo(expresiones.letras, e.target, 'sede');
			break;
		case "pais":
			validarCampo(expresiones.letras, e.target, 'pais');
			break;
		case "provincia":
			validarCampo(expresiones.letras, e.target, 'provincia');
			break;
		case "ciudad":
			validarCampo(expresiones.letras, e.target, 'ciudad');
			break;
		case "direccion":
			validarCampo(expresiones.letras, e.target, 'direccion');
			break;
	}
}

const validarCampo = (expresion, input, campo) => {
	if (expresion.test(input.value)) {
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos[campo] = true;
	} else {
		document.getElementById(`grupo__${campo}`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__${campo}`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__${campo} i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__${campo} i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__${campo} .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos[campo] = false;
	}
}

const validarPassword2 = () => {
	const inputPassword1 = document.getElementById('password');
	const inputPassword2 = document.getElementById('password2');
	if (inputPassword1.value === '') {
		return false;
	}
	if (inputPassword1.value !== inputPassword2.value) {
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.add('formulario__input-error-activo');
		campos['password'] = false;
	} else {
		document.getElementById(`grupo__password2`).classList.remove('formulario__grupo-incorrecto');
		document.getElementById(`grupo__password2`).classList.add('formulario__grupo-correcto');
		document.querySelector(`#grupo__password2 i`).classList.remove('fa-times-circle');
		document.querySelector(`#grupo__password2 i`).classList.add('fa-check-circle');
		document.querySelector(`#grupo__password2 .formulario__input-error`).classList.remove('formulario__input-error-activo');
		campos['password'] = true;
	}
}

inputs.forEach((input) => {
	input.addEventListener('keyup', validarFormulario);
	input.addEventListener('blur', validarFormulario);
});
cancel.addEventListener('click', cancelar);

formulario.addEventListener('submit', (e) => {
	// e.preventDefault();

	const terminos = document.getElementById('terminos');
	if (campos.nombre && campos.password && campos.correo && campos.telefono && campos.apellido && campos.cedula && campos.ruc && campos.empresa && terminos.checked) {
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 2000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
		// empresa();
	} else if (campos.nombre && campos.password && campos.correo && campos.telefono && terminos.checked) {
		document.getElementById('formulario__mensaje-exito').classList.add('formulario__mensaje-exito-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje-exito').classList.remove('formulario__mensaje-exito-activo');
		}, 2000);

		document.querySelectorAll('.formulario__grupo-correcto').forEach((icono) => {
			icono.classList.remove('formulario__grupo-correcto');
		});
		// estudiante();
	} else {
		document.getElementById('formulario__mensaje').classList.add('formulario__mensaje-activo');
		setTimeout(() => {
			document.getElementById('formulario__mensaje').classList.remove('formulario__mensaje-activo');
		}, 2000);
	}

});

// function estudiante() {
// 	window.location.href = '/'
// }

// function empresa() {
// 	window.location.href = '/homeEmpresa'
// }

function cancelar() {
	window.location = '/login'
}