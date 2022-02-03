const express=require ('express');
const nodemailer=require('nodemailer');
const validar= require('../lib/validar');

const router= express.Router();

router.get('/', async(req,res) =>{
   res.render('index');
      
});




router.post('/enviar-correo', validar.validar(validar.validarcontactos), async(req,res) =>{ 
  const {nombre,telefono,correo,mens}=req.body;  
  var correostr=req.body.correo;

  contentHTML=`
       <h1>Información de Usuario</h1>
       <ul>
             <li>Nombre: ${nombre}</li>
             <li>Telefono: ${telefono}</li>
             <li>Correo: ${correo}</li>             
       </ul>
       <p>${mens}</p>
  `;           
  const transporter = nodemailer.createTransport({
      host:'smtp.stackmail.com',
      port: 465,
      secure: true,
      auth:{
         user:'marlonf73@pcspeed.tech',         
         pass:'C@psule73'
      },
      tls:{
          rejectUnauthorized:false
      }     
  });

  const info =await transporter.sendMail({
     from:"'Pcspeed Servidor' <marlonf73@pcspeed.tech>",
     to: 'pcspeed.tech.pzo@gmail.com',
     bcc: correostr,
     subject:'Solicitud de Cliente',
     html:contentHTML
  });
   
      if (info.messageId){ 
         
         res.redirect('/correok');
      }else{
         req.flash('message','Error al enviar solicitud');      
      }

});      
  

module.exports=router;