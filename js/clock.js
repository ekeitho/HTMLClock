$(document).ready(function() {
  getTime();
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
