require('dotenv').config();

const RED = require("node-red");
const http = require("http");
const express = require("express");

const app = express();
const server = http.createServer(app);

const settings = {
    httpAdminRoot: "/",
    httpNodeRoot: "/",
    userDir: "./data",
    functionGlobalContext: {
        env: process.env
    }
};

// Inicializar Node-RED
RED.init(server, settings);

// Montar rutas (ESTO ES CLAVE)
app.use(settings.httpAdminRoot, RED.httpAdmin);
app.use(settings.httpNodeRoot, RED.httpNode);

// Iniciar servidor
server.listen(1880, () => {
    console.log("Node-RED corriendo en http://localhost:1880");
});

// Iniciar Node-RED
RED.start();