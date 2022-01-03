import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../components/header'
import '../css/perfil.css'

function PerfilEstudiante(props) {
    const navigate = useNavigate();
    const [perfil, setPerfil] = useState([]);
    const [formacion, setFormacion] = useState([]);
    const [cursos, setCursos] = useState([]);
    const [experiencia, setExperiencia] = useState([]);
    const token = localStorage.getItem('user')
    const userType = localStorage.getItem('userType')
    const auth = localStorage.getItem('auth')

    const loadPerfil = async () => {
        const response = await fetch("http://localhost:8000/perfil", {headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },});
        const data = await response.json();
        setPerfil(data);
    };
    const loadFormacion = async () => {
        const response = await fetch("http://localhost:8000/formacion", {headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },});
        const data = await response.json();
        setFormacion(data);
    };
    const loadCursos = async () => {
        const response = await fetch("http://localhost:8000/cursos", {headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },});
        const data = await response.json();
        setCursos(data);
    };
    const loadExperiencia = async () => {
        const response = await fetch("http://localhost:8000/experiencia", {headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },});
        const data = await response.json();
        setExperiencia(data);
    };

    const actualizar = (e) => {
      navigate('/edit-estudiante')
    }

      useEffect(() => {
        if(auth){
          if(userType==='estudiante'){
            loadPerfil(); 
            loadCursos(); 
            loadFormacion(); 
            loadExperiencia(); 
          }else{
            navigate('/home-empresa')
          }
        }else{
          navigate('/')
        }

      },[]);

    return (
        <div>
            <Header active="perfil"/>
            <main>
            <h1>Mi perfil</h1>
            <div className="img-perfil">
                <img src={require("../img/perfil.png")} alt="foto de perfil" width="100" height="100"></img>
            </div>
            <div className="datos-perfil">
                <h2>Datos Personales</h2>
                {perfil.map(e =>{
                  return(
                  <div className="personales">
                      <h3>Nombres</h3>
                      <p>{e.nom_usuario}</p>
                      <h3>Apellidos</h3>
                      <p>{e.ape_usuario}</p>
                      <h3>Universidad</h3>
                      <p>Universidad Laica Eloy Alfaro de Manabí</p>
                      <h3>Facultad</h3>
                      <p>Ciencias Informaticas</p>
                      <h3>Carrera</h3>
                      <p>Tecnologias de la información</p>
                      <h3>Egresado</h3>
                      <p>No</p>
                      <h3>Teléfono</h3>
                      <p>{e.telefono_usuario}</p>
                      <h3>Correo Eléctronico</h3>
                      <p>{e.email_usuario}</p>
                  </div>
                  )
                })}
                <h2>Formación Academica</h2>
                <div className="estudios">
                    <h3>Estudios</h3>
                {formacion.map(e =>{
                  return(
                    <p>{e.estudios}</p>
                  )
                })}
                </div>
                <h2>Cursos y capacitaciones</h2>
                <div className="cursos">
                {cursos.map(e => 
                    <p>{e.cursos}</p>
                )}
                </div>
                <h2>Experiencia Laboral</h2>
                {experiencia.map(e=>{
                  return(
                  <div className="experiencia">
                    <b><p>Empresa</p></b>
                    <p>{e.nom_empresa}</p>
                    <b><p>Tiempo laboral</p></b>
                    <p>{e.tiempo_laboral}</p>
                    <b><p>Funciones realizadas</p></b>
                    <p>{e.funciones}</p>
                  </div>
                  )
                })}
                <button onClick={actualizar}>Actualizar</button>
            </div>
    </main>
        </div>
    )
}

export default PerfilEstudiante
