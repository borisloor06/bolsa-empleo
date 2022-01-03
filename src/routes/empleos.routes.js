const {Router} = require('express');
<<<<<<< HEAD
//importamos los controladores para las rutas
const {home, homeEmpresa, editEmp, editEst, getEmpleos, ofertaEmp, getPerfilEmp, getPerfilEst, getPostulaciones, getFormacionEst, getCursosEst, getExperienciaEst, getOfertas} = require('../controllers/empleos.controllers')
const { ingresoUsuario, registroEmpresa, registroEstudiante, auth, logout} = require('../controllers/autenticacion.controllers');
const { verifyToken } = require('../controllers/verificarJWT');

const router = Router();

//rutas GET 
router.get('/', verifyToken, home)
router.get("/empresa", verifyToken, homeEmpresa)
router.get("/perfil", verifyToken, getPerfilEst)
router.get("/perfil-empresa", verifyToken, getPerfilEmp)
router.get("/empleos", verifyToken, getEmpleos) //vacio
router.get("/postulaciones", verifyToken, getPostulaciones)
router.get("/ofertas", verifyToken, getOfertas)
router.get("/formacion", verifyToken, getFormacionEst)
router.get("/cursos", verifyToken, getCursosEst)
router.get("/experiencia", verifyToken, getExperienciaEst)

//rutas POST
router.post("/oferta", verifyToken, ofertaEmp)
router.post("/edit", editEst)//vacio
router.post("/editPerfil", editEmp)//vacio

//rutas de sesión
router.post('/login', ingresoUsuario)
router.post('/registroEstudiante', registroEstudiante)
router.post('/registroEmpresa', registroEmpresa)
router.get('/logout', logout)

=======
//const { route } = require('express/lib/application');
const {ingresoUsuario, login, home, homeEmpresa, getRegEst, getRegEmp, registroEstudiante, registroEmpresa, getEditEmp, getEditEst, getEmpleos, getOfertaEmp, getPerfilEmp, getPerfilEst, getPostulaciones} = require('../controllers/empleos.controllers')

const router = Router();

router.get('/', home)
router.get("/empresa", homeEmpresa)
router.get("/perfil", getPerfilEst)
router.get("/perfil-empresa", getPerfilEmp)
router.get("/edit", getEditEst)
router.get("/editPerfil", getEditEmp)
router.get("/empleos", getEmpleos)
router.get("/postulaciones", getPostulaciones)
router.get("/oferta", getOfertaEmp)







router.get('/login', login)
router.post('/login', ingresoUsuario)

router.get('/registroEstudiante', getRegEst)
router.post('/registroEstudiante', registroEstudiante)

router.get('/registroEmpresa', getRegEmp)
router.post('/registroEmpresa', registroEmpresa)
>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7

module.exports = router;