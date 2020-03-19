const express = require('express');
const app = express();
const port = 3000;

var mysql_test = require('./db_con.js')(); // DB connect
var db = mysql_test.db_init();
mysql_test.test_open(db);          

const cookie = require('cookie');   // cookie
const auth = require('./lib/auth'); // authentication with session
const template = require('./lib/template');

// get middle ware
var bodyParser = require('body-parser'); 
var cookieParser = require('cookie-parser');
var session = require('express-session')
var FileStore = require('session-file-store')(session)

// middle ware usage
app.use(express.static('./public'));      // read static files
app.use(bodyParser.urlencoded({ extended: false}));     // req info parser
app.use(session({
    httpOnly : true,     
    secure: true,     
    secret: 'adsflk!@$#!@%$a23',   
    resave: false,        
    saveUninitialized: true,
    store: new FileStore()
}))     

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
            
            var components = template.templateComponents(nameOfComponents);
            var templateHTML = template.templateHTML(components,
                templateLists,
                false,
                auth.StatusUI(req, res)
            );
              res.send(templateHTML);
        }); 
    });
});

var authData = {        // for test
    email: 'lklone2005@gmail.com',
    passowrd: '111111',
    nickname: 'dave'
}

app.get('/login', (req, res, next) => {  
    nameOfComponents = [         // another components
        {"section" : "bg_photo", "title" : ""},
        {"section" : "greeting", "title" : ""},
        {"section" : "clock", "title" : ""},
        {"section" : "weather", "title" : ""}
    ]
    var components = template.templateComponents(nameOfComponents);
    var loginForm = `
        <form action="/login_process" method="post">
            <p><input type="text" name="email" placeholder="email"></p>
            <p><input type="password" name="password" placeholder="password"></p>
            <p><input type="submit" value="login"></p>
        </form>
    `
    var templateHTML = template.templateHTML(components, false, loginForm);

    res.send(templateHTML);
});

app.post('/login_process', (req, res, next) => {  
    var post = req.body;         // used body-parser
    var email = authData.email;
    var password = authData.passowrd;

    if(email === 'lklone2005@gmail.com' && password === '111111'){
        req.session.is_logined = true;
        req.session.nickname = authData.nickname;
        req.session.save(function() {
            res.redirect(`/`);
        })
        
    } else {
        res.end('Who the fuck are you?');
    }
    
});

app.get('/logout', (req, res, next) => {    // this is not post, just get
    req.session.destroy(function(err) {
        if(err) {throw err}
        res.redirect(`/`);
    });
});

app.listen(port, () => {
  console.log(`Server is running at ${port}`);
})

/*
if not login, cant post anthing
    if(!auth.isOwner(req, res)) {
        alert('who the fuck are you?')
        res.redirect('/');
        retrun false;
    }
*/