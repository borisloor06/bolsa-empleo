const jwt = require('jsonwebtoken')
const {jwtpass} = require('../config')
const pool = require('../db')

//ejemplo de autenticacion //no esta en uso actualmente
const auth = async (req, res, next) => {
    try {
        const estudiante = await pool.query('SELECT * FROM usuarios WHERE id_usuario = $1', [req.userId])
        const empresa = await pool.query('SELECT * FROM empresas WHERE id_empresa = $1', [req.userId])

        if (estudiante.rowCount == 1) {
            res.json(estudiante);
        } else if (empresa.rowCount == 1) {
            res.json(empresa);
        }else{
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        next(error)
    }
}

//maneja el inicio de sesión de estudiantes y empresas
const ingresoUsuario = async (req, res, next) => {
    try {
        let {
            email,
            password
        } = req.body

        const estudiante = await pool.query('SELECT id_usuario as id, email_usuario as email, contrasena_usuario as password FROM usuarios WHERE email_usuario = $1 and contrasena_usuario = $2', [email, password])
        const empresa = await pool.query('SELECT id_empresa as id, email_emp as email, contrasena_emp as password FROM empresas WHERE email_emp = $1 and contrasena_emp = $2', [email, password])

        if (estudiante.rowCount == 1) {
            const token = jwt.sign(estudiante.rows[0], jwtpass, {
            expiresIn:  '24h' });
            res.json({auth: true, token, type:'estudiante'});
        } else if (empresa.rowCount == 1) {
            const token = jwt.sign(empresa.rows[0], jwtpass, {
                expiresIn: "24h",
            });

            res.json({auth: true, token, type:'empresa'});
        }else{
            return res.status(404).json({ message: "User not found" });
        }
    } catch (error) {
        next(error)
    }
}

//maneja el registro de un estudiante a la base de datos
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
            const token = jwt.sign(newStudent.rows[0], jwtpass, {
                expiresIn: "24h",
            });

            res.json({auth: true, token});
        }

    } catch (error) {
        next(error);
    }
}

//maneja el ingreso de una empresa a la base de datos
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
            telefono1,
            pais,
            provincia,
            ciudad,
            direccion
        } = req.body

        const newEmp = await pool.query(
            "INSERT INTO empresas(nombre_emp, apellido_emp, ced_emp, email_emp, contrasena_emp, ruc_emp, nom_emp, sede_emp, tel_emp, pais_emp, prov_emp, ciudad_emp, dir_emp) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9, $10, $11, $12, $13) RETURNING *",
            [nombre, apellido, cedula, correo, password, ruc, empresa, sede, telefono1, telefono, pais, provincia, ciudad, direccion]
        );
        if(newEmp.rowCount == 1){
            const token = jwt.sign(newEmp.rows[0], jwtpass, {
                expiresIn: "24h",
            });

            res.json({auth: true, token});
        }
    } catch (error) {
        next(error);
    }
}

//cierra la sesion activa
const logout = async (req, res) =>{
    res.status(200).send({ auth: false, token: null });
}

module.exports = {
    ingresoUsuario,
    registroEmpresa,
    registroEstudiante,
    auth,
    logout
}