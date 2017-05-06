function myFuncion()
{
	var request = require('request');

	// Set the headers
	var headers = {
	    'Content-Type': 'application/json'
	}

	// Configure the request
	var options = {
	    url: 'https://www.googleapis.com/urlshortener/v1/url?key=AIzaSyDSzPlQBcgLbwdRTlmqWQEJbaJcMqNmtV0',
	    method: 'POST',
	    headers: headers,
	    json: {'longUrl': 'https://cloud.google.com/natural-language/docs/basics#entity-analysis-response'}
	}


	request(options, function (error, response, body) {
	    if (!error && response.statusCode == 200) {
	        // Print out the response body
			console.log(body.id);   
	    }
	});
}

myFuncion();
