import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from '../elementos/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
// import '../css/estilosREmpresa.css';
import '../css/registros.css';


const RegistroEstudiante = () => {

	document.body.classList.add('body');

	const [nombre, cambiarNombre] = useState({campo: '', valido: null});
	const [apellido, cambiarApellido] = useState({campo: '', valido: null});
	const [password, cambiarPassword] = useState({campo: '', valido: null});
	const [password2, cambiarPassword2] = useState({campo: '', valido: null});
	const [correo, cambiarCorreo] = useState({campo: '', valido: null});
	const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);
	const [estudiante, setEstudiante] = useState({
		nombre: "",
		apellido: "",
		password: "",
		correo: "",
		telefono: ""
	  });
	  const navigate = useNavigate();
	  
	const expresiones = {
		nombre: /^([a-zA-Z]{4,})\s([a-zA-Z]+)*$/, // Letras y espacios, pueden llevar acentos.
		password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // Tener al menos 8 carácteres, una mayúscula y un número
		correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
		telefono: /^(09)\d{8}$/, // 09 hasta completar 10 digitos.
	}

	const validarPassword2 = () => {
		if(password.campo.length > 0){
			if(password.campo !== password2.campo){
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'false'}
				});
			} else {
				cambiarPassword2((prevState) => {
					return {...prevState, valido: 'true'}
				});
			}
		}
	}
	const handleChange = (e) => {
		setEstudiante((prevState) => {
			return {...prevState, nombre: nombre.campo, apellido: apellido.campo, password: password.campo, correo: correo.campo, telefono: telefono.campo}
		});
	}

	const cancel = (e) =>{
		navigate("/")
		document.body.classList.remove('body');
	}

	const onChangeTerminos = (e) => {
		cambiarTerminos(e.target.checked);
	}

	
	const onSubmit = async (e) => {
		e.preventDefault();
		if(
			//usuario.valido === 'true' &&
			nombre.valido === 'true' &&
			apellido.valido === 'true' &&
			password.valido === 'true' &&
			password2.valido === 'true' &&
			correo.valido === 'true' &&
			telefono.valido === 'true' &&
			terminos
			){
				cambiarFormularioValido(true);
				//cambiarUsuario({campo: '', valido: ''});
				cambiarNombre({campo: '', valido: null});
				cambiarApellido({campo: '', valido: null});
				cambiarPassword({campo: '', valido: null});
				cambiarPassword2({campo: '', valido: 'null'});
				cambiarCorreo({campo: '', valido: null});
				cambiarTelefono({campo: '', valido: null});

				
				const response = await fetch("http://localhost:8000/registroEstudiante", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(estudiante),
				});
				const res = await response.json();
				if(res.auth){
					localStorage.setItem("user", res.token);
					localStorage.setItem("userType", 'estudiante');
					localStorage.setItem("auth", res.auth);
					navigate("/home-estudiante")
				}
				if(res.status === 'error'){
					cambiarFormularioValido(false);
				}
		} else {
			cambiarFormularioValido(false);
		}
	}



	return (
		<main className='main'>
			<Formulario onSubmit={onSubmit}>
				<Input
					estado={nombre}
					cambiarEstado={cambiarNombre}
					tipo="text"
					label="Nombre"
					placeholder="Pedro"
					name="nombre"
					leyendaError="El nombre solo puede contener letras y espacios."
					expresionRegular={expresiones.nombre}
				/>
				<Input
					estado={apellido}
					cambiarEstado={cambiarApellido}
					tipo="text"
					label="Apellido"
					placeholder="Jimenez"
					name="apellido"
					leyendaError="El apellido solo puede contener letras y espacios."
					expresionRegular={expresiones.nombre}
				/>
				<Input
					estado={password}
					cambiarEstado={cambiarPassword}
					tipo="password"
					label="Contraseña"
					name="password"
					leyendaError="La contraseña debe tener al menos 8 carácteres, una mayúscula y un número."
					expresionRegular={expresiones.password}
				/>
				<Input
					estado={password2}
					cambiarEstado={cambiarPassword2}
					tipo="password"
					label="Repetir Contraseña"
					name="password2"
					leyendaError="Ambas contraseñas deben ser iguales."
					funcion={validarPassword2}
				/>
				<Input
					estado={correo}
					cambiarEstado={cambiarCorreo}
					tipo="email"
					label="Correo Electrónico"
					placeholder="correo@correo.com"
					name="correo"
					leyendaError="El correo solo puede contener letras, numeros, puntos, guiones y guion bajo."
					expresionRegular={expresiones.correo}
				/>
				<Input
					estado={telefono}
					cambiarEstado={cambiarTelefono}
					tipo="text"
					label="Teléfono"
					placeholder="0987654321"
					name="telefono"
					leyendaError="El telefono solo puede contener numeros y el maximo son 10 dígitos."
					expresionRegular={expresiones.telefono}
				/>



				<ContenedorTerminos>
					<Label>
						<input 
							type="checkbox"
							name="terminos"
							id="terminos"
							checked={terminos} 
							onChange={onChangeTerminos}
						/>
						Acepto los Terminos y Condiciones
					</Label>
				</ContenedorTerminos>
				{formularioValido === false && <MensajeError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Por favor rellena el formulario correctamente.
					</p>
				</MensajeError>}
				<ContenedorBotonCentrado>
					<Boton className="cancel"  onClick={cancel}>Cancelar</Boton>
					<Boton className="formulario__btn" type="submit" onClick={handleChange}>Enviar</Boton>
					{formularioValido === true && <MensajeExito>Formulario enviado exitosamente!</MensajeExito>}
				</ContenedorBotonCentrado>
			</Formulario>
		</main>
	);
}
 
export default RegistroEstudiante;
