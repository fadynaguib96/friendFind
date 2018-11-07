// Dependencies
// =============================================================
var express = require("express");
var path = require("path");

// Sets up the Express App
// =============================================================
var app = express();
var PORT = process.env.PORT || 3000;

// Sets up the Express app to handle data parsing
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

// Star Wars Characters (DATA)
// =============================================================
var entry = [
    {
        name:"Fady",
        photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        scores:[
            5,
            1
          ]
      },
      {
        name:"Dodo",
        photo:"https://media.licdn.com/mpr/mpr/shrinknp_400_400/p/6/005/064/1bd/3435aa3.jpg",
        scores:[
            3,
            2
          ]
      }
      
];

// Routes
// =============================================================

app.get("/", function(req, res) {
    res.sendFile(path.join(__dirname, "index.html"));
  });

  app.get("/survey", function(req, res) {
    res.sendFile(path.join(__dirname, "survey.html"));
  });

  app.get("/api/entry", function(req, res) {
    return res.json(entry);
  });

// Create New Characters - takes in JSON input
app.post("/api/entry", function(req, res) {
    // req.body hosts is equal to the JSON post sent from the user
    // This works because of our body parsing middleware
    var newEntry = req.body;
  
    // Using a RegEx Pattern to remove spaces from newCharacter
   
    // newcharacter.routeName = newcharacter.name.replace(/\s+/g, "").toLowerCase();
    for(var i = 0; i < newEntry.scores.length; i++) {
        newEntry.scores[i] = parseInt(newEntry.scores[i]);
      }

      var differences = []
      
      
      for(var i = 0; i < entry.length; i++) {
        var totalDifference = 0;
        for(var j = 0; j < entry[i].scores.length; j++) {
          var difference = Math.abs(newEntry.scores[j] - entry[i].scores[j]);
          totalDifference += difference;
          //   console.log(totalDifference)
        }
        differences.push(totalDifference)
    }
    
    console.log(differences)

    var bestMatch = Math.min(...differences)
    var matchIndex = 0

    console.log(bestMatch)

    for (var x = 0; x < differences.length; x++){
        if (bestMatch === differences[x]){
            matchIndex = differences.indexOf(bestMatch)
        }
    }
    
    console.log(matchIndex)




  
    console.log(newEntry);
  



    entry.push(newEntry);
  
    res.json(entry[matchIndex]);
  });






// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

