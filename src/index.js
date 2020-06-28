//imports
const morgan=require("morgan");
const express=require("express");
const session=require("express-session");
const bodyParser = require('body-parser');
const interUser=require("./controller/routes");

// 1. inicio la aplicacion
let app=express();

// 2. configuracion del servidor 
app.set("port", process.env.PORT || 4000 );

// 3. Middlewares

app.use(morgan("dev"));
//body parse para convertir http a json
app.use(bodyParser.urlencoded({extended:false}));
app.use(bodyParser.json());

app.use(session({
    secret: "esto es secreto",
    resave: true,
    saveUninitialized: true
}))

// 4.rutas
app.use(require("./controller/index"));
app.use("/user", interUser );
// 5. inicializacion del servidor 
app.listen(app.get("port"), ()=>{

    console.log("ejecutando en el puerto", app.get("port"));

});
// . variables globales 

