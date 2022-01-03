const {config} = require('dotenv')
config()
<<<<<<< HEAD
<<<<<<< HEAD
//datos almacenados en variables de entorno
=======

>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
=======

>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
module.exports = {
    db: {
        user: process.env.DB_USER,
        password: process.env.DB_PASSWORD,
        host: process.env.DB_HOST,
        port: process.env.DB_PORT,
        database: process.env.DB_DATABASE
<<<<<<< HEAD
<<<<<<< HEAD
    },
    jwtpass: process.env.JWT
=======
    }
>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
=======
    }
>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
}