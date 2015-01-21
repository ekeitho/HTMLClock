$(document).ready(function() {
  getTime();
  setTimeout();
});


function getTime() {
    var date = new Date();
    $(".clock").append("HELLO");
    $(".clock").html("<p> " + date.getHours() + ":" +
    date.getMinutes() + ":" + date.getSeconds() + "</p>");
}

function setTimeout() {
  setInterval(function() {
    getTime()
  }, 5000);
}
