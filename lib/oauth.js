var client_id;
var type;
var callback_function;

function initImgur(jsonObj) {
	client_id = jsonObj['client_id'];
	type = jsonObj['type'];
	callback_function = jsonObj['callback_function'];

	console.log("init");

	$('.imgur_auth').click(function() {
		loginImgur();
	});
	//https://api.imgur.com/oauth2/authorize?
	//client_id=YOUR_CLIENT_ID&response_type=REQUESTED_RESPONSE_TYPE&state=APPLICATION_STATE
}

function loginImgur() {
	console.log("Nice job");
}
