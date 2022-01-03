import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../components/header'


function Empleos() {
    const navigate = useNavigate();
    const token = localStorage.getItem('user')
    const userType = localStorage.getItem('userType')
    const auth = localStorage.getItem('auth')

    useEffect(() => {
        if(auth){
          if(userType==='estudiante'){

          }else{
            navigate('/home-empresa')
          }
        }else{
          navigate('/')
        }

      },[]);
    return (
        <div>
            <Header active="empleos"/>
            <h2>Empleos Estudiante</h2>
        </div>
    )
}

export default Empleos
