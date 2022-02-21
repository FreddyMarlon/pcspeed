const express=require ('express');
const router= express.Router();
const pool = require('../database');
const {isLoggedIn,isNotLoggedIn} = require('../lib/validaruta');
const {ifCond}= require('../lib/handlebars');


router.get('/add',isLoggedIn,(req, res)=>{   
   res.render('links/add');    
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title,edo,descrip,creado} = req.body;
    const newlink = {
        title,
        edo,
        descrip,        
        creado,
        usuario_id: req.user.id
    };    
    await pool.query('INSERT INTO enlaces SET ?',[newlink]);     
    req.flash('success','Solicitud registrada correctamente');
    res.redirect('/enlaces');    
});

router.get('/buscars',isLoggedIn,(req, res)=>{   
    res.render('links/buscars');    
});

router.post('/buscars', isLoggedIn, async (req, res) => {            
    const {tsol} = req.body;
    const str1 = "%";
    const str2 = "%";   
    const newlink = {        
       tsol
    };    
    if (req.user.tipo =="Cliente"){
          if(tsol=='Finalizado'){      
                const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND usuarios.id=? AND enlaces.edo="r" ORDER BY enlaces.id',[req.user.id]);
                res.render('links/listas3',{links});
          }else if(tsol=='Procesando'){      
                const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND usuarios.id=? AND enlaces.edo="e" ORDER BY enlaces.id',[req.user.id]);
                res.render('links/listas3',{links});
          }else if (tsol=='Pendiente'){  
                const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND usuarios.id=? AND enlaces.edo="p" ORDER BY enlaces.id',[req.user.id]);
                res.render('links/listas3',{links});
          }else if (!isNaN(tsol)) {
                const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND usuarios.id=? AND enlaces.id=? ORDER BY enlaces.id',[req.user.id,tsol]);
                res.render('links/listas3',{links});
          }else{  
            const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND usuarios.id=? AND enlaces.edo=? ORDER BY enlaces.id',[req.user.id,tsol]);
            res.render('links/listas3',{links});
          }  
    }else if (req.user.tipo =="Administrador"){
        if(tsol=='Finalizado'){ 
            const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND enlaces.edo="r" ORDER BY enlaces.id');
            res.render('links/listas4',{links});
        }else if (tsol=='Procesando'){
            const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND enlaces.edo="e" ORDER BY enlaces.id');
            res.render('links/listas4',{links});
        }else if (tsol=='Pendiente'){  
            const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND enlaces.edo="p" ORDER BY enlaces.id');
            res.render('links/listas4',{links});
        }else if (!isNaN(tsol)) { 
            const links = await pool.query('SELECT enlaces.id as id,enlaces.title,enlaces.edo,enlaces.descrip,enlaces.usuario_id, enlaces.creado,usuarios.nombre,usuarios.tipo,usuarios.telef, usuarios.correo FROM enlaces,usuarios WHERE enlaces.usuario_id=usuarios.id AND enlaces.id=? ORDER BY enlaces.id',[tsol]);
            res.render('links/listas4',{links});
        }else{          
                          await pool.query('CREATE VIEW vista_usuarios AS SELECT * FROM usuarios where nombre LIKE ?',[str1.concat(tsol).concat(str2)]);
            const links = await pool.query('Select * from vista_usuarios,enlaces where vista_usuarios.id=enlaces.usuario_id order by enlaces.id');         
            res.render('links/listas4',{links});
            await pool.query('DROP VIEW vista_usuarios');
        }    
    }    
});


router.get('/', isLoggedIn, async (req, res) => {     
    if (req.user.tipo =="Cliente"){
            const links = await pool.query('SELECT * FROM enlaces WHERE usuario_id=?',[req.user.id]);
            res.render('links/listas2',{links});
    }else if (req.user.tipo =="Administrador"){
        const links = await pool.query('SELECT enlaces.id as id, enlaces.title as title,enlaces.edo as edo,enlaces.descrip as descrip,enlaces.creado as creado, usuarios.nombre as nombre,usuarios.telef as telef,usuarios.correo as correo FROM enlaces,usuarios  WHERE enlaces.usuario_id=usuarios.id ORDER BY enlaces.id');     
        res.render('links/listas',{links});
    }
    
});

router.get('/delete/:id', isLoggedIn, async (req, res) => {
   const {id}=req.params;
   await pool.query('DELETE FROM enlaces WHERE id = ?',[id]);
   req.flash('success','Solicitud eliminada correctamente');
   res.redirect('/enlaces');
});

router.get('/edit/:id', isLoggedIn, async (req, res) => {    
    const {id}=req.params;
    const links = await pool.query('SELECT * FROM enlaces WHERE id= ?',[id]);
    res.render('links/edit',{link: links[0]});
 });

 router.post('/edit/:id', isLoggedIn, async (req,res)=>{
       const {id} = req.params;
       const {title,edo,descrip} = req.body;
       const newlink={
            title,
            edo,
            descrip
        };
       await pool.query('UPDATE enlaces SET ? WHERE id=?',[newlink,id]);
       req.flash('success','Solicitud actualizada correctamente');
       res.redirect('/enlaces');
 });

 
 router.get('/actualprecios',isLoggedIn, async (req, res) => {        
    const links = await pool.query('SELECT * FROM ajustesprecios');
    res.render('links/actualprecios',{link: links[0]});
 });

 
 router.post('/actualprecios',isLoggedIn, async (req, res) => {
    const { tasacambio,costos} = req.body;
    const newlink = {        
        tasacambio,
        costos
    };    
      await pool.query('UPDATE ajustesprecios SET ? WHERE id=1',[newlink]);             
      await pool.query('COMMIT');
      await pool.query('UPDATE listaprecios,ajustesprecios SET listaprecios.preciob=(listaprecios.preciob+((listaprecios.preciob*ajustesprecios.costos)/100))');      
      await pool.query('COMMIT');
      await pool.query('UPDATE listaprecios,ajustesprecios SET listaprecios.preciod=listaprecios.preciob/ajustesprecios.tasacambio;');
       req.flash('success','Precios actualizados correctamente');             
       res.redirect('/enlaces/precios');
});

 router.get('/precios', async (req, res) => {      
    const links = await pool.query('SELECT listaprecios.id as id,listaprecios.nom,listaprecios.des,listaprecios.preciod,listaprecios.preciob,listaprecios.categoria,ajustesprecios.tasacambio,ajustesprecios.costos FROM listaprecios,ajustesprecios');
    res.render('links/precios',{links});
 }); 

module.exports = router;