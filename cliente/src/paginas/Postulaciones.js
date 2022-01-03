import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../components/header'

function Postulaciones() {
    const navigate = useNavigate();
    const token = localStorage.getItem('user')
    const userType = localStorage.getItem('userType')
    const auth = localStorage.getItem('auth')

    useEffect(() => {
        if(auth){
          if(userType==='empresa'){

          }else{
            navigate('/home-estudiante')
          }
        }else{
          navigate('/')
        }
      },[]);
    return (
        <div>
             <Header active={'empleos'} isEmp={true}/>
        </div>
    )
}

export default Postulaciones
