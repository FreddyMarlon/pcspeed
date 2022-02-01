const yup = require('yup');

function validar(validacion){    
    return (req, res, next) => {
        try {
               validacion(req.body);               
               next();
        }catch (e){   
           req.flash('warning','Error al ingresar datos'); 
           res.redirect('/contactos');
        }
    };

}

 function validarcontactos(datos){
    const schema=yup.object().shape({
        nombre: yup.string().min(3).max(100).required(),
        telefono: yup.number().required(),
    });
    schema.validateSync(datos);     
}
 
module.exports={
    validar,
    validarcontactos,
};









