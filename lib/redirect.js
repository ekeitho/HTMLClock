$(document).ready(function() {
	redirect_init();
});

function redirect_init() {


	console.log(location);

	//	var str = location['hash'];
	//var re = /=.[^&]*/g;
	//	var found = str.match(re);

	//var token = found[0].replace("=", "");

	//localStorage.setItem("access_token", token);

	var params = {},
		queryString = location.hash.substring(1),
		regex = /([^&=]+)=([^&]*)/g,
		m;
	while (m = regex.exec(queryString)) {
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	// And send the token over to the server
	var req = new XMLHttpRequest();
	// consider using POST so query isn't logged
	req.open('GET', 'https://' + window.location.host + '/catchtoken?' +
		queryString, true);

	req.onreadystatechange = function(e) {
		if (req.readyState == 4) {
			if (req.status == 200) {
				window.location = params['state']
			} else if (req.status == 400) {
				alert('There was an error processing the token.')
			} else {
				alert('something else other than 200 was returned')
			}
		}
	};
	req.send(null);

	/*
	- Lookup the hash fragment, get and store
	      the access token into the browser’s local storage.
	- Then invoke the original callback function.
	- Finally, close the current popup window.
	- On failure, log the error and still close the current popup window.

	*/
}
