
import React from 'react';
import { BrowserRouter, Route, Routes } from "react-router-dom";


import Login from './paginas/Login';
import EditEstudiante from './paginas/EditEstudiante';
import EditEmpresa from './paginas/EditEmpresa';
import PerfilEstudiante from './paginas/PerfilEstudiante';
import PerfilEmpresa from './paginas/PerfilEmpresa';
import HomeEstudiante from './paginas/HomeEstudiante';
import HomeEmpresa from './paginas/HomeEmpresa';
import Oferta from './paginas/Oferta';
import Empleos from './paginas/Empleos';
import Postulaciones from './paginas/Postulaciones';
import RegistroEmpresa from './paginas/RegistroEmpresa';
import RegistroEstudiante from './paginas/RegistroEstudiante';


function App() {
  return (
    <BrowserRouter>
      <Routes>
          <Route  path='/'                 element={<Login/>} />
          <Route  path='/perfil-empresa/'       element={<PerfilEmpresa/>} />
          <Route  path='/perfil-estudiante/'    element={<PerfilEstudiante/>} />
          <Route  path='/edit-empresa/'         element={<EditEmpresa/>} />
          <Route  path='/edit-estudiante/'      element={<EditEstudiante/>} />
          <Route  path='/home-estudiante/'      element={<HomeEstudiante/>} />
          <Route  path='/home-empresa/'         element={<HomeEmpresa/>} />
          <Route  path='/registro-empresa/'     element={<RegistroEmpresa/>} />
          <Route  path='/registro-estudiante/'  element={<RegistroEstudiante/>} />
          <Route  path='/postulaciones/'        element={<Postulaciones/>} />
          <Route  path='/empleos/'              element={<Empleos/>} />
          <Route  path='/oferta/'               element={<Oferta/>} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
