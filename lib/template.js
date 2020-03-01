module.exports = {
    templateHTML : function(templateComponents, templateLists){
        return `
            <!DOCTYPE html>
            <html lang="en">
            <head>
                <meta charset = "utf-8">
                <meta name="viewport" content="width=device-width, initial-scale=1.0">
                <meta http-equiv="X-UA-Compatible" content="ie=edge">
                <title>Web application</title>
                <link rel="stylesheet" href="style.css" type="text/css">
            </head>
            <body>
                <!-- component -->
                ${templateComponents}

                <!-- manage tasks -->
                <div id="manageTask">
                ${templateLists}
                </div>
            </body>
            <script src="clock.js"></script>
            <script src="bg_photo.js"></script>
            <script src="todolist2.js"></script>
            <script src="greeting.js"></script>
            <script src="quetoSrc.js"></script>
            <script src="queto.js"></script>
            <script src="weather.js"></script>
            </html>
            `
    },
    templateComponents : function(nameOfComponents) {
        function parts2HTML(section, title) {
            if(section === "greeting", "queto") {
                return `
                <article id="${section}">
                    <form class="${section}_form">
                        ${i_parts2HTML(section)}
                    </form>
                    <h2 class="${section}">${title}</h2>
                </article>  
                `;
            } else if (section === "bg_photo", "weather", "clcok") {
                return `
                <article id="${section}">
                    <div class="${section}"></div>
                </article>
                `;
            }
            
            function i_parts2HTML(section) {
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
            result += `${parts2HTML(list.section, list.title)}`
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
                <div class="${section}">
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
    }
    
}