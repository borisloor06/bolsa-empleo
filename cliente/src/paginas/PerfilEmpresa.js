import React, {useState, useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../components/header'

function PerfilEmpresa() {
    const navigate = useNavigate();
    const token = localStorage.getItem('user')
    const userType = localStorage.getItem('userType')
    const auth = localStorage.getItem('auth')
    const [perfil, setPerfil] = useState([]);
    const [empleos, setEmpleos] = useState([]);

    const loadPerfil = async () => {
      const response = await fetch("http://localhost:8000/perfil-empresa", {headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },});
      const data = await response.json();
      setPerfil(data);
  };
  const loadEmpleos = async () => {
      const response = await fetch("http://localhost:8000/ofertas", {headers: {
          'Content-Type': 'application/json',
          'x-access-token': token
        },});
      const data = await response.json();
      setEmpleos(data);
  };

  const actualizar = (e) => {
    navigate('/edit-empresa')
  }

    useEffect(() => {
        if(auth){
          if(userType==='empresa'){
            loadPerfil();
            loadEmpleos();
          }else{
            navigate('/home-estudiante')
          }
        }else{
          navigate('/')
        }
      },[]);

    return (
        <div>
            <Header active={'perfil'} isEmp={true}/>
            <main>
              <h1>Mi perfil</h1>
              <div className="img-perfil">
                  <img src={require("../img/perfil.png")} alt="foto de perfil" width="100" height="100"/>
              </div>
              <div className="datos-perfil">
                  <h2>Datos Empresa</h2>
                  {perfil.map(e =>{
                    return(
                      <div className="personales">
                          <h3>Empresa</h3>
                          <p>{e.nom_emp}</p>
                          <h3>RUC</h3>
                          <p>{e.ruc_emp}</p>
                          <h3>Sede</h3>
                          <p>{e.sede_emp}</p>
                          <h3>Telefono</h3>
                          <p>{e.tel_emp}</p>
                          <h3>Pais</h3>
                          <p>{e.pais_emp}</p>
                          <h3>Provincia</h3>
                          <p>{e.prov_emp}</p>
                          <h3>Ciudad</h3>
                          <p>{e.ciudad_emp}</p>
                          <h3>Dirección</h3>
                          <p>{e.dir_emp}</p>
                      </div>
                    )}
                  )}
                  <h2>Gerente Empresa</h2>
                  {perfil.map(e =>{
                    return(
                      <div className="personales">
                          <h3>Nombres</h3>
                          <p>{e.nombre_emp}</p>
                          <h3>Apellidos</h3>
                          <p>{e.apellido_emp}</p>
                          <h3>Cédula</h3>
                          <p>{e.ced_emp}</p>
                          <h3>Correo</h3>
                          <p>{e.email_emp}</p>
                      </div>
                    )}
                  )}
                  <h2>Descripcion de la Empresa</h2>
                  {perfil.map(e =>{
                    return(
                      <div className="descripcion">
                          <h3>Breve historia</h3>
                          <p>{e.historia_emp}</p>
                      </div>
                    )}
                  )}
                  <h2>Empleos ofrecidos actualmente</h2>
                  {perfil.map(e =>{
                    return(      
                      <div className="estudios">
                          <p>Gerente</p>
                          <p>Bodeguero</p>
                          <p>Gerente de marketing</p>
                      </div>
                    )}
                  )}
                <button onClick={actualizar}>Actualizar</button>
                </div>
            </main>
        </div>
    )
}

export default PerfilEmpresa
