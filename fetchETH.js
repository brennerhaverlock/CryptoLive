const request = require('request');

exports.pushUpdates = function() {
	return new Promise(function (resolve, reject) {
		let ethArr = [];
		fetchAPI('https://api.cryptonator.com/api/ticker/eth-usd')
		.then(function (res1) {
			ethArr.push(JSON.parse(res1).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/eth-gbp')
		}).then(function (res2) {
			ethArr.push(JSON.parse(res2).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/eth-eur')
		}).then(function (res3) {
			ethArr.push(JSON.parse(res3).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/eth-jpy')
		}).then(function (res4) {
			ethArr.push(JSON.parse(res4).ticker);
			resolve(ethArr);
		});
	});
}

function fetchAPI(apiPath) {
	return new Promise(function (resolve, reject) {
		request(apiPath, function (error, response, body) {
			if (!error && response.statusCode == 200) {
				resolve(body);
			} else {
				reject(error);
			}
		});
	});
}