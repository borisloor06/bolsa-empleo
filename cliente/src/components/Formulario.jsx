import React from 'react';

const formulario = () => {
    return (
        <form>
            Correo Eléctronico
            <input name="email"  type="text" placeholder="Ingrese su correo eléctronico"></input>
            Contraseña
            <input name="password" type="password" placeholder="Ingrese su contraseña"></input>
          </form>
    );
};

export default formulario;