const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('./lib/template');

const app = http.createServer(       //create server
  function(request,response) {   
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
          {"section" : "weather", "title" : ""},
          {"section" : "clock", "title" : ""},
          {"section" : "greeting", "title" : ""},
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