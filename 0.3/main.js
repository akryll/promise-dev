var Q = require("q");
var http = require("http");
var fs = require("fs");
var util = require("util");
var log_file = fs.createWriteStream(__dirname + '/debug.log', {flags : 'w'});
var log_stdout = process.stdout;

console.log2 = function(d) { //
  log_file.write(util.format(d) + '\n');
  //log_stdout.write(util.format(d) + '\n');
};

var httpGet = function (opts,count) {
    	var deferred = Q.defer();
    	setTimeout(function(){
		deferred.notify('Queued');
    	},0);
	
    	try{
    		d = new Date();
    		hh = d.getHours();
    		mm = d.getMinutes();
    		ss = d.getSeconds();
    		start = hh+':'+mm+':'+ss;
    		
		setTimeout(function() {
		deferred.notify('Started');
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
prom_arr = [];
for(var i=0;i<50;i++){
	httpGet('http://eastar.ru',i).then(function (res) {
		fs.writeFile('./log/'+res.count+'.html',res.body, function (err) {
			if (err) throw err;
			console.log2(res.count+'.html - Saved. Start:'+res.start+'    End:'+res.end);

		});
	}, function (err) {
	    // There was an error, and we get the reason for error
	}, function (progress) {
	    console.log2(progress);
	})
	.fail(function(res){
		console.log2(res);
	});
}