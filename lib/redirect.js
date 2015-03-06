$(document).ready(function() {
	redirect_init();
});

function redirect_init() {


	var str = location['hash'];
	var re = /=.[^&]*/g;
	var found = str.match(re);

	console.log(found[0]);
	console.log(found[1]);
	console.log(found[2]);
	console.log(found[3]);


	/*
	- Lookup the hash fragment, get and store
	      the access token into the browser’s local storage.
	- Then invoke the original callback function.
	- Finally, close the current popup window.
	- On failure, log the error and still close the current popup window.

	*/
}
