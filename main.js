const express = require('express');
const app = express();
const port = 3000;

const path = require('path');

const template = require('./lib/template');
const dataSrc = require('./lib/dataSrc')

app.use(express.static('public'));

// Get queto asynchronous using Promise() ============
function getQuetoFromDB(callback) {
  return new Promise(function(resolve, reject) {
    dataSrc.quetoSen(function(response) {
      resolve(response);
    });
  });
}
// ===================================================

app.get('/', (req, res, next) => {
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
    {"section" : "queto", "title" : ''}
  ]

  // var Q = template.templateQueto('queto', )

// Origin code ====================================
// dataSrc.quetoSen(function(callback) {
//   console.log(callback);
// });
// ================================================

// Modified code ==================================
var q = "";
getQuetoFromDB().then(function(queto) {
  q = queto;
})
console.log(q);
// ================================================

  var components = template.templateComponents(nameOfComponents);
  var templateHTML = template.templateHTML(components, templateLists);

  res.send(templateHTML);
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
})
