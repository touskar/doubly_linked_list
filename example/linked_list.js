let manager = require('../lib/doubly_linked_list.js');

let CDLinkedList = manager.CDLinkedList;
let Cursor = manager.Cursor;
let Cellule = manager.Cellule;
let fs = require('fs');
let util = require('util');


function bench(interval, time){

    function benchA(length){
        let startA = process.hrtime();
        let a = new CDLinkedList();
        for(let i = 0; i < length;i++)
        {
            a.push({index:i});
        }
        for(let i = 0; i < length;i++)
        {
            a.shift();
        }

        let endA = process.hrtime(startA);
        console.info("Execution time (hr) of CDLinkedList: %ds %dms", endA[0], endA[1]/1000000);
        return endA;
    }

    function benchB(length){
        let startB = process.hrtime();
        let b = new Array();
        for(let i = 0; i < length;i++)
        {
            b.push({index:i});
        }
        for(let i = 0; i < length ;i++)
        {

            b.shift();
        }

        let endB = process.hrtime(startB);

        console.info("Execution time (hr) of Array: %ds %dms", endB[0], endB[1]/1000000);
        return endB;
    }

    interval = Number(interval) || 10000;
    time = Number(time) || 10;

    let benchOut = {};
    let length = interval;
    try {
        fs.mkdirSync('./tmp');
    } catch (e) {
    }

    for(let i = 0; i < time;i++)
    {
        console.log(`Length :${length}`);
        let bA = benchA(length);
        let bB = benchB(length);
        let result = {
            benchA:{
                s:bA[0],
                ms:bA[1]/1000000
            },
            benchB:{
                s:bB[0],
                ms:bB[1]/1000000
            }
        };

        benchOut[length] = result;

        let out = {};
        out[length] = result;
        result = JSON.stringify(out) + '\n';

        fs.appendFileSync(`tmp/benchmark.log`, result);

        length += interval;
    }

    return benchOut;
}

bench()
