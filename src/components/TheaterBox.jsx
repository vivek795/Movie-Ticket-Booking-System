import React from "react";

function TheaterBox(props){

    const boxStyle = {
        borderRadius: "10px",
        boxShadow: "4px 3px 7px 2px #00000040",
        padding: "1rem",
        boxSizing: "border-box",
        backgroundColor : "rgb(247, 246, 179)",
        textAlign : "center",
        fontSize : "1rem",
        margin : "50px"
    }

    const imgURL = {
        width : "300px",
        height : "300px",
        display: "block",
        margin : "10px"
    }


    return(
        <div style={boxStyle}>
            <img style={imgURL} src={props.imgURL} alt= "theatre" />
            <h2 data-testid = "check">{props.name}</h2>
            <p>Location : {props.location}</p>
        </div>
    );
}

export default TheaterBox;