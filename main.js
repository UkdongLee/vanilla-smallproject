const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('./lib/template');

const mysql_dbc = require('./db_con')();
const getDb = mysql_dbc.init();
mysql_dbc.test_open(getDb);      // MySQL server connect


const app = http.createServer(       //create server
  function(request,response) {   
    
    /*
    getDb.query(`SELECT * FROM queto_src`, function(error, quetos) {
      if(error) {throw error};
      const id = quetos.id;
      const title = quetos.queto;
    });
    */

    getDb.query(`SELECT * FROM queto_src WHERE id = ?`,[], function(error, quetos) {
      if(error) {throw error};
      const id = quetos.id;
      const title = quetos.queto;
    });


    var url = request.url;
      if(request.url == '/'){
        url = '/index.html';

        nameOfLists = [              // todolist
          {"section" : "todo", "title" : "TO DO LIST"},
          {"section" : "doing", "title" : "DOING"},
          {"section" : "done", "title" : "DONE"},
        ]
          const templateLists = template.templateList(nameOfLists);

        nameOfComponents = [         // another components
          {"section" : "bg_photo", "title" : ""},
          {"section" : "greeting", "title" : ""},
          {"section" : "clock", "title" : ""},
          {"section" : "weather", "title" : ""},
          {"section" : "queto", "title" : "This is Queto"}
        ]
          const components = template.templateComponents(nameOfComponents);
          
          const templateHTML = template.templateHTML(components, templateLists);
        
          response.writeHead(200);
          response.end(templateHTML);
      };
          if(request.url == '/favicon.ico'){
          return response.writeHead(404);
      };
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
});
app.listen(3000);