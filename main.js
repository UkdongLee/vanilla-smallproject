var http = require('http');
var url = require('url');
var template = require('./lib/template');
var fs = require('fs');

// var mysql_test = require('./db_con.js')();      // get database
// var getDb = mysql_test.init();
// mysql_test.test_open(getDb);

// var quetoStr = function() {
//     getDb.query(`SELECT count(*) FROM queto_src`, function(error, length) {
//     if(error) {throw error};
//     console.log(length);
// });
// }

var app = http.createServer(function(request,response) {  

    var _url = request.url;
    var queryData = url.parse(_url, true).query;
    var pathName = url.parse(_url, true).pathname;

    if(pathName === '/'){
      if(queryData.id === undefined) {      //home
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
            {"section" : "queto", "title" : "This is Queto"}
          ]
          var components = template.templateComponents(nameOfComponents);

          nameOfPackageFile = [
            {"name" : "clock.js",},
            {"name" : "bg_photo.js",},
            {"name" : "todolist2.js",},
            {"name" : "greeting.js",},
            {"name" : "queto.js",},
            {"name" : "weather.js",},
            {"name" : "db_con.js",},
          ]

          var packageFile = template.readFile(nameOfPackageFile);

          var templateHTML = template.templateHTML(components, templateLists);
          
          /*
          response.writeHead(200, {'Content-type' : 'text/css'});
          var fileContents = fs.readFileSync('./views/styles.css', {encoding: 'utf8'});
          response.write(fileContents);
          response.end();
          */

          response.writeHead(200);
          response.end(templateHTML);
      }  else {
        response.writeHead(404);
        response.end('Not Found');
      }   
    }
});
app.listen(3000);