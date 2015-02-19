// This is called with the results from from FB.getLoginStatus().
function statusChangeCallback(response) {
    console.log(response);

    /* on successful log in */
    if (response.status === 'connected') {
        // Logged into your app and Facebook.
        testAPI();
        $('.button').css('display', 'initial');
    } else if (response.status === 'not_authorized') {
        // The person is logged into Facebook, but not your app.
        $('.button').css('display', 'none');
    } else {
        /* on log out */
        /* hide the button */
        $('.button').css('display', 'none');
    }
}

// This function is called when someone finishes with the Login
// Button.  See the onlogin handler attached to it in the sample
// code below.
function checkLoginState() {
    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
}

window.fbAsyncInit = function() {
    FB.init({
        appId: '714940305286321',
        xfbml: true,
        version: 'v2.2'
    });


    FB.getLoginStatus(function(response) {
        statusChangeCallback(response);
    });
};


// Now that we've initialized the JavaScript SDK, we call
// FB.getLoginStatus().  This function gets the state of the
// person visiting this page and can return one of three states to
// the callback you provide.  They can be:
//
// 1. Logged into your app ('connected')
// 2. Logged into Facebook, but not your app ('not_authorized')
// 3. Not logged into Facebook and can't tell if they are logged into
//    your app or not.
//
// These three cases are handled in the callback function.



(function(d, s, id) {
    var js, fjs = d.getElementsByTagName(s)[0];
    if (d.getElementById(id)) {
        return;
    }
    js = d.createElement(s);
    js.id = id;
    js.src = "https://connect.facebook.net/en_US/sdk.js";
    fjs.parentNode.insertBefore(js, fjs);
}(document, 'script', 'facebook-jssdk'));

// Here we run a very simple test of the Graph API after login is
// successful.  See statusChangeCallback() for when this call is made.
function testAPI() {
    console.log('Welcome!  Fetching your information.... ');
    FB.api('/me', function(response) {
        console.log('Successful login for: ' + response.name);
        document.getElementById('status').innerHTML =
            'Thanks for logging in, ' + response.name + '!';
    });
}
