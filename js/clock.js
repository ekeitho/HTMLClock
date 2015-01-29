var api = "https://api.forecast.io/forecast/d472859494062b7bddec5d4602dc98a7/";

$(document).ready(function() {
   getLocation();
  	getTime();
   getTemp();
  	setTimeout();
});

var options = {
  hour: "2-digit", minute: "2-digit", second : "2-digit"
};

function getTime() {
    var date = new Date();
    $(".clock").html("<p> " + date.toLocaleTimeString("en-us", options) + "</p>");
}

function setTimeout() {
  setInterval(function() {
    getTime()
  }, 1000);
}

function getLocation() {
   api = "https://api.forecast.io/forecast/d472859494062b7bddec5d4602dc98a7/";

   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

         console.log(position.coords.latitude);
         console.log(position.coords.longitude);

         api = api + position.coords.latitude + "," + position.coords.longitude + "?callback=?";
         //if okay call get temp with it's api
         getTemp();
      }, function(error) {
         return 0;
      });
   }
}

function getTemp() {

   if (navigator.geolocation) {
      api = api + "35.300399,-120.662362?callback=?";
   }

	$.getJSON(api, function(data) {

      $('#forecastLabel').html

      $('#forecastLabel').html(data['daily']['data'][0]['summary']);
      $('#forecastIcon').attr('src', 'img/' + data['daily']['data'][0]['icon'] + '.png');

      var max = data['daily']['data'][0]['temperatureMax'];

      if (max < 60) {
         $('body').addClass('cold');
      } else if ( max >= 60) {
         $('body').addClass('chilly');
      } else if ( max >= 70) {
         $('body').addClass('nice');
      } else if ( max >= 80) {
         $('body').addClass('warm');
      } else if ( max >= 90) {
         $('body').addClass('hot');
      }
	});
}
