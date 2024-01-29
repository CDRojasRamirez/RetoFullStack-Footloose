import express from "express";
import cors from 'cors'
import dotenv from 'dotenv'
import cookieParser from "cookie-parser";

import { indexRouter } from "./routes/indexRouter.js";

const app = express()

//seteamos la carpeta public para archivos estaticos
app.use(express.static('public'))

//para procesar datos enviados desde forms
app.use(express.urlencoded({extended: true}))
app.use(express.json())
app.use(cookieParser())

app.use( cors({
    origin: ['http://localhost:8000'],
    methods: ['POST', 'GET'],
    credentials: true
}) )

//seteamos variables de entorno
dotenv.config({path: './.env'})

// Rutas
app.use(indexRouter)

// Iniciar servidor
app.listen(8000, () => {
    console.log('Server up running port 8000');
});