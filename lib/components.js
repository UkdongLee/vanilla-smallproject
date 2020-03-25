var mysql_test = require('../db_con.js')(); // DB connect
var db = mysql_test.db_init();
mysql_test.test_open(db);    

const template = require('./template');
const auth = require('./auth'); // authentication with session

module.exports = {
    // reject됬을 때의 코드도 필요함
    phraseHTML : function(section) {
        return new Promise(function(resolve, reject) {
            db.query(`SELECT * FROM queto_src ORDER BY RAND() LIMIT 1;`, function(error, ranPhrase) {
                if(error) {throw error};
                var phrase = ranPhrase[0].queto;
                var qureyResult = `
                    <div id="${section}">
                        <div id="container">
                            <h2 class="${section}">${phrase}</h2>
                        </div>
                    </div>  
                `;
                resolve(qureyResult);
            });
        });
                       
                /*
                setValue(title);
                   
                nameOfLists = [              // todolist
                    {"section" : "todo", "title" : "TO DO LIST"},
                    {"section" : "doing", "title" : "DOING"},
                    {"section" : "done", "title" : "DONE"}
                ]
                var templateLists = template.templateList(nameOfLists);
                
                */

        // });
    },
    clockHTML : function(section) {
        return `
        <div id="${section}">
            <div id="container">
                <div class="${section}"></div>
            </div>
        </div>
        `
    },
    weatherHTML : function(section) {
        return `
        <div id="${section}">
            <div id="container">
                <div class="${section}"></div>
            </div>.
        </div>
        `
    },
    backgroundPhotoHTML : function(section) {
        return `
        <div id="${section}">
            <div id="container">
                <div class="${section}"></div>
            </div>
        </div>
        `
    },
    greetingHTML : function(section) {
        return `
        <div id="${section}">
            <div id="container">
                <div class="${section}"></div>
            </div>
        </div>
        `
    }
}