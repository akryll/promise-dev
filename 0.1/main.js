var Q = require("q");
var http = require("http");
var fs = require("fs");
var server = require("./server");
var router = require("./router");

server.start(router.route);

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
	})
	.fail(function(res){
		console.log(res);
	});
}