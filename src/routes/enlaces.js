const express=require ('express');
const router= express.Router();
const pool = require('../database');
const {isLoggedIn} = require('../lib/validaruta');
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
    if (req.user.tipo =="I"){
            const links = await pool.query('SELECT * FROM enlaces WHERE usuario_id=?',[req.user.id]);
            res.render('Links/listas',{links});
    }else if (req.user.tipo =="A"){
        const links = await pool.query('SELECT * FROM enlaces');
        res.render('Links/listas',{links});
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
       req.flash('success','Solicitud actualizado correctamente');
       res.redirect('/enlaces');
 });

module.exports = router;