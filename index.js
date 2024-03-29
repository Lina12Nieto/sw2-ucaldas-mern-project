// Imporatcion del framework express para realizar solicitudes http
const express = require('express');
const mongoose = require("mongoose");
const cors = require("cors");
const { log, error } = require('console');
const userRoutes = require("./src/routes/user_routes")
// bodyParser es un mildleware de express
// lo que hace es pasrsear el cuerpo de las solicitudes entrantes
// en formato JSON, multipartes y lo convierte en un objeto javaScript
const bodyParser = require ("body-parser");

const app = express();
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

// poder acceder a leer el archivo .env
require( 'dotenv' ).config() ;
const CONNECTION_PORT = process.env.PORT || 3005;
app.listen(CONNECTION_PORT,()=>{
    console.log(`Server running on port ${CONNECTION_PORT}`);
});

const mongo_connect = ()=>{
    try{
        mongoose
        .connect(process.env.DATABASE_CONNECTION_STRING)
        .then(() =>{
            console.log("Connected to the database")
        })
        .catch((error)=>{
            console.log("Error connecting to the database: ", error);
        })
    }catch(err){
        console.log("Connection Error!",err);

    }
};

mongo_connect();

// Rutas
app.use('/api/v1/users',userRoutes);