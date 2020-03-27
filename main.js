const express = require('express');
const app = express();
const port = 3000;

var mysql_test = require('./db_con.js')(); // DB connect
var db = mysql_test.db_init();
mysql_test.test_open(db);          

const cookie = require('cookie');   // cookie
const auth = require('./lib/auth'); // authentication with session

// template
const template = require('./lib/template');
const templateForAuth = require('./lib/templateForAuth')
const components = require('./lib/components');

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
    /*
    var section = 'phrase';
    components.phraseHTML(section).then(function(qureyResult) {
        var componentsTemplate = template.HTML(qureyResult);
        res.send(componentsTemplate);
    });
    */

    //  phrase
    var async = async function(req, res, section) { 
        var phrase = await components.phraseHTML(section);

        //  clock
        var clock = components.clockHTML('clock');
        //  weather
        var weather = components.weatherHTML('weather');
        //  backgroundPhoto
        var backgroundPhoto = components.backgroundPhotoHTML('bg_photo');
        //  greeting(정적파일 수정필요)
        var greeting = components.greetingHTML('greeting');
        //  todoList
        var todoList = components.todoListHTML('todo', 'TO DO LIST');
        //  doList
        var doingList = components.doingListHTML('doing', 'DOING');
        //  doneList
        var doneList = components.doneListHTML('done', 'DONE');


        var test = template.HTML(
            clock, 
            weather, 
            backgroundPhoto, 
            phrase, 
            greeting,
            todoList,
            doingList,
            doneList
        ); 
        res.write(test);
        res.end()
    }
    async(req, res, 'phrase');
});

var obj_authForm = {
    login_action: '/loginProcess',
    signUp_action: '/signUpProcess',
    errorMent: `<p>중복된 이메일 입니다</p>.`,
    nickname: `<p><input type="nickname" name="nickname" placeholder="nickname"></p>`,
    login_value: 'Login',
    signUp_value: 'Confirm'
};

app.get('/login', (req, res, next) => {         // Request Method : 304
    var path = req.path;
    var authForm = templateForAuth.authForm(obj_authForm, path);
    var authTemplate = templateForAuth.authHTML(authForm);
    res.send(authTemplate);
});

app.post('/loginProcess', (req, res, next) => {  
    var email = req.body.userId;
    var password = req.body.userPassword;
    console.log("Information received !");

    db.query('SELECT mem_email, mem_password FROM Authentication', function(err, result) {
        if(err) {throw err}

            var emailFromDB = result[0].mem_email;  
            var passwordFromDB = result[0].mem_password + "";       // convert int -> string

            if(email === emailFromDB && password === passwordFromDB) {
                req.session.is_logined = true;
                req.session.save(() => {
                    res.redirect(`/`);
                });
            } else {
                res.status(204);
                res.end(); 
            }
    });
});

app.get('/signUp', (req, res, next) => {
    var path = req.path;
    var signUpForm = templateForAuth.authForm(obj_authForm, path);
    var authTemplate = templateForAuth.authHTML(signUpForm);
    res.send(authTemplate);
});

app.post('/signUpProcess', (req, res, next) => {
    var email = req.body.newId;
    var password = req.body.newPassword;
    var nickname = req.body.newNickname;

    db.query('SELECT * FROM Authentication WHERE mem_email = ?', [email], function(err, results) {
    if(err) {throw err}
        if(results[0] === undefined) {
            db.query(
                `INSERT INTO Authentication (mem_email, mem_password, mem_nickname)
                VALUES (?, ?, ?)`, [email, password, nickname], function(err, result) {
                    if(err) {throw err}
                        req.session.is_logined = true;
                        req.session.nickname = nickname;
                        req.session.save(() => {
                        res.redirect('/');
                    });
            });
        } else if(email === results[0].mem_email) {
            res.status(204);
            res.end(); 
        } else {
            res.send({
                "code": 400,
                "failed": "error ocurred"
            });
        }
    });
});

app.get('/logout', (req, res, next) => {    // this is not post, just get
    req.session.destroy(function(err) {
        if(err) {

        }
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

 /*  This code not working, but why?
    if(email === null || password === null || nickname === null) {
        alert('공백 없이 입력해주시기 바랍니다.')    
        return false;                    
    }
*/ 