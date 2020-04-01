const express=require ('express');
const router= express.Router();

router.get('/',(req,res) =>{
   res.render('index.html',{title: 'Primera Web'});
      
});

router.get('/contactos',(req,res) =>{
   res.render('contactos.html',{title:'Pagina de Contactos'});
      
});
module.exports=router;