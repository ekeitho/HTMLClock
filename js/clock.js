var interval;
var options = {
	hour: "2-digit",
	minute: "2-digit",
	second: "2-digit"
};
var alarm_results = [];

/* when our webpage is complete, do... */
$(document).ready(function() {
	/* initialize parse */
	Parse.initialize("0dEHWr1vjV8ACuIySubn1TQaKPvu0StNAVusDvRE",
		"ZJ3I6e1IdJ2A2BqcusPxY9V8Sbg6VVj4JZASxggr");
	/* get clock time */
	getTime();
	/* refresh every second */
	setTimeoutC();
	/* get location of user */
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
	});

});



function fireAlarm() {
	$.each(alarm_results, function(index, value) {
		/* example: 1:00 am */
		var time_string = value.get('time');
		var arr_split = time_string.split(':');
		var hour = parseInt(arr_split[0]);
		/* found out that it can parse an int for example '03' to 3
		through practice, how cool */
		var min = parseInt(arr_split[1].slice(0, 2));

		/* example: 1:00 am
		   splits space between 0 and am
		    ==> am = 0, pm = 1 */
		var AMorPM = arr_split[1].split(" ")[1] == "am" ? 0 : 1;

		/* date for alarm setting */
		var date = new Date();
		var dateHours = date.getHours();
		/* set for am or pm first
		   since get hours returns in 24 hour format
		   */
		var dateAMorPM = dateHours > 12 ? 1 : 0;

		/* getting ready for alarm calculation */
		if (AMorPM == 1) {
			hour += 12;
		}

		// probably doesn't work for all cases- doing OS -__-
		var hour_diff = dateHours - hour;
		var min_diff = date.getMinutes() - min;
		/* if the date minute is less than the users alarm minute
		   then we must just get the absolute value of the difference */
		if (min_diff < 0) {
			min_diff *= -1;
		}

		console.log("Min diff is " + min_diff);

		var milliCount = 0;
		milliCount = hour_diff * 3600000;
		milliCount += min_diff * 60000;

		/* alarm fires */
		setTimeout(function() {
			alert("Alarm clock has gone off!!");

		}, milliCount);

	});
}

/*
   Gets all the alarms from the Parse database
*/
function getAllAlarms() {
	var AlarmObject = Parse.Object.extend("Alarm");

	/* this says that for results that are coming back
	   you can treate all the items as alarm objects
	   as seen below with '.time' and '.alarmName'   */


	var query = new Parse.Query(AlarmObject);
	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {
			query.equalTo("fb_user_id", response['authResponse']['userID']);
			query.find({
				success: function(results) {
					alarm_results = results;
					for (var i = 0; i < results.length; i++) {
						insertAlarm(results[i].get('time'), results[i].get('alarmName'));
					}
					setDelete();
					fireAlarm();
				},
				error: function() {
					//fireAlarm();
				}
			});
		}
	});

}

function setDelete() {
	$(".flexable .delete").on('click', function() {
		/* gets it's parents index to find where it is in the array
		        of alarm_results */
		var index = $(this).parent().index();
		var child = $(this).parent().get(index);

		var alarm_obj = alarm_results[index];
		alarm_obj.destroy({
			success: function(myObject) {
				console.log("The object was deleted from the Parse Cloud.");
				/* remove from the array and used splice
				            to keep ordering and fill any blank holes */

				/* set up a google analytics
				   js script for delete alarm  */
				ga('send', 'event', 'Alarm', 'Delete');
				alarm_results.splice(index, 1);
				/* make sure to remove the element from the page */
				child.remove();
			},
			error: function(myObject, error) {
				/* something happened - uh oh */
				console.log("The delete failed with error: " + error);
			}
		});
	});
}

/*
   Adds an alarm to the database;
 */
function addAlarm() {
	var hours = $('#hours option:selected').text();
	var mins = $('#mins option:selected').text();
	var ampm = $('#ampm option:selected').text();
	var alarmName = $('#alarmName').val();
	var time = hours + ":" + mins + " " + ampm;

	console.log("Once?");

	FB.getLoginStatus(function(response) {
		if (response.status === 'connected') {

			var AlarmObject = Parse.Object.extend("Alarm");
			var alarmObject = new AlarmObject();
			alarmObject.save({
				"fb_user_id": response['authResponse']['userID'],
				"time": time,
				"alarmName": alarmName
			}, {
				success: function(object) {
					/* insert alarm */
					insertAlarm(
						time,
						alarmName
					);

					/* set up a google analytics
					   js script for add alarm  */
					ga('send', 'event', 'Alarm', 'Add');

					/* makes sure to update the array if the user adds an Alarm
					   since the user may need to delete an alarm that wasn't
					   requested from parse yet */
					alarm_results.push(alarmObject);
					/* sets alarm delete atrribute to make sure
					   it notices the new item added */
					setDelete();
					/* hide the window */
					hideAlarmPopup();
				}
			});
		}
	});

}

/*
   helper method to insert items from input into a nice div
   note: according to step 3 in adding parse, we could also have
         insert alarm with two params from time and alarmName
*/
function insertAlarm(time, alarmName) {
	var blank_div = $('<div></div>');
	blank_div.addClass('flexable');
	blank_div.append("<img src='img/delete.png' class='delete'></img>");
	blank_div.append("<div class='name'>" + alarmName + " --> </div>");
	blank_div.append("<div class='time'>" + time);

	$("#alarms").append(blank_div);
}

/*
   adds a hide class to remove popup window
*/
function hideAlarmPopup() {
	$('#mask').addClass('hide');
	$('#popup').addClass('hide');
}

/*
   shows the alarm popup window after clicking 'Add Alarm'
*/
function showAlarmPopup() {
	$('#mask').removeClass('hide');
	$('#popup').removeClass('hide');
}

/*
   gets the current time of the users machience
*/
function getTime() {
	var date = new Date();
	$(".clock").html("<p> " + date.toLocaleTimeString("en-us", options) + "</p>");
}

/*
   set an interval for every 1 second and update the clock
*/
function setTimeoutC() {
	/* i want the id so that i can turn off interval in console
	   so i dont have the annoying blinking on the time */
	interval = setInterval(function() {
		getTime()
	}, 1000);
}

/*
   gets the location of the user if the reqest from the user was a success
*/
function getLocation() {
	/* start of the weather api */
	var weather_api =
		"https://api.forecast.io/forecast/d472859494062b7bddec5d4602dc98a7/";

	/* if there is a way to get geolocation on your device then go through */
	if (navigator.geolocation) {
		navigator.geolocation.getCurrentPosition(function(position) {

				/* the geolocation api url call */
				var geo_api = "http://api.geonames.org/findNearbyPostalCodesJSON?lat=" +
					position.coords.latitude + "&lng=" +
					position.coords.longitude + "&username=ekeitho";
				/* call ajax on the api call */
				$.ajax({
					url: geo_api,
					success: function(data) {
						var loc = "" + data['postalCodes'][0]['adminName2'] + ", " + data[
							'postalCodes'][0]['adminCode1'];
						// append forcast to label
						$('#forecastLabel').append("<p> (" + loc + ")</p>");
					}
				});
				/* set the new api for weather to be the long and latitude of the geolcation */
				weather_api = weather_api + position.coords.latitude + "," + position.coords
					.longitude + "?callback=?";
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
	$.getJSON(locat, function(data) {
		var label = "" + data['daily']['data'][0]['summary'];

		/* attach label to html */
		$('#forecastLabel').append("<span>" + label + "</span>");
		/* attach img src to html */
		$('#forecastIcon').attr('src', 'img/' + data['daily']['data'][0]['icon'] +
			'.png');

		/* used to determine the background of the html page */
		var max = data['daily']['data'][0]['temperatureMax'];
		if (max < 60) {
			$('body').addClass('cold');
		} else if (max >= 60) {
			$('body').addClass('chilly');
		} else if (max >= 70) {
			$('body').addClass('nice');
		} else if (max >= 80) {
			$('body').addClass('warm');
		} else if (max >= 90) {
			$('body').addClass('hot');
		}
	});
}
