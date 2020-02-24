// 문제해결능력 - 이것저것 보다가 삼천포로 빠지지말고 문제를 정확히 표기한다음 순차적으로 해결해 나갈 것
//             표기할때는 종이에 목표 1 이렇게 쓰자. 목표 1을 해결하기 위한 방법으로 여러가지를 학습할 것 
//             이 때 학습한 것은 표기해놓고 공부 끝날 때 정리해서 노션에 업데이트 시켜놓도록 

const manageTask = document.querySelector("#manageTask");           

const todo_list = manageTask.querySelector(".todo_list");           // get todo
const typedText = todo_list.querySelector("input");
const todo_content = manageTask.querySelector(".todo_content");

const doing_list = manageTask.querySelector(".doing_list");         // get doing
const doing_content = manageTask.querySelector(".doing_content");   

const done_list = manageTask.querySelector(".done_list");           // get done
const done_content = manageTask.querySelector(".done_content");


function manageBtn(thisCon) {
    const targetBtn = event.target;
    const targetList = targetBtn.parentNode;
    const deletedText = thisCon.querySelector("li span").textContent; // this is problem

    thisCon.removeChild(targetList);
    
    if (thisCon === todo_content) {
        attachList(doing_content, deletedText);
    } else if (thisCon === doing_content) {
        attachList(done_content, deletedText);
    }
}

function attachList(content, text = null) {           
    const li = document.createElement("li");
    const button = document.createElement("button");
    const span = document.createElement("span");

    if(text) {
        content.appendChild(li);
        li.appendChild(button);
        li.appendChild(span);

            if(content === todo_content) {
                button.innerText = "START"
            } else if (content === doing_content) {
                button.innerText = "DONE"
            } else if (content === done_content) {
                button.innerText = "DELETE"
            } else { 
            return false;
        }
    } 

    span.innerText = text;
    
    button.addEventListener("click", function() {
        manageBtn(content)
    })  
}

function submitHandler(event) {
    event.preventDefault();
    const currentVal = typedText.value;
    attachList(todo_content, currentVal);
    typedText.value = "";
}

function init() {
    todo_list.addEventListener("submit", submitHandler);
}


init();


















































// function delButton(butName){
//     const targetBut = event.target;            // content <button>
//     const targetCon = targetBut.parentNode;   // content <li>
    
//     todo_content.removeChild(targetCon);
//     const deletedText = targetCon.querySelector("span").textContent;

//     if(butName === "Start!"){
//         appendElement(doing_content, deletedText);           
//     } else {
//         appendElement(done_content, deletedText); 
//     }
// }

// function createbutton(targetList, newButton, butName) {
//     targetList.appendChild(newButton);
//     newButton.innerText = butName;

//     newButton.addEventListener("click", function() {
//         delButton(butName);
//         targetList.removeChild(newButton);
//     });

// }

// function appendElement(content, text) { // todo_content, currentVal
//     const li = document.createElement("li");
//     const button = document.createElement("button");
//     const span = document.createElement("span");

//     // create list item
//     content.appendChild(li);
    
//     // create Start! butten
//     createbutton(li, button, "Start!");
   
//     // create Finished button
//     // createbutton(li, xButton, "Finished");

//     // create span
//     li.appendChild(span);
//     span.innerText = text;
// }

// // function showtypedvalue(text) {
// //     const li = document.createElement("li");
// //     const button = document.createElement("button");
// //     const span = document.createElement("span");

// //     doList.appendChild(li);
// //     li.appendChild(button);
// //     button.addEventListener("click", delButton);
// //     li.appendChild(span);

// //     button.innerText = "X";
// //     span.innerText = text;

// //     const pushItem = arrOfList.push(text); 
// //     saveArr(pushItem);
// // }

// function submitHandler(event) {
//     event.preventDefault();
//     const currentVal = typedText.value;
//     appendElement(todo_content, currentVal);
//     typedText.value = "";
//     console.log('this is init');
// }

// function init() {
//     todo_list.addEventListener("submit", submitHandler);
// }

// init();

// // 처음 DO LIST에 들어간 데이터는 ENTER 후 제대로 잘 동작하지만 두번째로 들어간 데이터는 초기화도 안되고 DOING으로 바로 넘어감.