$(document).ready(function() {
	redirect_init();
});

function redirect_init() {


	//var str = location['hash'];
	//var re = /=.[^&]*/g;
	//var found = str.match(re);

	//var token = found[0].replace("=", "");

	//localStorage.setItem("access_token", token);

	var params = {},
		queryString = location.hash.substring(1),
		regex = /([^&=]+)=([^&]*)/g,
		m;
	while (m = regex.exec(queryString)) {
		params[decodeURIComponent(m[1])] = decodeURIComponent(m[2]);
	}

	console.log(queryString);

	/*
	- Lookup the hash fragment, get and store
	      the access token into the browser’s local storage.
	- Then invoke the original callback function.
	- Finally, close the current popup window.
	- On failure, log the error and still close the current popup window.

	*/
}
