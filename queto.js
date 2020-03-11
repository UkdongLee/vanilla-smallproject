const queto = document.querySelector("#queto");
const queto_input = queto.querySelector("input");
const quetoSen = queto.querySelector(".queto");

// import { db_init } from './db_con.js';
// import { test_open } from './db_con.js';
// var getDB = info;

// import * as mysqlDB from './db_con.js';
// var getDB = mysqlDB.db_init();
// mysqlDB.test_open(getDB);

// import { test_open } from './db_con.js';
// getDB.query(`SELECT count(*) FROM queto_src`, function(error, length) {
//         if(error) {throw error};
//         console.log(length);
//     });


/*
 var mysql_test = require('./db_con.js')();
 var getDb = mysql_test.init();
 mysql_test.test_open(getDb); 
*/
 
function gotQueto(data) {
    return data;
}


function getLengthOfQueto() {
    // getDb.query(`SELECT count(*) FROM queto_src`, function(error, length) {
    //     if(error) {throw error};
    //     console.log(length);
    // });
}

function getQuetoFromDB() {
    console.log("getQuetoFromDB");
    // var ranNum = genNum();

    // getDb.query(`SELECT len FROM queto_src WHERE id = ?`,[ranNum], function(error, quetos) {
    //     if(error) {throw error};
    //     paintQueto(quetos);
    //   });
}

function paintQueto(quetos) {
    quetoSen.innerHTML = quetos.queto;
}

function genNum() {
    return Math.floor(Math.random() * getLengthOfQueto());
}

function init() {
    queto_input.addEventListener("click", getQuetoFromDB);
}

init();


