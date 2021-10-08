const request = require('request');

exports.pushUpdates = function() {
	return new Promise(function (resolve, reject) {
		let btcArr = [];
		fetchAPI('https://api.cryptonator.com/api/ticker/doge-usd')
		.then(function (res1) {
			btcArr.push(JSON.parse(res1).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/doge-gbp')
		}).then(function (res2) {
			btcArr.push(JSON.parse(res2).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/doge-eur')
		}).then(function (res3) {
			btcArr.push(JSON.parse(res3).ticker);
			return fetchAPI('https://api.cryptonator.com/api/ticker/doge-jpy')
		}).then(function (res4) {
			btcArr.push(JSON.parse(res4).ticker);
			resolve(btcArr);
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