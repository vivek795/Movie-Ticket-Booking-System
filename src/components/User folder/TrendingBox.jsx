import React from "react";

function TrendingBox(props){

    const trendingBoxStyle = {
        width : "auto",
        maxWidth : "380px",
        borderRadius: "10px",
        boxShadow: "4px 3px 7px 2px #00000040",
        padding: "10px",
        boxSizing: "border-box",
        backgroundColor : "grey",
        // display: "flex",
        flexWrap: "wrap",
        justifyContent: "centre",
        margin : "50px"
    }

    const imgStyle = {
        width : "300px",
        height : "300px",
        margin : "20px"
    }

    return (
        <div style={trendingBoxStyle}>
            <div>
                <img style={imgStyle} src={props.imgURL} alt="booking pic"></img>
            </div>

            <div>
                <h4 style={{textAlign : "center", marginBottom : "20px"}}>{props.name}</h4>
            </div>
        </div>
    );
}

export default TrendingBox;