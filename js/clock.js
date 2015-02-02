var interval;

$(document).ready(function() {
  	getTime();
  	setTimeout();
   getLocation();

   /* button must be an immediate child to alarmHeader */
   $('#alarmHeader > .button').click(function() {
      showAlarmPopup();
   });

   /* found another cool way to select an element */
   $("input[value=Cancel]").click(function() {
      hideAlarmPopup();
   });

   $("input[value='Save Alarm']").click(function() {
      addAlarm();
      hideAlarmPopup();
   });
});

var options = {
  hour: "2-digit", minute: "2-digit", second : "2-digit"
};

/*
Create 4 local variables (hours, mins, ampm, and alarmName) to capture the Alarm values from the popup.
   $("#hours option:selected").text(); will get the hour value.
      Call insertAlarm(hours, mins, ampm, alarmName);
      Call hideAlarmPopup();
      Set the onclick property to addAlarm() in the index.html file for the Set Alarm button.
*/
function addAlarm() {
   insertAlarm(
      $('#hours option:selected').text(), //inesrt the hour
      $('#mins option:selected').text(),
      $('#ampm option:selected').text(),
      $('#alarmName').val()
   );
}

/*
insertAlarm - 4 parameters: hours, mins, ampm, and alarmName.
   Use jQuery to create a new blank div, $("<div>").
   Add the class flexable to the new blank div.
      Use the jQuery append() method to add 2 more div elements within the new flexable div.
   Set the class to name and html to the alarmName variable.
   Set the class to time and html to the concatenation of hours, colon, mins, ampm variables.
      Use the append()method to add the blank div to $("#alarms").
*/

function insertAlarm(hours, mins, ampm, alarmName) {
   var blank_div = $('<div></div>');
   blank_div.addClass('flexable');
   blank_div.append("<div class='name'>" + alarmName + " --> </div>");
   blank_div.append("<div class='time'>" + hours + ":" + mins + " " + ampm);

   $("#alarms").append(blank_div);
}

function hideAlarmPopup() {
   $('#mask').addClass('hide');
   $('#popup').addClass('hide');
}

function showAlarmPopup() {
   console.log("hello");
   $('#mask').removeClass('hide');
   $('#popup').removeClass('hide');
}

function getTime() {
    var date = new Date();
    $(".clock").html("<p> " + date.toLocaleTimeString("en-us", options) + "</p>");
}

function setTimeout() {
  /* i want the id so that i can turn off interval in console
     so i dont have the annoying blinking on the time */
  interval = setInterval(function() {
    getTime()
  }, 1000);
}


function getLocation() {
   /* start of the weather api */
   var weather_api = "https://api.forecast.io/forecast/d472859494062b7bddec5d4602dc98a7/";

   /* if there is a way to get geolocation on your device then go through */
   if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(function(position) {

         /* the geolocation api url call */
         var geo_api = "http://api.geonames.org/findNearbyPostalCodesJSON?lat=" +
                        position.coords.latitude + "&lng=" +
                        position.coords.longitude + "&username=ekeitho";
         /* call ajax on the api call */
         $.ajax({
            url : geo_api,
            success : function(data) {
               var loc = "" + data['postalCodes'][0]['adminName2'] + ", " + data['postalCodes'][0]['adminCode1'];
               // append forcast to label
               $('#forecastLabel').append("<p> (" + loc + ")</p>");
            }
         });
         /* set the new api for weather to be the long and latitude of the geolcation */
         weather_api = weather_api + position.coords.latitude + "," + position.coords.longitude + "?callback=?";
         /* call the getTemperature with the UNIQUE lat and long* */
         getTemp(weather_api);
      },
      /* if there is an error */
      function(error) {
         // return for default lng and lat
         getTemp(weather_api + "35.300399,-120.662362?callback=?");
      });
   } else {
      // return default lng and lat
      getTemp(weather_api + "35.300399,-120.662362?callback=?");
   }
}

/* api to ge the temperature */
function getTemp(locat) {

   console.log("here");

	$.getJSON(locat, function(data) {
      var label = "" + data['daily']['data'][0]['summary'];
      /* fixes the string (removes period from the end) label
         from api and inserts city and state name */

      /* attach label to html */
      $('#forecastLabel').append("<span>" + label + "</span>");
      /* attach img src to html */
      $('#forecastIcon').attr('src', 'img/' + data['daily']['data'][0]['icon'] + '.png');

      /* used to determine the background of the html page */
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
