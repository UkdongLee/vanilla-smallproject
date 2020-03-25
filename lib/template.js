module.exports = {
    HTML : function(clock, weather, backgroundPhoto, phrase, greeting,
         loginForm, authStatusUI = '<a href="/login">login</a>'){
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
                <div id="wrap">
                    <!-- component -->
                    ${clock}
                    ${weather}
                    ${backgroundPhoto}
                    ${phrase}
                    ${greeting}
                    <!-- login -->
                    <div id="login">
                        <div class="login">
                            ${authStatusUI}
                            ${loginForm}
                            <a href="/signUp">Sign-Up</a>
                        </div>
                    </div>
                    
                    <!-- manage tasks -->
                    <div id="manageTask">
                        <div id="container">
                            
                        </div>
                    </div>
                </div>
                </form>
            </body>
            <script src="/js/clock.js"></script>
            <script src="/js/bg_photo.js"></script>
            <script src="/js/todolist2.js"></script>
            <script src="/js/greeting.js"></script>
            <script src="/js/weather.js"></script>
            </html>
        `;
    },
    templateComponents : function(nameOfComponents) {
        function createComponents(section, title) {
            if(section === "greeting" || section === "queto") {
                return `
                <div id="${section}">
                    <div id="container">
                        <form class="${section}_form">
                            ${i_components(section)}
                        </form>
                        <h2 class="${section}">${title}</h2>
                    </div>
                </div>  
                `;
            } else if (section === "bg_photo", "weather", "clock") {
                return `
                <div id="${section}">
                    <div id="container">
                        <div class="${section}"></div>
                    </div>
                </div>
                `;
            }
            
            function i_components(section) {
                const _input_greeting = `<input type="text" placeholder="이름을 말해주세요."></input>`;
                const _input_queto = `<input type="button" value="button"></input>`;
            
                if(section === "greeting") {
                    return _input_greeting;
                } else if(section === "queto") {
                    return _input_queto;
                }
            }
        }
        var result = ``;
        nameOfComponents.forEach(function(list){
            result += `${createComponents(list.section, list.title)}`
        });
        return result;
    },
    templateList : function(nameOfLists) {
        function createListHTML(section, title) {
            function i_doListHTML(section) {
                const _input = `<input type="text" placeholder="type what you have to do">`;
    
                if(section === 'todo') {
                    return _input;
                } else {
                    return '';
                };
            }
            return `
                <div id="${section}">
                    <div class="${section}_title">
                        <h2>${title}</h2>
                    </div>
                        <form class="${section}_list">
                        ${i_doListHTML(section)}
                        </form>
                        <ul class="${section}_content"></ul>
                </div>
            `;
        }
        var result = ``;
        nameOfLists.forEach(function(list){
            result += `${createListHTML(list.section, list.title)}`
        });
        return result;
    },
    readFile : function(nameOfPackageFile) {
        var fs = require('fs');
        var result = ``;
        nameOfPackageFile.forEach(function(list) {
            var fileContents = fs.readFileSync(list.name, {encoding: 'utf8'});
            console.log(fileContents);
            result = result + fileContents;
        });
        return result;
    },
    templateQueto : function(quetoOfComponent, quetoSrc) {
        return `
        <div id="${quetoOfComponent}">
            <div id="container">
                <form class="${quetoOfComponent}_form">
                </form>
                <h2 class="${quetoOfComponent}">${quetoSrc}</h2>
            </div>
        </div>  
        `;
    },
}