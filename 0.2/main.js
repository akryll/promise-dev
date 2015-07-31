var Q = require("q");
var http = require("http");
var fs = require("fs");

var httpGet = function (opts,count) {
    	var deferred = Q.defer();
    	try{
    		d = new Date();
    		hh = d.getHours();
    		mm = d.getMinutes();
    		ss = d.getSeconds();
    		start = hh+':'+mm+':'+ss;
		setTimeout(function() {
		     http.get(opts,function(res){
			body = '';
			res.on('data', function(chunk) {
				body += chunk;
			});

			res.on('end', function() {
		    		dd = new Date();
		    		hhh = dd.getHours();
		    		mmm = d.getMinutes();
		    		sss = dd.getSeconds();
		    		end = hhh+':'+mmm+':'+sss;
				deferred.resolve({body:body,count:count,start:start,end:end});
			});
		     }).on("error", deferred.reject);
		     //console.log(count);
	 	}, Math.random(1, 5) * 100000);
	} catch (error) {deferred.reject(error);}
	return deferred.promise;
};
for(var i=0;i<50;i++){
	httpGet('http://eastar.ru',i).then(function (res) {
		fs.writeFile('./log/'+res.count+'.html',res.body, function (err) {
			if (err) throw err;
			console.log(res.count+'.html - Saved. Start:'+res.start+'    End:'+res.end);

		});
	}, function (err) {
	    // There was an error, and we get the reason for error
	}, function (progress) {
	    console.log(progress);
	})
	.fail(function(res){
		console.log(res);
	});
}
//Native Promise
/*
require('es6-promise').polyfill();

var copyProfile = new Promise(function(resolve, reject) {
    console.log('copy profile command sent');

    // copy profile "async" function
    setTimeout(function() {
        var msg = 'Profile copy ok';
        resolve(msg);
    }, Math.random() * 2000 + 1000);
});

var changeProfileFreq = new Promise(function(resolve, reject) {
    console.log('change frequencies command sent');

    // change frequencies "async" function
    setTimeout(function() {
        var msg = 'frequencies change ok';
        resolve(msg);
    }, Math.random() * 2000 + 1000);
});

var testPromise = function() {
    copyProfile.then(function(msg) {
        console.log(msg);
        changeProfileFreq.then(function(msg) {
            console.log(msg);
            console.log('Frequencies changed');
        });
    });
};

testPromise();
*/