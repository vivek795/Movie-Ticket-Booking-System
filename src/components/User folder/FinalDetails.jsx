import React from "react";

function FinalDetails(props){

    const tax = (props.totalPrice * 18)/100;

    const detailStyle = {
        lineHeight : "15px",
        margin : "20px"
    }

    const seatStyle = {
        marginLeft : "20px"
    }

    return (
        <div  style={detailStyle}>
            <p>Movie : {props.name}</p>
            <p>Theatre : {props.theatre}</p>
            <p>Location : {props.location}</p>
            <p>City : {props.city}</p>
            <p>Seats : </p>
            {props.executive !==0 && (<p style={seatStyle}>Executive : {props.executive}</p>)}
            {props.club !==0 && (<p style={seatStyle}>Club : {props.club}</p>)}
            {props.platinum !==0 && (<p style={seatStyle}>Platinum : {props.platinum}</p>)}
            <p style={{marginTop : "40px"}}>Total Price : {props.totalPrice} Rs.</p>
            <p>Tax Charges : {tax} Rs.</p>
            <p>To Pay : {props.totalPrice + tax}</p>
        </div>
    );
}

export default FinalDetails;