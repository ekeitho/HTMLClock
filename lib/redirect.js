$(document).ready(function() {
	redirect_init();
});

function redirect_init() {

	console.log(location);

	var str = location['hash'];
	var re = /=.[^&]*/g;
	var found = str.match(re);

	var token = found[0].replace("=", "");

	localStorage.setItem("access_token", token);


	/*
	- Lookup the hash fragment, get and store
	      the access token into the browser’s local storage.
	- Then invoke the original callback function.
	- Finally, close the current popup window.
	- On failure, log the error and still close the current popup window.

	*/
}
