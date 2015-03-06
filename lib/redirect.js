$(document).ready(function() {
	redirect_init();
});

function redirect_init() {

	console.log(location['hash']);
	/*
	- Lookup the hash fragment, get and store
	      the access token into the browser’s local storage.
	- Then invoke the original callback function.
	- Finally, close the current popup window.
	- On failure, log the error and still close the current popup window.

	*/
}
