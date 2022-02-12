const { format }  = require('timeago.js');

const helpers={};

helpers.timeago = (timestamp) => {               
    return format(timestamp,'es');     
};

/*helpers.fecha = (timestamp) => {
   const fec = new Date(timestamp);

let hLocal = fec.getHours();
let hUTC = fec.getUTCHours();

return hUTC; // mostrará 10 para zonas horarias negativas

//console.log(`El día de la fecha UTC es: ${diaUTC}`)

// mostrará la fecha en la zona horaria del cliente
//return fec.toString();

// mostrará la fecha en la zona horaria UTC
//return fec.toUTCString();
}*/

helpers.fecha = (timestamp) => {   
  var a = timestamp;
  var months = ['Jan','Feb','Mar','Apr','May','Jun','Jul','Aug','Sep','Oct','Nov','Dec'];
  var year = a.getFullYear();
  var month = months[a.getMonth()];
  var date = a.getDate();
  var hour = a.getHours();
  var min = a.getMinutes();
  var sec = a.getSeconds();  
  var timelocal = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ':' + sec;

  var yearu = a.getUTCFullYear();
  var monthu = months[a.getUTCMonth()];
  var dateu = a.getUTCDate();
  var houru = a.getUTCHours();
  var minu = a.getUTCMinutes();
  var secu = a.getUTCSeconds()*60000 ;
    
  var timeUTC = dateu + ' ' + monthu + ' ' + yearu + ' ' + houru + ':' + minu + ':' + secu;
   
  //return timeUTC-timelocal;
  return a.getTimezoneOffset();
}

helpers.ifCond = (v1, operator, v2, options) =>{

    switch (operator) {
        case '==':
            return (v1 == v2) ? options.fn(this) : options.inverse(this);
        case '===':
            return (v1 === v2) ? options.fn(this) : options.inverse(this);
        case '!=':
            return (v1 != v2) ? options.fn(this) : options.inverse(this);
        case '!==':
            return (v1 !== v2) ? options.fn(this) : options.inverse(this);
        case '<':
            return (v1 < v2) ? options.fn(this) : options.inverse(this);
        case '<=':
            return (v1 <= v2) ? options.fn(this) : options.inverse(this);
        case '>':
            return (v1 > v2) ? options.fn(this) : options.inverse(this);
        case '>=':
            return (v1 >= v2) ? options.fn(this) : options.inverse(this);
        case '&&':
            return (v1 && v2) ? options.fn(this) : options.inverse(this);
        case '||':
            return (v1 || v2) ? options.fn(this) : options.inverse(this);
        default:
            return options.inverse(this);
    }
};

module.exports=helpers;