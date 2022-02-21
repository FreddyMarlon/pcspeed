const { format }  = require('timeago.js');

const helpers={};

helpers.timeago = (timestamp) => {               
    return format(timestamp,'es');     
};



helpers.fecha = (timestamp) => {   
  let t = timestamp; 
  var months = ['Enero','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']; 
  var year = t.getFullYear();
  var month = months[t.getMonth()];  
  var date = t.getDate();    
  var hour = t.getHours();
  var min = t.getMinutes();
  var sec = t.getSeconds();  
  var suffex = (hour >= 12)? 'PM' : 'AM';  
  hour = (hour > 12)? hour -12 : hour;  
  hour = (hour == '00')? 12 : hour;
  var timelocal = date + ' ' + month + ' ' + year + ' ' + hour + ':' + min + ' ' + suffex;

  return timelocal;
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