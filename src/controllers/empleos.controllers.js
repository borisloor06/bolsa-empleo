const pool = require('../db')
const path = require('path')

const login = async (req, res) => {
    const estudiante = await pool.query('SELECT * FROM usuarios')
    const empresa = await pool.query('SELECT * FROM empresas')
    let usuarios = estudiante.rows.concat(empresa.rows)
    usuarios = JSON.stringify(usuarios);
    let fs = require('fs');
    fs.writeFile("estudiantes_empresas.json", usuarios, (err) => {
        if (err) throw err
    });

    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/login.html');
}

const home = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/home.html');
}
const homeEmpresa = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/home-Empresas.html');
}

const getRegEst = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/registroEstudiante.html')
}

const getRegEmp = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/registroEmpresa.html')
}

const getPerfilEst = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/perfil.html')
}

const getPerfilEmp = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/perfil-empresa.html')
}
const getEditEst = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/editarPerfil.html')
}

const getEditEmp = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/editar-empresa.html')
}
const getPostulaciones = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/postulaciones.html')
}
const getOfertaEmp = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/ofertaEmpleo.html')
}

const getEmpleos = (req, res) => {
    res.sendFile('C:/Users/Boris Loor/Documents/Boris/5 nivel/aplicaciones web I/proyecto/Nuevo Archivo WinRAR ZIP/proyecto-segundo-parcial/public/html/empleos.html')
}


const ingresoUsuario = async (req, res, next) => {
    try {
        let {
            email,
            password
        } = req.body
        const estudiante = await pool.query('SELECT email_usuario, contrasena_usuario FROM usuarios WHERE email_usuario = $1 and contrasena_usuario = $2', [email, password])
        const empresa = await pool.query('SELECT email_emp, contrasena_emp FROM empresas WHERE email_emp = $1 and contrasena_emp = $2', [email, password])
        if (estudiante.rowCount == 1) {
            res.redirect('/')
        } else if (empresa.rowCount == 1) {
            res.redirect('/empresa')
        }else{
            res.send({"404": "usuario no encontrado"})
        }
    } catch (error) {
        next(error)
    }
}

const registroEstudiante = async (req, res, next) => {
    try {
        const {
            nombre,
            apellido,
            password,
            correo,
            telefono
        } = req.body
        
        const newStudent = await pool.query(
            "INSERT INTO usuarios(nom_usuario, ape_usuario, contrasena_usuario, email_usuario, telefono_usuario) VALUES($1, $2, $3, $4, $5) RETURNING *",
            [nombre, apellido, password, correo, telefono]
        );

        if(newStudent.rowCount == 1){
            res.redirect('/')
        }

        //res.json(newStudent.rows[0]);
    } catch (error) {
        next(error);
    }
}

const registroEmpresa = async (req, res, next) => {
    try {
        const {
            nombre,
            apellido,
            cedula,
            correo,
            password,
            ruc,
            empresa,
            sede,
            telefono,
            pais,
            provincia,
            ciudad,
            direccion
        } = req.body
        console.log(req.body)
        const newEmp = await pool.query(
            "INSERT INTO empresas(nombre_emp, apellido_emp, ced_emp, email_emp, contrasena_emp, ruc_emp, nom_emp, sede_emp, tel_emp, pais_emp, prov_emp, ciudad_emp, dir_emp) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
            [nombre, apellido, cedula, correo, password, ruc, empresa, sede, telefono, pais, provincia, ciudad, direccion]
        );
        //falta condicion
        if(newEmp.rowCount == 1){
            res.redirect('/empresa')
            //res.json(newStudent.rows[0]);
        }
    } catch (error) {
        next(error);
    }
}



module.exports = {
    ingresoUsuario,
    registroEmpresa,
    registroEstudiante,
    login,
    home,
    homeEmpresa,
    getRegEst,
    getRegEmp,
    getPerfilEmp,
    getPerfilEst,
    getEditEmp,
    getEditEst,
    getEmpleos,
    getOfertaEmp,
    getPostulaciones
}