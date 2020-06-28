//inports
// importamos la libreria de mysql para que podamos conectarnos con mysql 
let mysql=require("mysql");
//luego importamos la libreria util mas especificamente el modulo promisify que nos permite
// hacer promesas con mysql teniendo en cuenta que este no soporta las mimas. 
let {promisify}=require("util");
// ahora cremos una variable llamada pool la cual va a efectuar la coneccion a la base de datos 
// y a esta le importamos un objeto json con todos los datos de ingreso a la BD

let pool= mysql.createPool({
       
       host: 'localhost',
       user: 'root', 
       password : '',       
       database: 'plus_peliculas',
       port: ""

});

// EJECUTAMOS el metodo get connection para no tener que ejecutarlo cuando hagamos codigo
pool.getConnection((err, connection)=>{

    if (err) {
        if (err.code === 'PROTOCOL_CONNECTION_LOST') {
          console.error('conexion a db esta cerrada');
        }
        if (err.code === 'ER_CON_COUNT_ERROR') {
          console.error('Database tiene este nuemro de conexiones');
        }
        if (err.code === 'ECONNREFUSED') {
          console.error('Database consulta rechazada');
        }
      }
    
      if (connection) {
      connection.release();
      }
      console.log('conectado a DB');
      return;
});
// ahora utilizamos la variables pool y primisify para convertir promesas a call backs solo cuando 
// se ejecute el query 
pool.query=promisify(pool.query);

// y por ultimo exportamos el POOL para poder ejecutar nuestras consultas query
module.exports=pool;


