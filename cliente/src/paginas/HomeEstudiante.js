import React, {useState, useEffect} from 'react';
import Header from '../components/header';
import { useNavigate } from "react-router-dom";


function HomeEstudiante(props) {
  document.body.classList.remove('fondo');
  document.body.classList.remove('body');

    const navigate = useNavigate();

    const [empleos, setEmpleos] = useState([]);
    const token = localStorage.getItem('user')
    const userType = localStorage.getItem('userType')
    const auth = localStorage.getItem('auth')

    const loadEmpleos = async () => {
        const response = await fetch("http://localhost:8000/", {headers: {
            'Content-Type': 'application/json',
            'x-access-token': token
          },});
        const data = await response.json();
        setEmpleos(data);
      };

      useEffect(() => {
        if(auth){
          if(userType==='estudiante'){
            loadEmpleos();
          }else{
            navigate('/home-empresa')
          }
        }else{
          navigate('/')
        }

      },[]);
    return (
        <div>
            <h2>Inicio de estudiantes</h2>
            <Header active="home"/>
            {empleos.map((x) => (
                 //hacer un componente para listar las ofertas, hay que añadirle un key a cada item 
              
                <h1>{x.titulo_oferta }</h1>
            )
            )}
        </div>
    )
}

export default HomeEstudiante
