 var mysql_test = require('../db_con.js')();
 var db = mysql_test.db_init();
 mysql_test.test_open(db);          // DB con

// var template = require('./template');

// module.exports.quetoSen = function() {
//     return new Promise(function(resolve, recject) {
//         db.query(`SELECT count(*) FROM queto_src`, function(error, quetos) {
//             if(error) {throw error};
//             var randNum = Object.values(quetos[0])[0];
//                 ranNum = Math.floor(Math.random() * randNum);
        
//             db.query(`SELECT * FROM queto_src WHERE id = ?`,[ranNum], function(error, ranQueto) {
//                 var pickedQueto = ranQueto[0].queto;                
//             }); 
//         });
//     });
// }


module.exports.quetoSen = function(callback) {
    db.query(`SELECT count(*) FROM queto_src`, function(error, quetos) {
        if(error) {throw error};
        var randNum = Object.values(quetos[0])[0];
            ranNum = Math.floor(Math.random() * randNum);
    
        db.query(`SELECT * FROM queto_src WHERE id = ?`,[ranNum], function(error, ranQueto) {
            if(error) {throw error}
            pickedQueto = ranQueto[0].queto;
            callback(pickedQueto);
            
        }); 
    });
}

// exports.bg_photo = function(request,response) {
//     // const backGroundImg = document.querySelector(".bg_photo");
//     const unsplashUrl = "https://source.unsplash.com/category/nature/1600x900";
//     var bgImg = new Image();
//     bgImg.alt = "배경화면";
//     bgImg.src = unsplashUrl;
//     var component = template.templateComponents('bg_photo', 'bgImg');
//         // backGroundImg.appendChild(bgImg);
//     var html = template.templateHTML(component);
//     response.writeHead(200);
//     response.end(html);
// }

// exports.greeting = function(request,response) {
//     const greetingId = document.querySelector("#greeting");
//     const greeting_form = greetingId.querySelector(".greeting_form");
//     const greeting_input = greeting_form.querySelector("input");
//     const greeting = greetingId.querySelector("h2");
    
//     const Key = "GREETING" //key storage
//     const ACTIVE_CN = "active";
    
//     function saveName(text) {
//         localStorage.setItem(Key, text);
//     }
    
//     function handleSubmit(event) {
//         event.preventDefault();
//         const currentValue = greeting_input.value;
//         sayGreeting(currentValue);
//         saveName(currentValue);
//     }
    
//     function askForName() {
//         greeting_form.addEventListener("submit", handleSubmit);  //should add 'form'
//     }
    
//     function sayGreeting(text) {
//         greeting_form.removeChild(greeting_input);
//         greeting.classList.add(ACTIVE_CN);
//         greeting.innerHTML = `안녕하세요 ${text}님.`
//     }
    
//     function loadName() {
//         const currentUser = localStorage.getItem(Key);
//             if(currentUser === null){
//                 askForName(); //nobody
//             } else {
//                 sayGreeting(currentUser); //somebody
//             }
//     }
    
//     function init() {
//         loadName();
//     }
    
//     init();
// }