var insertedData = {
    "email" : document.loginForm.userId.value,
    "password" : document.loginForm.userPassword.value
}


document.querySelector('#login .login .check').addEventListener('click', function(event) {
    var xhr = new XMLHttpRequest();
        
    xhr.open('POST', '/login_process', true);

    xhr.onreadystatechange = function(){    // 웹 서버로부터 응답이 도착하면 특정한 자바스크립트 함수를 호출하는 기능
        if(xhr.readyState === 4 && xhr.status === 200){
            console.log(xhr.status);
            xhr.setRequestHeader("Content-Type", "application/json;charset=UTF-8");
            xhr.send(JSON.stringify(insertedData)); 
        } 
    }
});

document.querySelector('#login .login .check').addEventListener('click', function(event) {
    var xhr = new XMLHttpRequest();

        xhr.open('GET', '/login', true);
        xhr.onreadystatechange = function(){
            if(xhr.readyState === 4 && xhr.status === 200){
                var signUp = document.querySelector('#login .login .target');
                signUp.innerHTML = '잘못된 아이디나 비밀번호를 입력하셨습니다.'
            }
        }
        xhr.send();
});

/*
코드 실행되는 순서

1.사용자의 이벤트가 발생하면 이벤트 처리 함수를 호출한다.

2.이벤트 처리 함수에서는 XMLHttpRequest 객체의 send() 함수를 호출한다.

3. XMLHttpRequest 객체의 send() 함수가 호출되면 웹 서버에 요청이 전송된다.

4.웹 서버는 알맞게 처리한 뒤 응답 결과를 XMLHttpRequest에 전송한다.

5.XMLHttpRequest 객체에 응답이 도착하면 onreadystatechange 프로퍼티에 지정한 콜백 함수를 호출한다.
*/
