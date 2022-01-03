import React from 'react';

const BtnRegistro = ({registro,registro1}) => {
  
    return (
        <div className="register-box">
          <button onClick={registro} id="estudiante">Crear cuenta de estudiante</button>
          <button onClick={registro1} id="empresa">Crear cuenta de empresa</button>
        </div>
    );
};

export default BtnRegistro;
