const express = require('express');
const cors = require('cors')
const morgan = require('morgan')
var path = require("path")

const empleoRoutes = require('../src/routes/empleos.routes')
const app = express();

app.use(cors())
app.use(morgan('dev'));
app.use(express.json());
app.use(express.static('public'))
app.use(express.urlencoded({ extended: false }));


app.use((err, req, res, next) => {
    return res.status(500).json({
      status: "error",
      message: err.message,
    });
  });


app.use(empleoRoutes)

app.listen(8000)
