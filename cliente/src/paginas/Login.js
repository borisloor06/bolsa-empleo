  import '../css/login.css';
  import React, {useState, useEffect} from "react";
  import { useNavigate } from "react-router-dom";


//componentes
import { ContenedorBotonCentrado, Formulario, MensajeError} from '../elementos/Formularios';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faExclamationTriangle } from '@fortawesome/free-solid-svg-icons';
import Titulo from '../components/Titulo'
import BtnSesion from '../components/BtnSesion';
import BtnRegistro from '../components/BtnRegistro';



function Login(props) {
  document.body.classList.add('fondo');
  document.body.classList.remove('body');

  const navigate = useNavigate();
  
  const RegistroSesionUsuario = () => {
    navigate('/registro-estudiante');
  }
  const RegistroSesionEmpresa = () => {
    navigate('/registro-empresa');
  }
  const checkSesion = () => {
        const userType = localStorage.getItem("userType");
        const auth = localStorage.getItem("auth");
    if(auth){
      if(userType === 'estudiante') navigate('/home-estudiante')
      if(userType === 'empresa') navigate('/home-empresa')
    }
  }

  const [error, setError] = useState(false)
  const [user, setUser] = useState({
    email: "",
    password: "",
  });
  

  const handleSubmit = async (event) => {
    event.preventDefault();
    if(user.email === '' || user.password === ''){
      setError(true)
    }else{
      const response = await fetch("http://localhost:8000/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(user),
      });
      const res = await response.json();
      if(res.auth){
        if(res.type === 'estudiante'){
          // <Link to={{pathname: '/home-estudiantes', token: res.token}}/>
          localStorage.setItem("user", res.token);
          localStorage.setItem("userType", res.type);
          localStorage.setItem("auth", res.auth);
          navigate("/home-estudiante")
        }else if(res.type === 'empresa'){
          localStorage.setItem("user", res.token);
          localStorage.setItem("userType", res.type);
          localStorage.setItem("auth", res.auth);
          navigate("/home-empresa")
        }
      }
    }

  }

  const handleChange = (e) =>
  setUser({ ...user, [e.target.name]: e.target.value });

  useEffect(checkSesion)

  return (
    <div className="App" onLoad={checkSesion}>
      <main >
        <div className="login-box">
          <div className="avatar" alt="Avatar Image"></div>
          <Titulo />
           <form onSubmit={handleSubmit}>
            Correo Eléctronico
            <input onChange={handleChange} name="email"  type="text" placeholder="Ingrese su correo eléctronico"></input>
            Contraseña
            <input onChange={handleChange} name="password" type="password" placeholder="Ingrese su contraseña"></input>
          <BtnSesion />
          </form>
          <a href="/">¿Olvidaste tu contraseña?</a><br></br>
        </div>
        <BtnRegistro registro={RegistroSesionUsuario} registro1={RegistroSesionEmpresa} />
            {error && <MensajeError>
					<p>
						<FontAwesomeIcon icon={faExclamationTriangle}/>
						<b>Error:</b> Por favor rellena el formulario correctamente.
					</p>
				</MensajeError>}
      </main>
    </div>
  );
}


export default Login;