$(document).ready(function() {
	redirect_init();
});

function redirect_init() {

	console.log(location);

	var str = location['hash'];
	var re = /=.[^&]*/g;
	var found = str.match(re);

	var token = found[0].replace("=", "");
	var username = found[4].replace("=", "");

	localStorage.setItem("access_token", token);
	localStorage.setItem("username", username);

	$.ajax({
		'url': "https://api.imgur.com/3/account/" + username,
		beforeSend: function(xhr) {
			xhr.setRequestHeader("Authorization", "Bearer " + token);
		},
		'success': function(result) {
			console.log(result['data']['url']);
			alert("Thank you for granting " + result['data']['url']);
			window.close();
		},
		'error': function(error) {
			console.log("Logging error... " + error);
			window.close();
		}
	});

	/*
	- Lookup the hash fragment, get and store
	      the access token into the browser’s local storage.
	- Then invoke the original callback function.
	- Finally, close the current popup window.
	- On failure, log the error and still close the current popup window.

	*/
}
