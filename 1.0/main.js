"use strict";
var Promise = require("bluebird");
var http = require('http');
var fs = require("fs");
var async = require('asyncawait/async');
var await = require('asyncawait/await');

var city_list = [
	'819827',
	'524901',
	'1271881',
	'1283240',
	'703448',
	'1282898',
	'3632308',
	'1273294',
	'502069',
	'3645532',
	'529368',
	'462755',
	'502018',
	'538601',
	'463355',
	'560756',
	'509820',
	'498817',
	'547560',
	'1496747',
	'709717',
	'555746',
	'712969',
	'569591',
	'532477',
	'471457',
	'711660',
	'564719',
	'564912',
	'571557'
];

/*
var city_list = [
	'819827',
];
*/
function delay() {
    return Promise.delay(Math.random(1, 5) * 10000);
}

var ajaxGetAsync = async(function(url) {
	await(delay());
	var get = new Promise(function(resolve,reject){
		var req = http.get(url, function(res) {
			//console.log('headers:\n' + JSON.stringify(res.headers));
			res.setEncoding('utf8');
			res.on('data', function(chunk){
				var data = JSON.parse(chunk);
				var filename = './city/'+data.name+'.json';
				fs.writeFile(filename,chunk, function (err) {
					if (err) throw err;
					//console.log(data.name+' Saved!');
					var response = {
						msg: data.name+' Saved!',
						filename: filename,
						url:url
					}
					resolve(response);
				});
			});
			res.on('error',reject);
		});

	});

	return await(get);
});
var runner  = function(){
	var awaits = [];
	city_list.forEach(function(value,key){
		var test = ajaxGetAsync('http://api.openweathermap.org/data/2.5/weather?id='+value);
		awaits.push(test);
		test.then(function(res){console.log(res.msg);}).catch(function(err){});
	});

	Promise.settle(awaits).then(function(results) {
		var savelog = [];

		results.forEach(function(value,key){
			var r = value;
			if (r.isFulfilled()) {  // check if was successful
				savelog.push(r.value());
			} else if (r.isRejected()) { // check if the read failed
				savelog.push(r.reason()); //reason
			}
		});

		var jsavelog = JSON.stringify(savelog);
		var filename = 'worklog.json';
		fs.writeFile(filename,jsavelog, function (err) {
			if (err) throw err;
			console.log('Log saved: '+ filename);
		});

		console.log(' ');
		console.log(' ');
		console.log('All done!');

	});
};


runner();

console.log('start');
