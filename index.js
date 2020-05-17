const express = require("express");
const fs = require('fs')
var app = express();

var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var PersonalityTextSummaries = require("personality-text-summary");

// locale is one of {'en', 'es', 'ja', 'ko'}.  version refers to which version of Watson Personality Insights to use, v2 or v3.
var v3EnglishTextSummaries = new PersonalityTextSummaries({
  locale: "en",
  version: "v3",
});


app.get("/cv", (req, res) => {
  var myV3EnPersonalityProfile = require("./result2.json");
  // retrieve the summary for a specified personality profile (json)
  var textSummary = v3EnglishTextSummaries.getSummary(myV3EnPersonalityProfile);
  console.log("The summary for the provided profile is " + textSummary);
  res.status(200).json(textSummary);
  // res.render("index", { summary: textSummary });
});

app.get("/ans", (req, res) => {
  var myV3EnPersonalityProfile = require("./result3.json");
  // retrieve the summary for a specified personality profile (json)
  var textSummary = v3EnglishTextSummaries.getSummary(myV3EnPersonalityProfile);
  console.log("The summary for the provided profile is " + textSummary);
  res.status(200).json(textSummary);
  // res.render("index", { summary: textSummary });
});


// const path1 = './result2.json'
// fs. unlink(path1,(err) => {
//   if(err){
//     console.error(err)
//     return
//   }
// })

// const path2 = './result3.json'
// fs.unlink(path2, (err) => {
//   if (err) {
//     console.error(err)
//     return
//   }
// })

//module.exports
const server = app.listen(process.env.PORT || 3001, () => {
  const { address, port } = server.address();
  console.log("listening");
});
// app1.listen(port,function(req,rs)
