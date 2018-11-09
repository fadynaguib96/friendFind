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
        name:"Leonardo",
        link:"https://pixel.nymag.com/imgs/daily/vulture/2017/08/12/12-leonardo-dicaprio.w1200.h630.jpg",
        scores:[
            5,
            1,
            3,
            4,
            1,
            2
          ]
      },
      {
        name:"Brad",
        link:"https://upload.wikimedia.org/wikipedia/commons/thumb/5/51/Brad_Pitt_Fury_2014.jpg/220px-Brad_Pitt_Fury_2014.jpg",
        scores:[
            3,
            2,
            3,
            4,
            5,
            1
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
   
    var matchIndex = []

    console.log(bestMatch)


    for (var x = 0; x < differences.length; x++){
        if (bestMatch === differences[x]){
          matchIndex.push(x)
        }
    }
    
    console.log(matchIndex)




  
    console.log(newEntry);
  

    entry.push(newEntry);

    var response = []


    
      for (var r = 0; r < matchIndex.length; r++){
        response.push(entry[matchIndex[r]])
      }
      
      res.json(response);

    
  
  });






// Starts the server to begin listening
// =============================================================
app.listen(PORT, function() {
    console.log("App listening on PORT " + PORT);
  });
  

