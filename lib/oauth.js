var client_id;
var type;
var callback_function;

function initImgur(jsonObj) {
	client_id = jsonObj['client_id'];
	type = jsonObj['type'];
	callback_function = jsonObj['callback_function'];


	$('.imgur_auth').click(function() {
		loginImgur();
	});

}

function loginImgur() {
	var strWindowFeatures =
		"menubar=yes,location=yes,resizable=yes,scrollbars=yes,status=yes";
	window.open('http://api.imgur.com/oauth2/authorize?client_id=' + client_id +
		'&response_type=' + type, "Imgur_Auth_Window", strWindowFeatures);

	console.log("Nice job");
}
