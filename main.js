const express = require('express');
const app = express();
const port = 3000;

var mysql_test = require('./db_con.js')();
var db = mysql_test.db_init();
mysql_test.test_open(db);          // DB con

const path = require('path');

const template = require('./lib/template');
const dataSrc = require('./lib/dataSrc')

app.use(express.static('public'));


app.get('/', (req, res, next) => {
    db.query(`SELECT count(*) FROM queto_src`, function(error, quetos) {
        if(error) {throw error};
        var randNum = Object.values(quetos[0])[0];
            ranNum = Math.floor(Math.random() * randNum);

        db.query(`SELECT * FROM queto_src WHERE id = ?`,[ranNum], function(error, ranQueto) {
            if(error) {throw error}
            var pickedQueto = ranQueto[0].queto;

            nameOfLists = [              // todolist
                {"section" : "todo", "title" : "TO DO LIST"},
                {"section" : "doing", "title" : "DOING"},
                {"section" : "done", "title" : "DONE"}
            ]
            var templateLists = template.templateList(nameOfLists);
        
            nameOfComponents = [         // another components
                {"section" : "bg_photo", "title" : ""},
                {"section" : "greeting", "title" : ""},
                {"section" : "clock", "title" : ""},
                {"section" : "weather", "title" : ""},
                {"section" : "queto", "title" : `${pickedQueto}`}
            ]
            /*dataSrc.quetoSen(function(callback) {
            console.log(callback);
            });*/
        
            var components = template.templateComponents(nameOfComponents);
            var templateHTML = template.templateHTML(components, templateLists);
        
            res.send(templateHTML);    
        }); 
    });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
})

// var app = http.createServer(function(request,response) {  

//     var _url = request.url;
//     var queryData = url.parse(_url, true).query;
//     var pathName = url.parse(_url, true).pathname;

//     if(pathName === '/'){
//       if(queryData.id === undefined) {      //home
//           nameOfLists = [              // todolist
//             {"section" : "todo", "title" : "TO DO LIST"},
//             {"section" : "doing", "title" : "DOING"},
//             {"section" : "done", "title" : "DONE"},
//           ]
//           var templateLists = template.templateList(nameOfLists);

//           nameOfComponents = [         // another components
//             {"section" : "bg_photo", "title" : ""},
//             {"section" : "greeting", "title" : ""},
//             {"section" : "clock", "title" : ""},
//             {"section" : "weather", "title" : ""},
//             {"section" : "queto", "title" : "This is Queto"}
//           ]
//           var components = template.templateComponents(nameOfComponents);

//           nameOfPackageFile = [
//             {"name" : "clock.js",},
//             {"name" : "bg_photo.js",},
//             {"name" : "todolist2.js",},
//             {"name" : "greeting.js",},
//             {"name" : "queto.js",},
//             {"name" : "weather.js",},
//             {"name" : "db_con.js",},
//           ]

//           var packageFile = template.readFile(nameOfPackageFile);

//           var templateHTML = template.templateHTML(components, templateLists);
          
//           /*
//           response.writeHead(200, {'Content-type' : 'text/css'});
//           var fileContents = fs.readFileSync('./views/styles.css', {encoding: 'utf8'});
//           response.write(fileContents);
//           response.end();
//           */

//           response.writeHead(200);
//           response.end(templateHTML);
//       }  else {
//         response.writeHead(404);
//         response.end('Not Found');
//       }   
//     }
// });
// app.listen(3000);