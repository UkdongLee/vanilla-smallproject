module.exports = {
    authHTML : function(authForm){
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset = "utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Web application</title>
                <link rel="stylesheet" href="/css/style.css" type="text/css">
                <link rel="stylesheet" href="/css/reset.css" type="text/css">
            </head>
            <body>
                ${authForm}
            </body>
            <script src="/js/clock.js"></script>
            <script src="/js/bg_photo.js"></script>
            <script src="/js/todolist2.js"></script>
            <script src="/js/greeting.js"></script>
            <script src="/js/weather.js"></script>
            </html>
        `;
    },
    authForm : function(obj_authForm, path) {  
        if(path === '/login' ) {      
            return `
            <form action=${obj_authForm.login_action} method="post">
                <p><input type="text" name="email" placeholder="email"></p>
                <p><input type="password" name="password" placeholder="password"></p>
                <p><input type="submit" value=${obj_authForm.login_value}></p>
            </form>
            <a href="/signUp">Sign-Up</a>
        `;
        } else if(path === '/signUp') {
            return `
            <form action=${obj_authForm.signUp_action} method="post">
                <p><input type="text" name="email" placeholder="email"></p>
                <p><input type="password" name="password" placeholder="password"></p>
                ${obj_authForm.nickname}
                <p><input type="submit" value=${obj_authForm.signUp_value}></p>
            </form>
            `;
        } 
    }
}