const http = require('http');
const fs = require('fs');
const url = require('url');
const template = require('./lib/template');

const app = http.createServer(            //create server
  function(request,response) {   
    var url = request.url;
      if(request.url == '/'){
        url = '/index.html';  

        // todolist 
        const list = template.templateList();

        // parts
        const bg_photo = template.partsHTML("bg_photo");
        const weather = template.partsHTML("weather");
        const clock = template.partsHTML("clock");

        // parts2
        const greeting = template.parts2HTML("greeting");
        const queto = template.parts2HTML("queto", "Sentence");


        const templateList = template.templateList(todoList, doingList, doneList);
        const templateComponents = template.templateComponents(bg_photo, weather, clock, greeting, queto);
        const templateHTML = template.templateHTML(templateComponents, list);
        
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