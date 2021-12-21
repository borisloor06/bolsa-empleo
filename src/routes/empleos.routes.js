const {Router} = require('express');
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

module.exports = router;