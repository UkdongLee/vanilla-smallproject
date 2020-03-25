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

        var test = template.HTML(clock, weather, backgroundPhoto, phrase, greeting); 
        res.write(test);
        res.end()
    }
    async(req, res, 'phrase');
});

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

app.post('/login_process', (req, res, next) => {  
    var post = req.body;         // used body-parser
    var email = post.email;
    var password = post.password;
    // var nickname = post.nickname;

    db.query('SELECT mem_email, mem_password FROM Authentication', function(err, result) {
        if(err) {throw err}
            if(email === result[0].mem_email && password === result[0].password) {
                req.session.is_logined = true;
                req.session.save(() => {
                    res.redirect(`/`);
                });
            } else {

                res.redirect(`/login`);
            
            }
    });
});

app.get('/searching', function(req, res){

    // input value from search
    var val = req.query.search;
   //console.log(val);
   
   // url used to search yql
   var url = "";
   console.log(url);
   
    // request module is used to process the yql url and return the results in JSON format
    request(url, function(err, resp, body) {
      body = JSON.parse(body);
      // logic used to compare search results with the input from user
      if (!body.query.results.RDF.item) {
        craig = "No results found. Try again.";
      } else {
       craig = body.query.results.RDF.item[0]['about'];
      }
    });
   
     // pass back the results to client side
     res.send(craig);
   
     // testing the route
     // res.send("WHEEE");
   
   });

app.get('/signUp', (req, res, next) => {
    var path = req.path;
    var signUpForm = templateForAuth.authForm(obj_authForm, path);
    var authTemplate = templateForAuth.authHTML(signUpForm);
    res.send(authTemplate);
})

app.post('/signUp_process', (req, res, next) => {      // 똑같은 email이 올 경우 다른걸로 해달라는 요청 필요하다.
    var path = req.path;
    var post = req.body;  
    var email = post.email;
    var password = post.password;
    var nickname = post.nickname;
 
       // acutally this's for signup
    db.query('SELECT * FROM Authentication WHERE mem_email = ?', [email], function(err, results) {
    if(err) {throw err}
        if(email !== results[0].mem_email) {
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
        } else {
            // 회원가입 이메일과 데이터베이스에 저장된 이메일이 같다면 ajax?
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