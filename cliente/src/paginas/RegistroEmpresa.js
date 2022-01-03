import React, {useState} from 'react';
import { useNavigate } from "react-router-dom";

import {Formulario, Label, ContenedorTerminos, ContenedorBotonCentrado, Boton, MensajeExito, MensajeError} from '../elementos/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Input from '../components/Input';
// import '../css/estilosREmpresa.css';
import '../css/registros.css';


const RegistroEmpresa = () => {

	document.body.classList.add('body');

	const [nombre, cambiarNombre] = useState({campo: '', valido: null});
	const [apellido, cambiarApellido] = useState({campo: '', valido: null});
	const [cedula, cambiarCedula] = useState({campo: '', valido: null});
	const [correo, cambiarCorreo] = useState({campo: '', valido: null});
	const [password, cambiarPassword] = useState({campo: '', valido: null});
	const [password2, cambiarPassword2] = useState({campo: '', valido: null});
	const [telefono, cambiarTelefono] = useState({campo: '', valido: null});
	const [actividad, cambiarActividad] = useState({campo: '', valido: null});
	const [ruc, cambiarRuc] = useState({campo: '', valido: null});
	const [empresa, cambiarEmpresa] = useState({campo: '', valido: null});
	const [sede, cambiarSede] = useState({campo: '', valido: null});
	const [telefono1, cambiarTelefono1] = useState({campo: '', valido: null});
	const [pais, cambiarPais] = useState({campo: '', valido: null});
	const [provincia, cambiarProvincia] = useState({campo: '', valido: null});
	const [ciudad, cambiarCiudad] = useState({campo: '', valido: null});
	const [direccion, cambiarDireccion] = useState({campo: '', valido: null});
	const [terminos, cambiarTerminos] = useState(false);
	const [formularioValido, cambiarFormularioValido] = useState(null);
	const [newEmp, setEmpresa] = useState({
		nombre: "",
		apellido: "",
        cedula: "",
		correo: "",
		password: "",
		telefono: "",
        actividad: "",
        ruc: "",
        empresa: "",
        sede: "",
        telefono1: "",
        pais: "",
        provincia: "",
        ciudad: "",
        direccion: ""
	  });
	  const navigate = useNavigate();
	  
	const expresiones = {
		nombre: /^([a-zA-Z]{4,})\s([a-zA-Z]+)*$/, // Letras y espacios, pueden llevar acentos.
        password: /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z])(?=.*[a-zA-Z]).{8,}$/, // Tener al menos 8 carácteres, una mayúscula y un número
        correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
        telefono: /^(09)\d{8}$/, // 09 hasta completar 10 digitos.
        cedula: /^\d{10}$/,
        ruc: /^\d{10}(001)$/,
        letras: /^[A-Za-z]{4,100}/
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
		setEmpresa((prevState) => {
			return {...prevState, 
                nombre: nombre.campo,
                apellido: apellido.campo,
                cedula: cedula.campo,
                correo: correo.campo,
                password: password.campo,
                telefono: telefono.campo,
                actividad: actividad.campo,
                ruc: ruc.campo,
                empresa: empresa.campo,
                sede: sede.campo,
                telefono1: telefono1.campo,
                pais: pais.campo,
                provincia: provincia.campo,
                ciudad: ciudad.campo,
                direccion: direccion.campo,
            }
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
            cedula.valido === 'true' &&
            correo.valido === 'true' &&
            password.valido === 'true' &&
            telefono.valido === 'true' &&
            actividad.valido === 'true' &&
            ruc.valido === 'true' &&
            empresa.valido === 'true' &&
            sede.valido === 'true' &&
            telefono1.valido === 'true' &&
            pais.valido === 'true' &&
            provincia.valido === 'true' &&
            ciudad.valido === 'true' &&
            direccion.valido === 'true' &&
			terminos
			){

				cambiarFormularioValido(true);
                cambiarNombre({campo: '', valido:null})
                cambiarApellido({campo: '', valido:null})
                cambiarCedula({campo: '', valido:null})
                cambiarCorreo({campo: '', valido:null})
                cambiarPassword({campo: '', valido:null})
                cambiarPassword2({campo: '', valido:null})
                cambiarTelefono({campo: '', valido:null})
                cambiarActividad({campo: '', valido:null})
                cambiarRuc({campo: '', valido:null})
                cambiarEmpresa({campo: '', valido:null})
                cambiarSede({campo: '', valido:null})
                cambiarTelefono1({campo: '', valido:null})
                cambiarPais({campo: '', valido:null})
                cambiarProvincia({campo: '', valido:null})
                cambiarCiudad({campo: '', valido:null})
                cambiarDireccion({campo: '', valido:null})
				
				const response = await fetch("http://localhost:8000/registroEmpresa", {
					method: "POST",
					headers: { "Content-Type": "application/json" },
					body: JSON.stringify(newEmp),
				});
				const res = await response.json();
				console.log(res)
				if(res.auth){
					localStorage.setItem("user", res.token);
					localStorage.setItem("userType", 'empresa');
					localStorage.setItem("auth", res.auth);
					navigate("/home-estudiante")
				}
				if(res.status === 'error'){
					cambiarFormularioValido(false);
				}
			} else {
				console.log(newEmp)
				cambiarFormularioValido(false);
		}
	}



	return (
		<main className='main'>
			<Formulario onSubmit={onSubmit}>
                <h2>Datos Empleador</h2><br />
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
					estado={cedula}
					cambiarEstado={cambiarCedula}
					tipo="text"
					label="Cédula"
					placeholder="1306541325"
					name="cedula"
					leyendaError="La cédula solo puede contener números y el maximo son 10 digitos."
					expresionRegular={expresiones.cedula}
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
					estado={telefono}
					cambiarEstado={cambiarTelefono}
					tipo="text"
					label="Teléfono"
					placeholder="0987654321"
					name="telefono"
					leyendaError="El telefono solo puede contener numeros y el maximo son 10 dígitos."
					expresionRegular={expresiones.telefono}
				/>
				<Input
					estado={actividad}
					cambiarEstado={cambiarActividad}
					tipo="text"
					label="Actividad Comercial"
					placeholder=""
					name="actividad"
					leyendaError="Debe ingresar una actividad comercial"
					expresionRegular={expresiones.letras}
				/>
                <h2>Datos Empresa</h2><br />
				<Input
					estado={ruc}
					cambiarEstado={cambiarRuc}
					tipo="text"
					label="RUC"
					placeholder="1306541325001"
					name="ruc"
					leyendaError="El ruc solo puede contener números y el sujifo 001, con un maximo de 13 digitos."
					expresionRegular={expresiones.ruc}
				/>
				<Input
					estado={empresa}
					cambiarEstado={cambiarEmpresa}
					tipo="text"
					label="Nombre de la Empresa"
					placeholder=""
					name="empresa"
					leyendaError="Debe ingresar el nombre de su empresa"
					expresionRegular={expresiones.letras}
				/>
				<Input
					estado={sede}
					cambiarEstado={cambiarSede}
					tipo="text"
					label="Sede"
					placeholder="Principal"
					name="sede"
					leyendaError="Debe ingresar el nombre de la sede"
					expresionRegular={expresiones.letras}
				/>
				<Input
					estado={telefono1}
					cambiarEstado={cambiarTelefono1}
					tipo="text"
					label="Teléfono de Contacto"
					placeholder="0912345675"
					name="telefono1"
					leyendaError="El telefono solo puede contener números y el maximo son 10 dígitos"
					expresionRegular={expresiones.telefono}
				/>
				<Input
					estado={pais}
					cambiarEstado={cambiarPais}
					tipo="text"
					label="País"
					placeholder="Ecuador"
					name="pais"
					leyendaError="Debe ingresar el nombre del país"
					expresionRegular={expresiones.letras}
				/>
				<Input
					estado={provincia}
					cambiarEstado={cambiarProvincia}
					tipo="text"
					label="Provincia"
					placeholder="Manabí"
					name="provincia"
					leyendaError="Debe ingresar el nombre de la provincia"
					expresionRegular={expresiones.letras}
				/>
				<Input
					estado={ciudad}
					cambiarEstado={cambiarCiudad}
					tipo="text"
					label="Ciudad"
					placeholder="Manta"
					name="ciudad"
					leyendaError="Debe ingresar el nombre de la ciudad"
					expresionRegular={expresiones.letras}
				/>
				<Input
					estado={direccion}
					cambiarEstado={cambiarDireccion}
					tipo="text"
					label="Dirección"
					placeholder=""
					name="direccion"
					leyendaError="Debe ingresar una dirección"
					expresionRegular={expresiones.letras}
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
 
export default RegistroEmpresa;
