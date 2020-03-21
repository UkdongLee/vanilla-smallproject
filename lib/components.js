var mysql_test = require('../db_con.js')(); // DB connect
var db = mysql_test.db_init();
mysql_test.test_open(db);    

const template = require('./template');
const auth = require('./auth'); // authentication with session

module.exports = {
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
        

        // db.query(`SELECT count(*) FROM queto_src`, function(error, NumOfPhrase) {
        //     if(error) {throw error};
        //     var randNum = Object.values(NumOfPhrase[0])[0];
        //     var ranNum = Math.floor(Math.random() * randNum);
        
        //     db.query(`SELECT * FROM queto_src WHERE id = ?`,[ranNum], function(error, ranPhrase) {
        //         // var setValue = [];
        //         if(error) {throw error};
        //         console.log("this is in query!");
        //         console.log(fuck);
        //         console.log("this is in query!");
        //         var phrase = ranPhrase[0].queto;


                // _this = `
                // <div id="${section}">
                //     <div id="container">
                //         <h2 class="${section}">${phrase}</h2>
                //     </div>
                // </div>  
                // `;

                
                
                /*
                setValue(title);
                
                
                nameOfLists = [              // todolist
                    {"section" : "todo", "title" : "TO DO LIST"},
                    {"section" : "doing", "title" : "DOING"},
                    {"section" : "done", "title" : "DONE"}
                ]
                var templateLists = template.templateList(nameOfLists);
               
                // 읽는다, 비동기로 처리되기때문에 리턴이 말이안됨
                
                nameOfComponents = [         // another components
                    {"section" : "bg_photo", "title" : ""},
                    {"section" : "greeting", "title" : ""},
                    {"section" : "clock", "title" : ""},
                    {"section" : "weather", "title" : ""},
                    {"section" : "queto", "title" : `${pickedQueto}`}
                ]
                
                var components = template.templateComponents(nameOfComponents);
                var templateHTML = template.templateHTML(components,
                    templateLists,
                    false,
                    auth.StatusUI(req, res)
                );
                  res.send(templateHTML);
                */
        //     }); 

        // });
    }
}