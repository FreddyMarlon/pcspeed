const { format }  = require('timeago.js');

const helpers={};

helpers.timeago = (timestamp) => {               
    return format(timestamp,'es');     
};

helpers.fecha = (timestamp) => {   
  var t = timestamp; 
  var a= new Date(); 
  var b= new Date((t.getTime()-(a.getTimezoneOffset()*60000)));

  var months = ['Enero','Feb','Mar','Abr','May','Jun','Jul','Ago','Sep','Oct','Nov','Dic']; 
  var year = b.getFullYear();
  var month = months[b.getMonth()];  
  var date = b.getDate();    
  var hour = b.getHours();
  var min = b.getMinutes();
  var sec = b.getSeconds();  
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