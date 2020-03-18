const express = require('express');
const app = express();
const port = 3000;

var mysql_test = require('./db_con.js')();
var db = mysql_test.db_init();
mysql_test.test_open(db);          // DB con

const cookie = require('cookie');
const template = require('./lib/template');


// middle ware
app.use(express.static('public'));      // read static files

var bodyParser = require('body-parser');    
app.use(bodyParser.urlencoded({ extended: false}));     // req info parser

var cookieParser = require('cookie-parser');

function authOfOwner(req, res) {
    var isOwner = false;        // 쿠키가 있을 때(로그인 했을 때) ture값으로 전환
    var cookies = {};
    if(req.headers.cookie) {
        cookies = cookie.parse(req.headers.cookie);
    }
    if(cookies.email === 'lklone2005@gmail.com' && cookies.password === '111111') {
        isOwner = true;
    }
        return isOwner;
}

function authStatusUI (req, res) {
    var authStatusUI = '<a href="/login">login</a>'
    if(authOfOwner(req, res)) {     // check a login status 
        authStatusUI = '<a href="/logout_process">logout</a>'
    }
    return authStatusUI;
}

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
                authStatusUI(req, res)
            );
            
              res.send(templateHTML);
        }); 
    });
});

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
            <p><input type="submit"></p>
        </form>
    `
    var templateHTML = template.templateHTML(components, false, loginForm);

    res.send(templateHTML);
});

app.post('/login_process', (req, res, next) => {  
    var post = req.body;         // used body-parser
    console.log(post);

    if(post.email === 'lklone2005@gmail.com' && post.password === '111111'){
        res.writeHead(302, {
            'Set-Cookie':[
                `email=${post.email}`,
                `password=${post.password}`,
                `nickname=dave`
            ],
            Location: `/`
        });
        // res.append('Set-Cookie', 'foo=bar; Path=/; HttpOnly')
        // res.append('Set-Cookie', [
        //     `email=${post.mail}`,
        //     `password=${post.password}`,
        //     `nickname=dave`,
        //     'path=/;'
        // ]);
        res.end();
    } else {
        res.end('Who the fuck are you?');
    }
    
});

app.get('/logout_process', (req, res, next) => {    // post가 아니라 get방식이다. 
    res.writeHead(302, {
        'Set-Cookie':[
            `email=; Max-Age=0`,
            `password=; Max-Age=0`,
            `nickname=; Max-Age=0`
        ],
        Location: `/`
    });
    res.end();
});


app.listen(port, () => {
  console.log(`Server is running at ${port}`);
})

