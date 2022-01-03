import React, {useEffect} from 'react'
import { useNavigate } from 'react-router-dom'

import Header from '../components/header'

function HomeEmpresa() {
  document.body.classList.remove('fondo');
  document.body.classList.remove('body');
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
            <Header active={'home'} isEmp={true}/>
        </div>
    )
}

export default HomeEmpresa
