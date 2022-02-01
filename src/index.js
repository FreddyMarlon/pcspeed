const express = require('express');
const morgan = require('morgan');
const exphbs = require('express-handlebars');
const flash = require('connect-flash');
const session = require('express-session');
const mysqlStore= require('express-mysql-session');
const passport= require('passport');
const {database}= require('./keys');
var fs = require('fs');
var https = require('https');
var options = {
   key:  fs.readFileSync('/node/firstweb/src/server.key', 'utf8'),
   cert: fs.readFileSync('/node/firstweb/src/server.cert', 'utf8')
 };
var favicon = require('serve-favicon');


//inicializaciones
const app = express();

require('./lib/passport');
const path = require('path');
//configuraciones
app.set('port', process.env.PORT || 3000);
app.set('views',path.join(__dirname,'views'));
app.engine('.hbs',exphbs({
   defaulayout: 'main',
   layoutsDir: path.join(app.get('views'),'layouts'),
   partialsDir: path.join(app.get('views'),'partials'),
   extname: '.hbs',
   helpers:require('./lib/handlebars')
}));

app.set('view engine','.hbs');
//middlewares
app.use(session({
   secret:'mysqlnodesession',
   resave: false,
   saveUninitialized: false,
   store: new mysqlStore(database)
}));

app.use(flash());
app.use(morgan('dev'));
app.use(express.urlencoded({extended: false}));
app.use(express.json());
app.use(passport.initialize());
app.use(passport.session());
app.use(favicon(__dirname + '/public/img/favicon.ico'));

//variables globales
app.use((req,res,next)=>{
      app.locals.success = req.flash('success');
      app.locals.message = req.flash('message'); 
      app.locals.warning = req.flash('warning');     
      app.locals.user = req.user;
     next();
}); 

//rutas
app.use(require('./routes/index'));
app.use(require('./routes/autenticacion'));
app.use('/enlaces',require('./routes/enlaces'));

//archivos estaticos
app.use(express.static(path.join(__dirname,'public')));
 
const server = https.createServer(options, app).listen(app.get('port'), function(){
   console.log("Servidor Activo en Puerto: %s ", app.get('port'));
}); 

var io = require('socket.io')(server);
io.on('connection', function(socket){    
   if (socket.connected){      
    socket.emit('pushNotification', { success: true, msg: '¡Hola! bienvenid@. Inicia Sesión para realizar tus solicitudes de servicio.'});      
   }
});
