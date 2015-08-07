var Promise = require("bluebird");
var fs = Promise.promisifyAll(require("fs"));
// map array into array of promises
var files = ['1.txt', '2.txt'].map(function(fileName) {
    return fs.readFileAsync(fileName, "utf8").then(function(){console.log('test');});
});
console.log(files);
Promise.settle(files).then(function(results) {
    console.log(results);
    var r = results[0];
    if (r.isFulfilled()) {  // check if was successful
        console.log(r.value()); // the promise's return value
        r.reason(); // throws because the promise is fulfilled
    }
});