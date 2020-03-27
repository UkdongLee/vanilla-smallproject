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
            <script type="text/javascript" src="/ajax/ajax.js"></script>
            </html>
        `;
    },
    authForm : function(obj_authForm, path) {  
        if(path === '/login' ) {      
            return `
            <div id="login">
                <div class="login">
                    <form class="loginForm" name="loginForm" action=${obj_authForm.login_action} method="post">
                        <p><input class="id" name="userId" type="text" placeholder="email"></p>
                        <p><input class="password" name="userPassword" type="password" placeholder="password"></p>
                        <p><input class="loginBtn" name="loginBtn" type="submit" value=${obj_authForm.login_value}></p>
                    </form>
                    <p class="errMent"></p>
                    <a href="/signUp">Sign-Up</a>
                </div>
            </div>
        `;
        } else if(path === '/signUp') {
            return `
            <div id="signUp">
                <div class="signUp">
                    <form class="signUpForm" name="signUpForm" action=${obj_authForm.signUp_action} method="post">
                        <p><input class="id" name="newId" type="text" placeholder="email"></p>    
                        <p><input class="password" name="newPassword" type="password" placeholder="password"></p>
                        <p><input class="nickname" name="newNickname" type="nickname" placeholder="nickname"></p>
                        <p><input class="submitBtn" name="submitBtn" type="submit" value=${obj_authForm.signUp_value}></p>
                    </form>
                    <p class="errMent"></p>
                </div>
            </div>
            `;
        } 
    }
}