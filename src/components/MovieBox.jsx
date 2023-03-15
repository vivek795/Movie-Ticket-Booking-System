import React from "react";

function MovieBox(props){


    function handleRemove(){
        const temp = {
            name : props.name,
            theatre : props.theatre,
            location : props.location,
            city : props.city
        }

        props.onRemove(temp);

    }


    const textStyle = {
        width : "100%",
        marginLeft : "40px"
    }

    const imageStyle = {
        widht : "130px",
        height : "130px"
    }

    const movieBox = {
        // width : "100%",
        height : "auto",
        width : "900px",
        margin : "20px",
        padding : "10px",
        display : "flex",
        alignItems : "left",
        justifyContent : "left",
        borderRadius: "5px",
        boxShadow: "4px 3px 7px 2px #00000040",
        boxSizing: "border-box",
        backgroundColor : "transparent",
        lineHeight : "2px",
    }

    const removeStyle = {
        margin : "10px",
        textAlign : "right"
    }

    return (
        <div style={movieBox}>
            <div>
                <img style={imageStyle} src={props.imgURL} alt="Movie poster" />
            </div>

            <div style={textStyle}>
                <h4 style={{marginBottom : "5px"}}>{props.name}</h4>
                <p>IMDB : {props.imdb}</p>
                <p>Genre : {props.genre}</p>
                <p>Actors : {props.actors}</p>
                <p>Trailer : <a href={props.trailer}>{props.name} Trailer</a></p>
                <p>Show Times : {props.showTimes}</p>
                <div style={removeStyle} >
                    <button onClick={handleRemove} className="btn btn-sm btn-dark">Remove Movie</button>
                </div>
            </div>
        </div>
    );
}

export default MovieBox;