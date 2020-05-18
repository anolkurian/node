const express = require("express");
const fs = require('fs')
const MongoClient = require("mongodb").MongoClient;
var app = express();
// var mongoose = require("mongoose");


var bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());

var PersonalityTextSummaries = require("personality-text-summary");

// locale is one of {'en', 'es', 'ja', 'ko'}.  version refers to which version of Watson Personality Insights to use, v2 or v3.
var v3EnglishTextSummaries = new PersonalityTextSummaries({
  locale: "en",
  version: "v3",
});


// mongoose.connect("mongodb + srv://anol:anol@cluster0-1cvez.mongodb.net/test?retryWrites=true&w=majority", { useNewUrlParser: true });

// const DATABASE = "interview_training";

// const MongoClient = require('mongodb').MongoClient;

// // replace the uri string with your connection string.
// const uri = "mongodb + srv://anol:anol@cluster0-1cvez.mongodb.net/test?retryWrites=true&w=majority"
// MongoClient.connect(uri, function (err, client) {
//   if (err) {
//     console.log('Error occurred while connecting to MongoDB Atlas...\n', err);
//   }
//   console.log('Connected...');
//   //  const collection = client.db("test").collection("devices");
//   // perform actions on the collection object

// })


// const MongoClient = require('mongodb').MongoClient;
const uri = "mongodb+srv://anol:anol@cluster0-1cvez.mongodb.net/test?retryWrites=true&w=majority";
const client = new MongoClient(uri, { useNewUrlParser: true });
client.connect(err => {
  const collection = client.db("interview_training").collection("result");
  // perform actions on the collection object
  if (err) {
    console.error(err);
  }
  else {
    console.log("connected to atlas")
    // console.log(collection)
    console.log(typeof (collection))
  }
  collection.findOne({}, function (err, user) {
    if (user == null) {
      console.log("not found");
      // res.send({ success: false, message: "Invalid Credentials" });
    } else {
      console.log(user);
      let data = JSON.stringify(user);
      fs.writeFileSync('result2.json', data);
      // res.send({ success: true, user: user.username });
    }
  });
  // client.close();
});

// console.log("mein idhr hu " + collection)
// console.log("")

app.get("/ans", (req, res) => {
  var myV3EnPersonalityProfile = require("./result2.json");
  // retrieve the summary for a specified personality profile (json)
  var textSummary = v3EnglishTextSummaries.getSummary(myV3EnPersonalityProfile);
  console.log("The summary for the provided profile is " + textSummary);

  res.status(200).json(textSummary);
  // res.render("index", { summary: textSummary });
});









// app.get("/ans", (req, res) => {
//   var myV3EnPersonalityProfile = require("./result3.json");
//   // retrieve the summary for a specified personality profile (json)
//   var textSummary = v3EnglishTextSummaries.getSummary(myV3EnPersonalityProfile);
//   console.log("The summary for the provided profile is " + textSummary);
//   res.status(200).json(textSummary);
//   // res.render("index", { summary: textSummary });
// });


const path1 = './result2.json'
fs. unlink(path1,(err) => {
  if(err){
    console.error(err)
    return
  }
})

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
