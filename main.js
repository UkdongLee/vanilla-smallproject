var http = require('http');
var fs = require('fs');
var url = require('url');

function templateHTML() {
  var todoList = toDoListHTML("todo", "TO DO LIST");
  var doingList = toDoListHTML("doing", "DOING");
  var doneList = toDoListHTML("done", "DONE");

  return `
    <!DOCTYPE html>
    <html lang="en">
    <head>
        <meta charset = "utf-8">
        <meta name="viewport" content="width=device-width, initial-scale=1.0">
        <meta http-equiv="X-UA-Compatible" content="ie=edge">
        <title>Web application</title>
        <link rel="stylesheet" href="style.css" type="text/css">
    </head>
    <body>
        <!-- random image -->
        <article id="bg_photo">
            <div class="bg_photo"></div>
        </article>

        <!-- weather -->
        <article id="weather">
            <div class="weather"></div>
        </article> 

        <!-- clock -->
        <article id="clock">
            <form class="jsForm"></form>
        </article>



        <!-- greeting -->
        <article id="greeting">
            <form class="js-greeting-form">
                <input type="text" placeholder="이름을 말해주세요.">
            </form>
            <h2 class="greetings"></h2>
        </article>

        <!-- todolist -->
        <article id="todolist">
            <form class="todoform">
                <input type="text" placeholder="해야 할 일을 써주세요.">
            </form>
            <ul class="toDoList"></ul>
        </article>


        
        <!-- manage tasks -->
        <div id="manageTask">
            <!-- to do -->
            ${todoList}

            <!-- doing -->
            ${doingList}

            <!-- done -->
            ${doneList}
        </div>

        <!-- queto -->
        <form class="queto">
            <input type="button" value="button">
            <h2 class="quetoSen">sentence</h2>
        </form>
    </body>

    <script src="clock.js"></script>
    <script src="bg_photo.js"></script>
    <script src="todolist.js"></script>
    <script src="todolist2.js"></script>
    <script src="greeting.js"></script>
    <script src="quetoSrc.js"></script>
    <script src="queto.js"></script>
    <script src="weather.js"></script>

    </html>
  `
}

function



function toDoListHTML(section, title) {
  return `
  <div class="${section}">
    <div class="${section}_title">
      <h2>${title}</h2>
    </div>
    <form class="${section}_list">
      ${i_doListHTML(section)}
    </form>
    <ul class="${section}_content"></ul>
  </div>
  `;
}

function i_doListHTML(section) {
  const _input = `<input type="text" placeholder="type what you have to do">`;

  if(section === 'todo') {
    return _input;
  } else {
    return '';
  };
} 

const app = http.createServer(            //create server
  function(request,response) {   
    var url = request.url;
    if(request.url == '/'){
      url = '/index.html';      
    }
    if(request.url == '/favicon.ico'){
      return response.writeHead(404);
    }
    response.writeHead(200);
    response.end(fs.readFileSync(__dirname + url));
 
});

app.listen(3000);