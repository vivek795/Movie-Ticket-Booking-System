import axios from "axios";
import React, { useState } from "react";
import FinalDetails from "./FinalDetails";

function UserMovieBox(props){

     ///////////////////////////////////// Use states //////////////////////////////////


    const [book, setBook] = useState(false);
    const [seats, setSeats] = useState({executive : 0, club : 0, platinum : 0 });
    const [rem, setRem] = useState({executive : 0, club : 0, platinum : 0, executivePrice : 0, clubPrice : 0, platinumPrice : 0});
    const [time, setTime] = useState("");
    const [isAvailaible, setIsAvailaible] = useState("");
    const [fbook, setFinalBook] = useState(false);
    const [checkPassword, setPassword] = useState("");
    const [totalPrice , setTotalPrice] = useState(0);
    const [checkPayment, setPayment] = useState("");

    function bookClicked(){
        setFinalBook(false);
        setBook(true);
    }


    /////////////////////////////////////// handler functions /////////////////////////////

    function increment(event){
        const {name} = event.target;

        if((name==="executive" && rem.executive > 0) || (name==="club" && rem.club > 0) || (name==="platinum" && rem.platinum > 0)){

            setSeats(prev => {
                return {
                    ...prev,
                    [name] : (name==="executive" ? prev.executive + 1 : (name==="club" ? prev.club + 1 : prev.platinum + 1))
                }
            });
            
            setRem(prev => {
                return {
                    ...prev,
                    [name] : (name==="executive" ? prev.executive - 1 : (name==="club" ? prev.club - 1 : prev.platinum - 1))
                }
            });
        }


    }

    function decrement(event){
        const {name} = event.target;

        if((name==="executive" && seats.executive > 0) || (name==="club" && seats.club > 0) || (name==="platinum" && seats.platinum > 0)){
            setRem(prev => {
                return {
                    ...prev,
                    [name] : (name==="executive" ? prev.executive + 1 : (name==="club" ? prev.club + 1 : prev.platinum + 1))
                }
            });
            
            setSeats(prev => {
                return {
                    ...prev,
                    [name] : (name==="executive" ? prev.executive - 1 : (name==="club" ? prev.club - 1 : prev.platinum - 1))
                }
            });
        }

    }

    function handleTime(event){
        const {value} = event.target;
        setTime(value);
    }

    function seeAvailaibility(){

        var flag = 0;
        
        for(var i = 0; i<props.shows.length ; i++){
            if(props.shows[i].time === time){
                setRem({
                    executive : props.shows[i].executive,
                    club : props.shows[i].club,
                    platinum : props.shows[i].platinum,
                    executivePrice : props.shows[i].executivePrice,
                    clubPrice : props.shows[i].clubPrice,
                    platinumPrice : props.shows[i].platinumPrice
                });

                flag = 1;
                
                break;
            }
        }

        if(flag) setIsAvailaible("true");
        else setIsAvailaible("oops");
    }



    function finalBook(){
        const calc = ((seats.executive * rem.executivePrice) + (seats.club * rem.clubPrice) + (seats.platinum * rem.platinumPrice)) ;
        const temp = calc + (calc * 18)/100 ;
        setTotalPrice(temp);

        setBook(false);
        setFinalBook(true);
    }


    function handlePassword(event){
        const {value} = event.target;
        setPassword(value);
    }


    async function passData(data){
        const path = "/login/user/newBooking";
        const res = await axios.post(path, data);
        console.log(res);
    }

    // console.log(props.userPassword);

    function paymentClicked(){

        if(checkPassword === props.userPassword){
            setPayment("success");
            const tempData = {
                user : props.userEmail,
                executive : seats.executive,
                club : seats.club,
                platinum : seats.platinum,
                executivePrice : rem.executivePrice,
                clubPrice : rem.clubPrice,
                platinumPrice : rem.platinumPrice,
                movieTime : time,
                movie : props.name,
                theatre : props.theatre,
                location : props.location,
                city : props.city,
                imgURL : props.imgURL
            }

            const remaining = {
                executive : rem.executive,
                club : rem.club,
                platinum : rem.platinum
            }

            const data = {
                bookedData : tempData,
                remainingData : remaining
            }

            passData(data);

            setTimeout(()=> {
                return props.goToMyBookings("myBookings");
            },5000)
        }
        else{
            setPayment("failure");
        }
    }



    //////////////////////////////  Styles  //////////////////////////////////////

    const textStyle = {
        marginLeft : "40px"
    }

    const imageStyle = {
        widht : "200px",
        maxWidth : "250px",
        height : "200px"
    }

    const movieBox = {
        // width : "100%",
        // maxWidth : "800px",
        height : "auto",
        margin : "40px",
        padding : "10px",
        display : "flex",
        alignItems : "left",
        justifyContent : "left",
        borderRadius: "5px",
        boxShadow: "4px 3px 7px 2px #00000040",
        boxSizing: "border-box",
        backgroundColor : "rgb(187, 181, 181)",
        lineHeight : "15px"
    }

    const bookButtonStyle = {
        // marginLeft : "400px"
        position : "absolute",
        right : "300px"
    }

    const leftButtonStyle = {
        margin : "10px 60px 10px 60px"
    }

    const remainigParaStyle = {
        display : "inline-block",
        margin : "10px 10px 10px 200px"
    }

    const priceParaStyle = {
        display : "inline-block",
        margin : "10px 10px 10px 100px"
    }

    const selectButtonStyle = {
        margin : "10px"
    }

    return (
        <div style={movieBox}>
            <div>
                <img style={imageStyle} src={props.imgURL} alt="Movie poster" />
            </div>

            <div style={textStyle}>
                <div>
                    <h4 style={{marginBottom : "5px"}}>{props.name}</h4>
                    <p>IMDB : {props.imdb}</p>
                    <p>Genre : {props.genre}</p>
                    <p>Actors : {props.actors}</p>
                    <p>Trailer : <a href={props.trailer}>{props.name} Trailer</a></p>
                    <p>Theatre : {props.theatre}</p>
                    <p>Show Times : {props.showTimes}  <button onClick={bookClicked} name="book" className="btn btn-sm btn-dark" style={bookButtonStyle}>Book Tickets</button></p>
                </div>

                {
                    (book) && (
                        <div>
                            <hr></hr>

                            <div>
                                <h4>Enter Show Time : </h4>
                                <input onChange={handleTime} style={{width : "500px"}} className="form-control" type="text" name="inputTime" value={time} placeholder="time" />
                                <button onClick={seeAvailaibility} style={{margin: "10px 0 10px 0"}} className="btn btn-sm btn-dark">See Availaibility</button>
                            </div>

                            {
                                ((isAvailaible === "true") ? (
                                    <div>
                                        <h4 style={{margin : "20px 0 30px 0"}}>Select Your Seats</h4>

                                        <div>
                                            <p>Executive : </p>
                                            <div style={leftButtonStyle}> 
                                                <button name="executive" onClick={decrement} style={selectButtonStyle} className="btn btn-sm btn-dark">-</button>  {seats.executive}  <button name="executive" onClick={increment} style={selectButtonStyle} className="btn btn-sm btn-dark">+</button> 
                                                <p style={remainigParaStyle}>Remaining Seats : {rem.executive}</p>
                                                <p style={priceParaStyle}>Price (per ticket in Rs) : {rem.executivePrice}</p>
                                            </div>

                                            <p>Club : </p>
                                            <div style={leftButtonStyle}> 
                                                <button name="club" onClick={decrement} style={selectButtonStyle} className="btn btn-sm btn-dark">-</button>  {seats.club}  <button name="club" onClick={increment} style={selectButtonStyle} className="btn btn-sm btn-dark">+</button> 
                                                <p style={remainigParaStyle}>Remaining Seats : {rem.club}</p>
                                                <p style={priceParaStyle}>Price (per ticket in Rs) : {rem.clubPrice}</p>
                                            </div>

                                            <p>Platinum : </p>
                                            <div style={leftButtonStyle}> 
                                                <button name="platinum" onClick={decrement} style={selectButtonStyle} className="btn btn-sm btn-dark">-</button>  {seats.platinum}  <button name="platinum" onClick={increment} style={selectButtonStyle} className="btn btn-sm btn-dark">+</button> 
                                                <p style={remainigParaStyle}>Remaining Seats : {rem.platinum}</p>
                                                <p style={priceParaStyle}>Price (per ticket in Rs) : {rem.platinumPrice}</p>
                                            </div>

                                            <div style={{textAlign : "center", margin : "40px"}}>
                                                <button onClick={(seats.executive + seats.club + seats.platinum)!==0 ? finalBook : null} className="btn btn-lg btn-dark">Book {(seats.executive + seats.club + seats.platinum)!==0 && (seats.executive + seats.club + seats.platinum)} Seats</button>
                                            </div>
                                            
                                        </div>
                                    </div>
                                ):( 
                                    (isAvailaible === "oops") && (

                                        <div style={{margin : "20px 40px 20px 40px"}} >
                                            <h4>Oops! No shows availaible at this time.</h4>
                                        </div>
                                    )
                                ))
                            }

                        </div>
                    )
                }

                {
                    (fbook  && (
                        <div>
                            <hr></hr>
                            <h4 style={{margin : "20px 0 30px 0"}}>Check Your Final Booking Details </h4>
                            
                            <div>
                                <FinalDetails name={props.name} theatre={props.theatre} city={props.city} location={props.location} executive={seats.executive} club={seats.club} platinum = {seats.platinum} totalPrice = {(seats.executive * rem.executivePrice) + (seats.club * rem.clubPrice) + (seats.platinum * rem.platinumPrice)} />
                            </div>

                            <div>
                                <label style={{fontSize : "20px"}}>Enter Password : </label>
                                <input type="password" onChange={handlePassword} name="password" value={checkPassword} style={{display : "inline-block", width : "280px", margin : "30px"}} className="form-control" placeholder="Password"/>
                                <button style={{margin : "20px"}} onClick={paymentClicked} className="btn btn-lg btn-dark">Pay {totalPrice} Rs.</button>
                            </div>


                            <div>
                                {
                                    ((checkPayment === "success") ? 
                                        (
                                            <div style={{marginTop : "30px", textAlign : "center", fontWeight : "700"}}>
                                                <h3 style={{fontWeight : "700"}}>Tickets Booked Successfully</h3>
                                                <p style={{margin : "30px", fontWeight : "700"}}>Redirecting in 5s....</p>
                                            </div>
                                        ):
                                        ( (checkPayment === "failure") && 
                                            <div style={{margin : "30px"}}>
                                                <h4 style={{fontWeight : "700"}}>Please check your password and try again </h4>
                                            </div> 
                                        )
                                    )

                                }
                            </div>

                        </div>

                        
                    ))
                }

            </div>

        </div>
    );
}

export default UserMovieBox;