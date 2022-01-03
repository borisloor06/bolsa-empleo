const pool = require('../db')
<<<<<<< HEAD
const resDB = (err, result, res, next) =>{
  if (err) {
    throw(err)
  }else if(result.rowCount===1){
    res.json(result.rows)
  }else{
    next(err);
  }
}
//retorna las ofertas de empleo para el estudiante
const home = async (req, res, next) => {
    try {
          await pool.query("SELECT * FROM ofertas",(err, result) => resDB(err, result, res, next))
      } catch (error) {
        next(error);
      }
}

//retorna las oferta de empleo creadas por una empresa especifica
const homeEmpresa = async (req, res, next) => {
    try {
        await pool.query("SELECT * FROM ofertas WHERE id_empresa = $1 ", [req.userId], (err, result) => resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
    }

//retorna los datos de perfil del estudiante
const getPerfilEst = async (req, res, next) => {
    try {
        await pool.query(`select * from usuarios where id_usuario = $1`, [req.userId], (err, result)=>resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
}
const getFormacionEst = async (req, res, next) => {
    try {
        await pool.query(`select * from formacion form inner join posee on posee.id_formacion = form.id_formacion where posee.id_usuario = $1`, [req.userId], 
        (err, result) => resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
}
const getCursosEst = async (req, res, next) => {
    try {
        await pool.query(`select * from cursos form inner join realizo on realizo.id_cursos = form.id_cursos where realizo.id_usuario = $1`, [req.userId], 
        (err, result) => resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
}
const getExperienciaEst = async (req, res, next) => {
    try {
        await pool.query(`select * from experiencia form inner join obtuvo on obtuvo.id_exp_laboral = form.id_exp_laboral where obtuvo.id_usuario = $1`, [req.userId], 
        (err, result) => resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
}

//retorna los datos de perfil de la empresa
const getPerfilEmp = async (req, res, next) => {
    try {
        await pool.query('select * from empresas where id_empresa = $1', [req.userId], (err, result) => resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
}

//retorna las postulaciones que han hecho los estudiantes a una empresa
const getPostulaciones = async (req, res, next) => {
    try {
        await pool.query("SELECT * FROM ofertas inner join postula on postula.id_oferta = ofertas.id_oferta inner join usuarios on usuarios.id_usuario = postula.id_usuario WHERE ofertas.id_empresa = $1 ", 
        [req.userId], (err, result) => resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
}

const getOfertas = async (req, res, next) => {
    try {
        await pool.query("SELECT * FROM ofertas WHERE ofertas.id_empresa = $1 ", 
        [req.userId], (err, result) => resDB(err, result, res, next));
      } catch (error) {
        next(error);
      }
}

//retorna empleos recomendados
const getEmpleos = (req, res, next) => {

}

//maneja la actualizacion del perfil del estudiante
const editEst = (req, res, next) => {
}

//maneja la actualizacion del perfil de la empresa
const editEmp = (req, res, next) => {

}

//creacion de una oferta de empleo de una empresa
const ofertaEmp = async (req, res, next) => {
    try {
        const {
            titulo,
            puesto,
            vacantes,
            provincia,
            localidad,
            sueldo,
            funciones,
            requisitos,
        } = req.body
           await pool.query(
            "INSERT INTO ofertas(id_empresa, titulo_oferta, puesto_oferta, vac_oferta, prov_oferta, loc_ofertas, sueldo_ofertas, func_ofertas, req_ofertas) VALUES($1, $2, $3, $4, $5, $6, $7, $8, $9) RETURNING *",
            [req.userId, titulo, puesto, vacantes, provincia, localidad, sueldo, funciones, requisitos], (err, result) => resDB(err, result, res, next));
    } catch (error) {
        next(error);
    }
    
=======
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
>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
}



module.exports = {
<<<<<<< HEAD
    home,
    homeEmpresa,
    getPerfilEmp,
    getPerfilEst,
    editEmp,
    editEst,
    getEmpleos,
    ofertaEmp,
    getPostulaciones,
    getFormacionEst,
    getCursosEst,
    getExperienciaEst,
    getOfertas
=======
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
>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
}