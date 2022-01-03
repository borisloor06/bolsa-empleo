import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
//import styled from 'styled-components';
import { Formulario, BotonCentrado, Boton, MensajeExito, MError } from '../elementos/DatosFormularios';
import { faExclamationCircle } from '@fortawesome/free-solid-svg-icons'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome'
import Input from '../components/Ingresos';
//no acepta la letra ñ ni numeros, talves necesitemos un campo llamado descripcion en la base de datos Preguntar?
//para que exactamente?
const Oferta = (props) => {
  const [titulo, cambiarTitulo] = useState({ campo: '', valido: null });
  const [puesto, cambiarPuesto] = useState({ campo: '', valido: null });
  const [vacantes, cambiarVacantes] = useState({ campo: '', valido: null });
  const [provincia, cambiarProvincia] = useState({ campo: '', valido: null });
  const [localidad, cambiarLocalidad] = useState({ campo: '', valido: null });
  const [sueldo, cambiarSueldo] = useState({ campo: '', valido: null });
  const [funciones, cambiarFunciones] = useState({ campo: '', valido: null });
  const [requisitos, cambiarRequisitos] = useState({ campo: '', valido: null });
  const [formularioValido, cambiarFormularioValido] = useState(null);
  const [oferta, setOferta] = useState({
		titulo: "",
		puesto: "",
		vacantes: 0,
		provincia: "",
		localidad: "",
    sueldo: 0,
    funciones: "",
    requisitos: "",
	  });

    const auth = localStorage.getItem('auth')
    const userType = localStorage.getItem('userType')
    const navigate = useNavigate()

    const expresiones = {
        titulo: /^[a-zA-ZÀ-ÿ\s\ ]{5,40}$/,
        puesto: /^[a-zA-ZÀ-ÿ\s\ ]{5,40}$/,
        vacantes: /^\d{1,3}$/,
        provincia: /^[a-zA-ZÀ-ÿ\s\ ]{5,40}$/,
        localidad: /^[a-zA-Z0-9\ ]{4,40}$/,
        sueldo: /^\d{1,4}$/,
        funciones: /^[a-zA-Z0-9\,\.\ ]{5,500}$/,
        requisitos: /^[a-zA-Z0-9\,\.\ ]{5,500}$/
    }

  const handleChange = (e) => {
		setOferta((prevState) => {
			return {...prevState, titulo: titulo.campo, puesto: puesto.campo, vacantes: parseInt(vacantes.campo), provincia: provincia.campo, localidad: localidad.campo, sueldo: parseInt(sueldo.campo), funciones: funciones.campo, requisitos: requisitos.campo}
		});
	}

  const onSubmit = async (e) => {
    e.preventDefault();
    if (titulo.valido === 'true' && puesto.valido === 'true' && vacantes.valido === 'true' && provincia.valido === 'true' && localidad.valido === 'true' && sueldo.valido === 'true' && funciones.valido === 'true' && requisitos.valido === 'true'
    ) {
      cambiarFormularioValido(true);
      cambiarTitulo({ campo: '', valido: '' });
      cambiarPuesto({ campo: '', valido: null });
      cambiarVacantes({ campo: '', valido: null });
      cambiarProvincia({ campo: '', valido: null });
      cambiarLocalidad({ campo: '', valido: null });
      cambiarSueldo({ campo: '', valido: null });
      cambiarFunciones({ campo: '', valido: null });
      cambiarRequisitos({ campo: '', valido: null });
      console.log(oferta)
      const response = await fetch("http://localhost:8000/oferta", {
					method: "POST",
					headers: { "Content-Type": "application/json",
          "x-access-token": localStorage.getItem('user') },
					body: JSON.stringify(oferta),
				});
				const res = await response.json();
        console.log(res)
        if(res){
          navigate('/home-empresa')
        }
    } else {
      cambiarFormularioValido(false);
    }
  }

  useEffect(() => {
    if(!auth){
      navigate("/")
    }
    if(auth && userType!=='empresa'){
      // navigate('/home-estudiante')
      navigate("/home-estudiante")
    }
  });

  return (
    <main>
      <Formulario className="registro" id="form" onSubmit={onSubmit}>
        <h1>Nueva oferta de trabajo</h1>
        <p>
          <b> Todos los campos son requeridos* </b></p>
        <Input estado={titulo} cambiarEstado={cambiarTitulo} className="control" type="text" name="titulo" id="Titulo" label="Titulo" placeholder="Titulo" leyendaError="Solo admite letras, minimo 5 caracteres" expresionRegular={expresiones.titulo} />
        <Input estado={puesto} cambiarEstado={cambiarPuesto} className="control" type="text" name="Puesto" id="puesto" label="Puesto" placeholder="Puesto de Trabajo" leyendaError="Solo admite letras, minimo 5 caracteres" expresionRegular={expresiones.puesto} />
        <Input estado={vacantes} cambiarEstado={cambiarVacantes} className="control" type="number" name="Numero" id="numero" label="Numero" placeholder="Numero de vacantes" leyendaError="Solo admite numeros, maximo 3 dígitos" expresionRegular={expresiones.vacantes} />
        <Input estado={provincia} cambiarEstado={cambiarProvincia} className="control" type="text" name="Provincia" id="provincia" label="Provincia" placeholder="Provincia" leyendaError="Solo admite letras, minimo 5 caracteres" expresionRegular={expresiones.provincia} />
        <Input estado={localidad} cambiarEstado={cambiarLocalidad} className="control" type="text" name="Localidad" id="localidad" label="Localidad" placeholder="Localidad" leyendaError="Solo admite letras, minimo 5 caracteres" expresionRegular={expresiones.localidad} />
        <Input estado={sueldo} cambiarEstado={cambiarSueldo} className="control" type="number" name="Sueldo" id="sueldo" label="Sueldo" placeholder="Sueldo" leyendaError="Solo admite numeros, maximo 4 dígitos" expresionRegular={expresiones.sueldo} />
        <Input estado={funciones} cambiarEstado={cambiarFunciones} className="Funciones" type="text" name="Funciones" id="funciones" label="Funciones" placeholder="Funciones del puesto" leyendaError="Solo admite letras, minimo 5 caracteres" expresionRegular={expresiones.funciones} />
        <Input estado={requisitos} cambiarEstado={cambiarRequisitos} className="Requisitos" type="text" name="Requisitos" id="requisitos" label="Requisitos" placeholder="Requisitos" leyendaError="Solo admite letras, minimo 5 caracteres" expresionRegular={expresiones.requisitos} />
        {formularioValido === false && <MError>
          <p>
            <FontAwesomeIcon icon={faExclamationCircle} />
            <b>Error</b> Rellene correctamente
          </p>
        </MError>}
        <BotonCentrado>
          <Boton onClick={handleChange} className="boton" type="submit">Enviar</Boton>
          {formularioValido === true && <MensajeExito>enviado correctamente </MensajeExito>}
        </BotonCentrado>
      </Formulario>
    </main>
  );
}

export default Oferta;
