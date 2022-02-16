const express=require ('express');
const router= express.Router();
const pool = require('../database');
const {isLoggedIn,isNotLoggedIn} = require('../lib/validaruta');
const {ifCond}= require('../lib/handlebars');


router.get('/add',isLoggedIn,(req, res)=>{   
   res.render('links/add');    
});

router.post('/add', isLoggedIn, async (req, res) => {
    const { title,edo,descrip} = req.body;
    const newlink = {
        title,
        edo,
        descrip,
        usuario_id: req.user.id
    };    
    await pool.query('INSERT INTO enlaces SET ?',[newlink]);     
    req.flash('success','Solicitud registrada correctamente');
    res.redirect('/enlaces');    
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