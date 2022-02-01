const mysql= require('mysql');
const {promisify}= require('util');
const{database}= require('./keys');
const pool= mysql.createPool(database);

pool.getConnection((err,connection)=>{
   if(err){
       if(err.code ==='PROTOCOL_CONNECTION_LOST'){
       	   console.error('Conexión a BD cerrada');
       }
       if(err.code ==='ER_CON_COUNT_ERROR'){
       	   console.error('Demasiadas Conexiones a BD');
       }
       if(err.code ==='ECONNREFUSED'){
       	   console.error('Conexión a BD rechazada');
       }
       return;
   }else{

   if(connection) connection.release();
   console.log('DB conectada..!');
   return;
   }
});

pool.query= promisify(pool.query);

module.exports = pool;