const { Pool } = require('pg')
const {db} = require('./config')

<<<<<<< HEAD
//conexion a la base de datos con el gestor Postgresql
=======

>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7

const pool = new Pool({
    user: db.user,
    password: db.password,
    host: db.host,
    port: db.port,
    database: db.database
})

module.exports = pool;