/*
var Promise = require("bluebird");
var http = require('http');
var fs = require("fs");

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
	}, Math.random(1, 5) * 100000);
    });
};

function runner(){
	city_list.forEach(function(value,key){

		ajaxGetAsync('http://api.openweathermap.org/data/2.5/weather?id='+value)
		.then(function (chunk) {
			data = JSON.parse(chunk);
			fs.writeFile('./city/'+data.name+'.json',chunk, function (err) {
				if (err) throw err;
				console.log(data.name+' Saved!');

			});
		}).catch(function(e) {
		    console.log(e);
		});
	});

};
runner();
*/

var async = require('asyncawait/async');
var await = require('asyncawait/await');
var Promise = require('bluebird');
var http = require('http');
var fs = require("fs");


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
function delay(milliseconds) {
    return Promise.delay(milliseconds);
}

var getCity = async (function (url) {
	var resz;
	await(delay(Math.random(1, 5) * 100000));
	res = await(http.get(url,function(res){return res;}));
	//console.log('headers:\n' + JSON.stringify(res.headers));
	resz = res;
	return resz;
});
function runner(){

	city_list.forEach(function(value,key){
		getCity('http://api.openweathermap.org/data/2.5/weather?id='+value)
		.then (function (res) { 
		    	//Then callback
		    	/*
		    	console.log(res.chunk);
			data = JSON.parse(res.chunk);
			fs.writeFile('./city/'+data.name+'.json',res.chunk, function (err) {
				if (err) throw err;
				console.log(data.name+' Saved!');
			});
			*/
			console.log(res);
	     	})
		.catch(function (err) { 
			//Error callback
			console.log('Something went wrong: ' + err); 

		});

	});
}
runner();
