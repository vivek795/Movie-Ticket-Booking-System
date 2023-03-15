import React, { useState } from "react";

function MyBookings(props){

    const totalPrice = ((props.executive*props.executivePrice) + (props.club*props.clubPrice) + (props.platinum * props.platinumPrice)) ;
    const tax = (totalPrice*18)/100;

    const [details, setDetails] = useState(false);

    function showButton(){
        setDetails(true);
    }

    function hideButton(){
        setDetails(false);
    }

    const bookingBoxStyle = {
        width : "auto",
        height : "auto",
        maxWidth : "400px",
        borderRadius: "10px",
        boxShadow: "4px 3px 7px 2px #00000040",
        padding: "10px",
        boxSizing: "border-box",
        backgroundColor : "grey",
        flexWrap: "wrap",
        justifyContent: "center",
        margin : "50px"
    }

    const imgStyle = {
        width : "250px",
        height : "250px",
        margin : "20px"
    }

    const seatStyle = {
        marginLeft : "30px"
    }

    const detailStyle = {
        fontSize : "20px",
        lineHeight : "15px",
        padding : "10px 15px 15px 25px"
    }

    

    return (
        <div style={bookingBoxStyle}>
            <div>
                <img style={imgStyle} src={props.imgURL} alt="booking pic"></img>
            </div>

            <div style={detailStyle}>
                <h2 style={{textAlign : "center", marginBottom : "20px"}}>{props.movie}</h2>

            {
                (details ? 
                    (
                        <div>
                            <p>Time : {props.movieTime}</p>
                            <p>Seats Booked : </p>
                            {props.executive !==0 && (<p style={seatStyle}>Executive : {props.executive}</p>)}
                            {props.club !==0 && (<p style={seatStyle}>Club : {props.club}</p>)}
                            {props.platinum !==0 && (<p style={seatStyle}>Platinum : {props.platinum}</p>)}
                            <p>Theatre : {props.theatre}</p>
                            <p>Location : {props.location}</p>
                            <p>City : {props.city}</p>
                            <p style={{marginTop : "40px"}}>Total Price : {totalPrice} Rs.</p>
                            <p>Tax Charges : {tax} Rs.</p>
                            <p style={{marginTop : "40px"}}>Total Amount Paid : {totalPrice + tax}</p>
                            <div style={{textAlign : "center", marginTop : "50px", marginBottom : "20px"}}>
                                <button onClick={hideButton} className="btn btn-sm btn-dark">Hide Details</button>
                            </div>
                        </div>
                    ):
                    (
                        <div style={{textAlign : "center"}}>
                            <button onClick={showButton} className="btn btn-sm btn-dark">Show Details</button>
                        </div>
                    )
                )
            }

            </div>

        </div>
    );
}

export default MyBookings;