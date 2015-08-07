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
	
function ajaxGetAsync(url) {
	return new Promise(function (resolve, reject) {
		setTimeout(function() {
			var req = http.get(url, function(res) {
				//console.log('headers:\n' + JSON.stringify(res.headers));
				res.setEncoding('utf8');
				res.on('data', resolve);
				res.on('error',reject);
			});
		}, Math.random(1, 5) * 1000);
	})
	.then(function (chunk) {
		data = JSON.parse(chunk);
		fs.writeFile('./city/'+data.name+'.json',chunk, function (err) {
			if (err) throw err;
			console.log(data.name+' Saved!');
		});
	})
	.catch(function(e) {
		console.log(e);
	});
};

var runner = async(function(result){
		city_list.forEach(function(value,key){
			ajaxGetAsync('http://api.openweathermap.org/data/2.5/weather?id='+value);
		});
		return result;
});
runner('Test')
.then(function(result){
	console.log(result)
});
console.log('start');