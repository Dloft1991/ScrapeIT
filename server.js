

var express = require("express");
var logger = require("morgan");


var axios = require("axios");
var cheerio = require("cheerio");

var PORT = 3000;

var app = express();

// Configure middleware

// Use morgan logger for logging requests
app.use(logger("dev"));
// Parse request body as JSON
app.use(express.urlencoded({ extended: true }));
app.use(express.json());
// Make public a static folder
app.use(express.static("public"));


  // First, we grab the body of the html with axios
  axios.get("https://www.nba.com/#/").then(function(response) {

    // Load the HTML into cheerio and save it to a variable
    var $ = cheerio.load(response.data);
    var results = [];
  
    $("h5.content_list--title").each(function(i, element) {
      var title = $(element).text();
      var link = $(element).parent().attr("href");
  
      results.push({
        title: title,
        link: link
      });
    });
    console.log(results);
  
    $("#results").html(results);
  });


// Start the server
app.listen(PORT, function() {
  console.log("App running on port " + PORT + "!");
});
