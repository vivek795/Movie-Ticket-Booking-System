import React from "react";

function MovieShow(props){

    const showStyle = {
        margin : "30px",
        paddingLeft : "200px",
        lineHeight : "15px",
        width : "auto",
        display : "block"
    }

    const paraStyle = {
        margin : "15px 50px",
    }

    return (
        <div style={showStyle}>
            <p>Time : {props.time} </p>
            <p>Executive :  <p style={paraStyle}>No. of Seats = {props.executive}</p> <p style={paraStyle}>Price = {props.executivePrice}</p> </p>
            <p>Club : <p style={paraStyle}>No. of Seats = {props.club}</p>  <p style={paraStyle}>Price = {props.clubPrice}</p>  </p>
            <p>Platinum : <p style={paraStyle}>No. of Seats = {props.platinum}</p>  <p style={paraStyle}>Price = {props.platinumPrice}</p>  </p>
        </div>
    );
}

export default MovieShow ;