const express=require ('express');
const router= express.Router();


const passport= require('passport');
const {isLoggedIn, isNotLoggedIn} = require('../lib/validaruta');

router.get('/clientes.js', ( req, res)=>{
     res.render('clientes');
});

router.get('/contactos', ( req, res)=>{
     res.render('contactos');
});

router.get('/correok',  ( req, res)=>{
     res.render('correok');
});              


router.get('/signup',isNotLoggedIn, ( req, res)=>{  
     res.render('aut/signup');   
});
     
router.get('/signupadm',isLoggedIn, ( req, res)=>{      
     res.render('aut/signupadm');      
});

router.post('/signup', isNotLoggedIn, passport.authenticate('local.signup',{      
     successRedirect: '/profile',
     failureRedirect: '/signup',
     failureFlash: true,     
}));

router.post('/signupadm', isLoggedIn, passport.authenticate('local.signup',{      
     successRedirect: '/profile',
     failureRedirect: '/signupadm',
     failureFlash: true,     
}));

router.get('/signin',isNotLoggedIn,(req,res)=>{
       res.render('aut/signin');
});

router.post('/signin',isNotLoggedIn,(req,res,next)=>{
      passport.authenticate('local.signin',{           
           successRedirect: '/profile',
           failureRedirect: '/signin',
           failureFlash: true
      })(req,res,next); 
});


router.get('/profile', isLoggedIn,(req,res)=>{
     res.render('profile'); 
});


router.get('/logout',isLoggedIn, (req,res)=>{     
     req.session.destroy();       
     res.redirect('/');        
});


module.exports = router;