import axios from "axios";
import React, { useState } from "react";
import { Helmet } from "react-helmet";
import { useLocation, useNavigate } from "react-router-dom";
import MyBookings from "./MyBookings";
import UserMovieBox from "./UserMovieBox";
import UserNavigationbar from "./UserNavbar";
import Trending from "./TrendingMovies";
import TrendingBox from "./TrendingBox";


function User(){

    const location = useLocation();

    const userEmail = location.state.email;
    const userPassword = location.state.password;

    // console.log(userEmail);
    // console.log(userPassword);


    ////////////////////// Use States ///////////////////////

    const [city, setCity] = useState("");
    const [click, setClick] = useState("");
    const [movies, setMovies] = useState([]);
    const [option, setOption] = useState("home");
    const [bookings, setBookings] = useState([]);

    function handleChange(event){
        const {value} = event.target
        setCity(value);
    }


    ////////////////////// Functions ////////////////////

    async function getMovies(){
        const path = "/login/user/" + city;
        const res = await axios.get(path);
        const temp = res.data;
        setMovies(temp);
    }

    function buttonClicked(){
        if(city !== ""){
            getMovies();
            
            setTimeout(() => {
                return setClick(city);
            }, 500);
        }
        else{
            setClick("");
        }
    }

    // to handle logout.
    const navigate = useNavigate();
    function logout(){
        navigate("/");
    }

    // to get the bookings data;
    async function getBookings(){
        const path2 = "/login/user/bookings/" + userEmail;
        const res = await axios.get(path2);
        const temp = res.data;
        setTimeout(()=>{
            return setBookings(temp);
        }, 100);
    }

    function linkClicked(name){
        if(name === "logout"){
            logout();
        }

        if(name === "myBookings"){
            getBookings();
            setTimeout(()=>{
                setCity("");
                setClick("");
            },1000);
        }

        setTimeout(()=> {
            setOption(name);
        },500);

    }



    ///////////////// Styles ///////////////////


    const searchInput = {
        marginRight : "10px",
        width : "600px",
        height : "40px"
    }
    

    const trendingStyle = {
        backgroundColor : "grey",
        padding : "10px",
        display : "inline-block",
        width : "400px",
        marginTop : "30px",
        marginBottom : "30px"
    }

    const availableStyle = {
        // display : "flex",
        // flexWrap : "wrap",
        marginTop : "20px"
    }

    const allBookingsStyle = {
        backgroundColor : "grey",
        padding : "10px",
        display : "inline-block",
        width : "400px",
        marginTop : "50px",
        marginBottom : "10px"
    }

    const bookingAreaStyle = {
        display : "flex",
        flexWrap : "wrap",
        justifyContent : "center",
        padding : "10px"
    }



    

    return (
        <div>

            <Helmet>
                <style>
                    {`

                        html, body {
                            height: auto;
                            width: 100%;
                            font-family: "Montserrat", sans-serif;
                        }
                    
                        body{
                            padding-bottom: 40px;
                            background-color: #f5f5f5;
                        }
                    
                    `}
                </style>
            </Helmet>

            <UserNavigationbar linkClicked = {linkClicked} />

            {
                (option === "home") ? 
                (
                    <div>

                        <div style={{textAlign : "center", margin : "30px"}}>
                            <input style={searchInput} onChange={handleChange} name="city" value={city} className="form-signin" type="text" placeholder="Enter City"/>
                            <button onClick={buttonClicked} className="btn btn-lg btn-dark" >Search</button>
                        </div>

                        {
                            (click === "") ? (
                                <div>
                                    <div style={trendingStyle}>
                                        <h3>Trending Movies</h3>
                                    </div>

                                    <div style={{display : "flex", flexWrap : "wrap", justifyContent : "center"}}>
                                        {
                                            Trending.map((movie, index) => {
                                                return (
                                                    <TrendingBox 
                                                        key={index}
                                                        name={movie.name}
                                                        imgURL={movie.imgURL}
                                                    />
                                                )
                                            })
                                        }
                                    </div>

                                </div>
                            ) :

                            (
                                <div>
                                    <h2 style={trendingStyle}>Available Movies</h2>
                                    {
                                        (movies.length === 0)?
                                        (
                                            <div style={{textAlign : "center", marginTop : "100px"}}>
                                                <h1>Oops! No Movies Available in this city</h1>
                                            </div>
                                        ) : 
                                        (
                                            <div style={availableStyle}>
                                                {
                                                    movies.map((movie, index) => {
                                                        return (
                                                            <UserMovieBox 
                                                                key={index} 
                                                                name={movie.name} 
                                                                imdb={movie.imdb} 
                                                                genre={movie.genre} 
                                                                theatre={movie.theatre}
                                                                imgURL={movie.imgURL} 
                                                                trailer={movie.trailer}
                                                                actors={movie.actors}
                                                                showTimes={movie.showTimes}
                                                                shows={movie.shows}
                                                                city={movie.city}
                                                                location={movie.location}
                                                                userEmail = {userEmail}
                                                                userPassword = {userPassword}
                                                                goToMyBookings = {linkClicked}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                    }
                                </div>
                            )
                        }
                    </div>
                ) : 
                (
                    (option === "myBookings") && ( 
                        <div>
                            <div style={allBookingsStyle}>
                                <h3>All Bookings</h3>
                            </div>
                            {
                                (
                                    (bookings.length === 0) ? 
                                        (
                                            <div style={{textAlign : "center", marginTop : "100px"}}>
                                                <h2>Oops! No bookings yet</h2>
                                                <p>Go to "Home" to book tickets</p>
                                            </div>
                                        ) : 
                                        (
                                            <div style={bookingAreaStyle}>
                                                {
                                                    bookings.map((booking, index) => {
                                                        return (
                                                            <MyBookings 
                                                                key={index}  
                                                                movie={booking.movie}
                                                                movieTime={booking.movieTime}
                                                                executive={booking.executive}
                                                                club={booking.club}
                                                                platinum={booking.platinum}
                                                                executivePrice={booking.executivePrice}
                                                                clubPrice={booking.clubPrice}
                                                                platinumPrice={booking.platinumPrice}
                                                                theatre={booking.theatre}
                                                                location={booking.location}
                                                                city={booking.city}
                                                                imgURL={booking.imgURL}
                                                            />
                                                        )
                                                    })
                                                }
                                            </div>
                                        )
                                )
                            }
                        </div>
                    )
                )
            }

        </div>
    );
}

export default User;