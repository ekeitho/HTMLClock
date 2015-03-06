$(document).ready(function() {
	redirect_init();
});

function redirect_init() {


	var str = location['hash'];
	var re = /#access_token.*\&/;
	var found = str.match(re);

	console.log(found);


	/*
	- Lookup the hash fragment, get and store
	      the access token into the browser’s local storage.
	- Then invoke the original callback function.
	- Finally, close the current popup window.
	- On failure, log the error and still close the current popup window.

	*/
}
