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
    var section = 'phrase';
    components.phraseHTML(section).then(function(qureyResult) {
        console.log(qureyResult);
    });
    var HTML = template.HTML("qureyResult");
    res.send(HTML);
});

var authData = {        // for test
    email: 'lklone2005@gmail.com',
    passowrd: '111111',
    nickname: 'dave'
}

var obj_authForm = {
    login_action: '/login_process',
    signUp_action: '/signUp_process',
    errorMent: `<p>중복된 이메일 입니다</p>.`,
    nickname: `<p><input type="nickname" name="nickname" placeholder="nickname"></p>`,
    login_value: 'Login',
    signUp_value: 'Confirm'
};

app.get('/login', (req, res, next) => {
    var path = req.path;
    var authForm = templateForAuth.authForm(obj_authForm, path);
    var authTemplate = templateForAuth.authHTML(authForm);
    res.send(authTemplate);
});

app.get('/signUp', (req, res, next) => {
    var path = req.path;
    var signUpForm = templateForAuth.authForm(obj_authForm, path);
    var authTemplate = templateForAuth.authHTML(signUpForm);
    res.send(authTemplate);
})

app.post('/signUp_process', (req, res, next) => {      // 똑같은 email이 올 경우 다른걸로 해달라는 요청 필요하다.
    var path = req.path;
    var post = req.body;         // used body-parser
    var email = post.email;
    var password = post.password;
    var nickname = post.nickname;
 
    db.query(
        `INSERT INTO Authentication (mem_email, mem_password, mem_nickname)
        VALUES (?, ?, ?)`, [email, password, nickname], function(err, result) {
            if(err) {
                res.end('중복된 이메일 입니다.')
                /*
                err - Cannot set headers after they are sent to the client
                var signUpForm = templateForAuth.authForm(obj_authForm, path);
                var authTemplate = templateForAuth.authHTML(signUpForm);
                res.send(authTemplate);
                */
            }; 
        res.redirect(`/`);
    });
    // if(email === 'lklone2005@gmail.com'){
    // req.session.is_logined = true;
    // req.session.nickname = authData.nickname;
    //     req.session.save(function() {
    //         res.redirect(`/`);
    //     })
    // } else {
    //     res.end('Who the fuck are you?');
    // }
});

app.post('/login_process', (req, res, next) => {  
    var post = req.body;         // used body-parser
    var email = authData.email;
    var password = authData.passowrd;
    var nickname = authData.nickname;

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
*/


 /*  This code not working, but why?
    if(email === null || password === null || nickname === null) {
        alert('공백 없이 입력해주시기 바랍니다.')    
        return false;                    
    }
*/ 