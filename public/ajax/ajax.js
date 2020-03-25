document.querySelector('#login .login .loginForm').addEventListener('submit', function(event) {
    console.log('this is ajax')
    var httpRequest = new XMLHttpRequest();

    httpRequest.onreadystatechange = function(){
        httpRequest.open('POST', 'http://localhost:3000/login_process', true);
    
        httpRequest.onreadystatechange = function(){
            if(httpRequest.readyState === 4 && httpRequest.status === 403){
                var signUp = document.querySelector('#login .login .loginForm p');
                signUp.innerHTML = '잘못된 아이디나 비밀번호를 입력하셨습니다.'
            }
        }
        httpRequest.send();
    };
});


