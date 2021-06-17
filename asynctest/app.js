const async = require('async');

const startTime = new Date().getTime();

async.parallel([
    (callback) => {
        setTimeout(() => {
            console.log('one');
            callback(null, '1');
        }, 2000);
    },
    (callback) => {
        setTimeout(() => {
            console.log('two');
            callback(null, '2');
        }, 1000);
    },
    (callback) => {
        setTimeout(() => {
            console.log('three');
            callback(null, '3');
        }, 3000);
    }
], (error, results) => {
    console.log(results, 'in ', new Date().getTime() - startTime, 'ms');
});