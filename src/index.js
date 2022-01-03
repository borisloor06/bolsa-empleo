const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
<<<<<<< HEAD

const empleoRoutes = require('../src/routes/empleos.routes')
//iniciar el servidor
const app = express();

//dependencias
app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));

//middleware
=======
var path = require("path")

const empleoRoutes = require('../src/routes/empleos.routes')
const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));


>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
<<<<<<< HEAD
});

//uso de rutas
app.use(empleoRoutes)
//puerto servidor de datos
=======
  });


app.use(empleoRoutes)

>>>>>>> d561cc89e94de8454a528643c500b4d4477bb4f7
app.listen(8000)
