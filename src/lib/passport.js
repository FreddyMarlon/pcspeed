const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;

const pool = require('../database');
const helpers = require('../lib/helpers');

passport.use('local.signin', new LocalStrategy({
      usernameField: 'usuario',
      passwordField: 'clave',
      tipoField: 'tipo',
      passReqToCallback: true
}, async(req,usuario,clave,done)=>{
      const rows= await pool.query('SELECT * FROM usuarios WHERE usuario=?',[usuario]);
      if(rows.length>0){
            const usuario= rows[0];
            const validclave = await helpers.matchPassword(clave,usuario.clave);
            if(validclave){
               done(null,usuario,req.flash('success','Usuario Registrado '));   
            }else {
               done(null,false,req.flash('message','Clave incorrecta'));   
            }
      }else{
            return done(null,false,req.flash('warning','Usuario no existe'));   
      }
}));

passport.use('local.signup', new LocalStrategy({
      usernameField: 'usuario',
      passwordField: 'clave',
      tipoField: 'tipo',
      tipoField: 'direccion',
      passReqToCallback: true
}, async (req,usuario,clave,done) =>{
    const {nombre,tipo,direccion} = req.body;
    const newUser={
          usuario,
          clave,
          nombre,
          direccion,
          tipo
    };   
    newUser.clave= await helpers.encryptPassword(clave);
    const result= await pool.query('INSERT INTO usuarios SET ?',[newUser]);
    newUser.id =result.insertId;
    return done(null, newUser);
}));

passport.serializeUser((user,done)=>{   
   done(null, user.id);  
});

passport.deserializeUser(async(id, done)=> {      
   const rows = await pool.query('SELECT * FROM usuarios WHERE id=?',[id]);
   done(null, rows[0]);   
});


