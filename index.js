var express = require('express');
var app = express();
var path = require('path');
const bodyParser = require('body-parser');
var MongoClient = require('mongodb').MongoClient;
var url = "mongodb://localhost:27017/";
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use('/static', express.static(path.join(__dirname, 'Public')))
app.get('/', function(req, res) {
    res.sendFile(path.join(__dirname + '/index.html'));

  });

  app.post('/store', (req, res) => {

    MongoClient.connect(url,{useUnifiedTopology: true}, function(err, db) {
        if (err) throw err;
        var dbo = db.db("iCrowdTaskDB");
        var myobj = req.body;
        dbo.createCollection("customers", {
         validator: {
            $jsonSchema: {
               bsonType: "object",
               required: [ "country", "fname", "lname" ],
               properties: {
                  county: {
                     bsonType: "string",
                     description: "must be a string and is required"
                  },
                  fname: {
                     bsonType: "string",
                     description: "name must be a name"
                  },
                  lname: {
                   bsonType: "string",
                   description: "name must be a name"
                },
                  email: {
                   bsonType: "string",
                   pattern: "^.+\@.+$",
                   description: "required and must be a valid email address"
                  },
                  password: {
                     bsonType: 'string',
                     pattern:"(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}",
                     description: "must be a double if the field exists"
                  },
                  address: {
                   bsonType: 'string',
                   description: "Address must be here"
                },

                state: {
                   bsonType: 'string',
                   description: "Please Enter a state"
                },

                zip: {
                   bsonType: 'string',
                   description: "Please enter zip code"
                },
                phone: {
                   bsonType: 'string',
                   description: "Please Enter a phone number"
                },

               }
            }
         }
      },(err,creationResponse)=>{
         if(err){console.log("Database already exist")}

         dbo.collection("customers").insertOne(myobj, function(err, database_response) {
            if (err){
               res.json({state:false,reason:"Data not valid"})
            };

            db.close();
            res.json({state:true,reason:"Data insert is successful!"})
          });
      })

      });



  });


app.listen(8080);