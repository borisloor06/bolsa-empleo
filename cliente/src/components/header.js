import React, {useState} from 'react'
import '../css/header.css'
import { useNavigate } from "react-router-dom";

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faBars, faSearch, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

function Header({active, isEmp}) {
        const navigate = useNavigate();

        let bars_search =       document.getElementById("barra-busqueda");
        let cover_ctn_search =  document.getElementById("busqueda");
        let inputSearch =       document.getElementById("inputSearch");

        function mostrar_buscador(){
            bars_search.style.top = "80px";
            cover_ctn_search.style.display = "block";
            inputSearch.focus();
        }

        function ocultar_buscador(){
            bars_search.style.top = "-10px";
            cover_ctn_search.style.display = "none";
            inputSearch.value = "";
        }

        function mostrar_menu(){
            document.getElementById("move-content").classList.toggle('move-container-all');
            document.getElementById("show-menu").classList.toggle('show-lateral');
        }

        function logout(){
            fetch('http://localhost:8000/logout')
            localStorage.removeItem('user')
            localStorage.removeItem('auth')
            localStorage.removeItem('userType')
            navigate('/')
        }
    return (
        <div>
            <header>
            <div className="header1">
                <div className="logo">
                    <img src={require("../img/logo1.PNG")} alt="Logo"/>
                    {isEmp?<h1>{active==='home'?'Mis Vacantes':(active==='empleos'?'Postulaciones':(active==='perfil'?'Perfil':''))}</h1>:
                    <h1>{active==='home'?'Inicio':(active==='empleos'?'Empleos':(active==='perfil'?'Perfil':''))}</h1>}
                </div>
                {isEmp?'':<div id="icono-busqueda">
                    <FontAwesomeIcon icon={faSearch} onClick={mostrar_buscador}/>
                </div>}
                <div id="icon-menu">
                <FontAwesomeIcon icon={faBars} onClick={mostrar_menu}/>
                </div>
                <div className="menu" id="show-menu">
                    <nav>
                        <ul>
                            <li className={active==='home'?'active':'home'} >
                                <a href={isEmp?"/home-empresa":"/home-estudiante"}>
                                {isEmp?'Mis Vacantes':'Inicio'}
                                </a>
                            </li>
                            <li className={active==='empleos'?'active':'empleos'}>
                                <a href={isEmp?"/postulaciones":"/empleos"}>
                                {isEmp?'Postulaciones':'Empleos recomendados'}
                                </a>
                            </li>
                            <li className={active==='perfil'?'active':'perfil'}>
                            <a href={isEmp?"/perfil-empresa":"/perfil-estudiante"}>Perfil</a>
                            </li>
                            <li><FontAwesomeIcon icon={faSignOutAlt} onClick={logout}/></li>
                        </ul>
                    </nav>
                </div>
            </div>
        </header>
        <div id="barra-busqueda">
            <input type="text" id="inputSearch" placeholder="¿tipo de trabajo desea?"/>
        </div>
        <div className="container-all" id="move-content">
            <div className="slogan">
                <div id="busqueda" onClick={ocultar_buscador}>
                </div>
                <div className="container-info-cover">
                    <h1>¡Encuentra tu trabajo deseado!</h1>
                    <p><b>Busca opciones de trabajo y nuevas ofertas laborales.</b></p>
                </div>
            </div>
        </div>
    </div>
    )
}

export default Header
