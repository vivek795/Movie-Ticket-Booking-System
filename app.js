const express = require("express");
const bodyParser = require("body-parser");
const mongoose = require("mongoose");
const _ = require("lodash");

const app = express();
app.use(express.static('.'));
app.use(bodyParser.urlencoded({extended : true})) ;
app.use(bodyParser.json());

mongoose.connect("mongodb://localhost:27017/movieAppDB");


///////////////////////////////// SCHEMAS OF ALL COLLECTIONS ////////////////////////////////////

const userSchema = new mongoose.Schema({
    fname : String,
    lname : String,
    email : String,
    phone : Number,
    password : String
});

const adminSchema = new mongoose.Schema(userSchema);

const theatreSchema = new mongoose.Schema({
    name : String,
    city : String,
    location : String,
    rating : String,
    adminEmail : String,
    imgURL : String
});

const movieSchema = new mongoose.Schema({
    name : String,
    imdb : String,
    genre : String, 
    actors : String,
    trailer : String,
    theatre : String,
    city : String, 
    location : String,
    adminEmail : String,
    imgURL : String,
    showTimes : String,
    shows : [{
        time: String,
        executive : Number,
        club : Number, 
        platinum : Number,
        executivePrice : Number,
        clubPrice : Number,
        platinumPrice : Number
    }]
});



const bookingSchema = new mongoose.Schema({
    user : String,
    executive : Number,
    club : Number,
    platinum : Number,
    executivePrice : Number,
    clubPrice : Number,
    platinumPrice : Number,
    movie : String,
    movieTime : String,
    theatre : String,
    location : String,
    city : String,
    imgURL : String
});



/////////////////////////////////////  MODELS OF ALL COLLECTIONS /////////////////////////////////////

const User = mongoose.model("User", userSchema );
const Admin = mongoose.model("Admin", adminSchema);
const Theatre = mongoose.model("Theatre", theatreSchema);
const Movie = mongoose.model("Movie", movieSchema);
const Booking = mongoose.model("Booking",bookingSchema);


var isAccessGranted = "false";



//////////////////////////////////   GET ROUTES  ///////////////////////////////////////////


app.get("/", function(req,res){
    res.json({
        "name" : "Server",
        "description" : "Hey, Server this side. Got the data ?"
    });
});




// to get the access permission on the frontend from the backend.
app.get("/login/:person", function(req, res){
    // console.log(isAccessGranted);
    var checkPermission = isAccessGranted;
    isAccessGranted = "false";
    res.json({
        "isAccessGranted" : checkPermission
    });
});



// to get the Admin Theatres on the frontend;
app.get("/login/Admin/:adminEmail", function(req,res){
    const searchEmail = req.params.adminEmail;
    // console.log(searchEmail);

    Theatre.find({adminEmail : searchEmail}, function(err, foundTheatres){
        if(err){
            console.log(err);
        }
        else{
            // console.log(foundTheatres);
            res.json(foundTheatres);
        }
    });

});


// to get the movies for a theatre in admin my theatres
app.get("/login/Admin/Movies/:theatre/:adminEmail/:city/:location", function(req,res){
    const theatreName =  req.params.theatre;
    const adminEmail = req.params.adminEmail;
    const city = req.params.city;
    const location = req.params.location;

    Movie.find({theatre : theatreName, adminEmail : adminEmail , city : city, location: location} , function(err, foundMovies){
        if(err){
            console.log(err);
        }
        else{
            // console.log(foundMovies);
            res.json(foundMovies);
        }
    })
});


// to get the movies for a user for a particular city.
app.get("/login/user/:city", function(req,res){
    const searchCity = req.params.city;
    Movie.find({city : searchCity}, function(err, foundMovies){
        if(err){
            console.log(err);
        }
        else{
            // console.log(foundMovies);
            res.json(foundMovies);
        }
    });
});


// to get the data of all the bookings of a user.
app.get("/login/user/bookings/:email", function(req,res){
    const userEmail = req.params.email;
    Booking.find({user : userEmail}, function(err, foundBookings){
        if(err){
            console.log(err);
        }
        else{
            // console.log(foundBookings);
            res.json(foundBookings);
        }
    })
})


///////////////////////////////////   POST ROUTES    //////////////////////////////////////


// to receive a post request on register route.
app.post("/register/:person", function(req,res){
    // console.log(req.body);
    const personIs = _.lowerCase(req.params.person);

    if(personIs === "user"){
        const newData = new User(req.body);
        newData.save();
    }
    else{
        const newData = new Admin(req.body);
        newData.save();
    }

});


// to receive a post request on login route.
app.post("/login/:person", async function(req,res){

    const personIs = _.lowerCase(req.params.person);

    if(personIs === "user"){
        
        User.findOne({email : req.body.email , password : req.body.password}, function(err, foundUser){
            if(err){
                console.log(err);
            }
            else{
                if(foundUser !== null){
                    isAccessGranted = "true";
                }
                else {
                    isAccessGranted = "false";
                }
            }
        });
    }

    else{
        Admin.findOne({email : req.body.email , password : req.body.password}, function(err, foundAdmin){
            if(err){
                console.log(err);
            }
            else{
                if(foundAdmin !== null){
                    isAccessGranted = "true";
                }
                else {
                    isAccessGranted = "false";
                }
            }
        });
    }
});



// to get the theatres data of admin and insert it into database.
app.post("/login/admin/myTheatres", function(req, res){
    // console.log(req.body);
    const newTheatre = new Theatre(req.body);
    newTheatre.save();
});



// to get the movies data of admin and insert it into database.
app.post("/login/Admin/newMovie", function(req,res){
    const newMovie = new Movie(req.body);
    newMovie.save();
});


// to get the bookings data of users and insert it into database and also update the remaining seats of booked movie.
app.post("/login/user/newBooking", function(req,res){
    const newBooking = new Booking(req.body.bookedData);
    newBooking.save();
    const movieData = req.body.bookedData;
    const remData = req.body.remainingData;
    Movie.findOne({name : movieData.movie , theatre : movieData.theatre, location : movieData.location , city : movieData.city}, function(err, foundMovie){
        if(err){
            console.log(err);
        }
        else if(foundMovie !== null){
            var arr = foundMovie.shows;
            for(var i=0;i<arr.length; i++){
                if(arr[i].time === movieData.movieTime){
                    arr[i].executive = remData.executive;
                    arr[i].club = remData.club;
                    arr[i].platinum = remData.platinum;
                    break;
                }
            }

            Movie.findOneAndUpdate({name : movieData.movie , theatre : movieData.theatre, location : movieData.location , city : movieData.city},{shows : arr},function(err){
                if(err){
                    console.log(err);
                }
                else{
                    console.log("Update Successful");
                    // console.log(arr);
                }
            }) ;
        }
    })
});

// to delete a movie.
app.post("/login/Admin/RemoveMovie", function(req,res){
    const movieData  = req.body;

    Movie.findOneAndDelete({name : movieData.name , theatre : movieData.theatre, location : movieData.location , city : movieData.city}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Delete Movie Successfull");
        }
    });

    Booking.deleteMany({movie : movieData.name , theatre : movieData.theatre, location : movieData.location , city : movieData.city}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Bookings Deleted Successfully");
        }
    });
});

// deleting a theatre.
app.post("/login/Admin/DeleteTheatre", function(req,res){
    const deleteDetails = req.body;

    // deleting theatre.
    Theatre.deleteOne({name : deleteDetails.name , city : deleteDetails.city , location : deleteDetails.location, adminEmail : deleteDetails.adminEmail}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("Theatre delted Successfully.");
        }
    });


    // deleting all movies in that theatre.
    Movie.deleteMany({theatre : deleteDetails.name , city : deleteDetails.city , location : deleteDetails.location, adminEmail : deleteDetails.adminEmail }, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("All movies of this theatre deleted");
        }
    });

    // deleting all bookings in that theatre.
    Booking.deleteMany({theatre : deleteDetails.name , city : deleteDetails.city , location : deleteDetails.location}, function(err){
        if(err){
            console.log(err);
        }
        else{
            console.log("All Bookings of this theatre deleted");
        }
    });


});



app.listen(5000, function(){
    console.log("Server started on port 5000.");
});