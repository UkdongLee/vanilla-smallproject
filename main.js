const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

const template = require('./lib/template');
const dataSrc = require('./lib/dataSrc')

// var publicPath = path.join(__dirname, 'public');
app.use(express.static('public'));

// var mysql_test = require('./db_con.js')();      // get database
// var getDb = mysql_test.init();
// mysql_test.test_open(getDb);

// var quetoStr = function() {
//     getDb.query(`SELECT count(*) FROM queto_src`, function(error, length) {
//     if(error) {throw error};
//     console.log(length);
// });
// }
  var servedQueto = dataSrc.quetoSen();
  console.log(servedQueto);
app.get('/', (req, res, next) => {
  nameOfLists = [              // todolist
    {"section" : "todo", "title" : "TO DO LIST"},
    {"section" : "doing", "title" : "DOING"},
    {"section" : "done", "title" : "DONE"},
  ]
  var templateLists = template.templateList(nameOfLists);

  nameOfComponents = [         // another components
    {"section" : "bg_photo", "title" : ""},
    {"section" : "greeting", "title" : ""},
    {"section" : "clock", "title" : ""},
    {"section" : "weather", "title" : ""},
    {"section" : "queto", "title" : ''}
  ]
  var components = template.templateComponents(nameOfComponents);

  var templateHTML = template.templateHTML(components, templateLists);

  res.send(templateHTML);
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