import axios from "axios";
import React, { useState } from "react";
import CloseButton from "react-bootstrap/esm/CloseButton";
import AddNewMovie from "./AddNewMovie";
import MovieBox from "./MovieBox";

function AdminTheatreBox(props){

    const [button, setButton] = useState("");
    const [movies, setMovies] = useState([]);
    const [isNew, setIsNew] = useState(false);

    // to get data from the Movies database;
    async function getMovies(){
        const path = "/login/Admin/Movies/" +  props.name + "/" + props.adminEmail + "/" + props.city + "/" + props.location;
        const res = await axios.get(path);
        const temp = res.data;

        setTimeout(()=>{
            setMovies(temp);
        },500);
    }


    


    // to handle the screening, update and delete button.
    function handleClick(event){
        const {name} = event.target;
        if(name === "screening"){
            getMovies();

            setButton(name);
        }
        else if(name === "delete"){
            const deleteTheatre = {
                name : props.name,
                city : props.city,
                location : props.location,
                adminEmail : props.adminEmail
            }
            props.onDeleteTheatre(deleteTheatre);

            setButton("");
        }

        
    }

    // to tackle new Add movie button.
    function buttonClicked(){
        const temp = !isNew;
        setIsNew(temp);
    }

    async function passData(data){
        const path  = "/login/Admin/newMovie";
        const res = await axios.post(path, data);
        console.log(res);
    }

    function newAdd(movieData){
        passData(movieData);

        setTimeout(() => {

            setMovies(prev => {
                return [ ...prev , movieData] ;
            });
    
            setIsNew(false);
        }, 500);
    }

    
    function closeClicked(){
        setButton("");
    }

    // to post data to remove a movie
    async function passRemoveData(data){
        const path = "/login/Admin/RemoveMovie";
        const res = await axios.post(path, data);
        console.log(res);
    }

    function removeMovie(data){
        passRemoveData(data);

        setTimeout(()=>{
            getMovies();
        },500);
    }


    const TheatreBox = {
        // width : "100%",
        height : "auto",
        margin : "20px 50px 20px 50px",
        padding : "20px",
        display : "flex",
        alignItems : "left",
        justifyContent : "left",
        borderRadius: "5px",
        boxShadow: "4px 3px 7px 2px #00000040",
        boxSizing: "border-box",
        backgroundColor : "#fff891",
        lineHeight : "5px"
    }

    const textStyle = {
        marginLeft : "40px"
    }

    const imageStyle = {
        widht : "200px",
        height : "200px"
    }

    const buttonStyle = {
        margin : "40px",
        textAlign : "Left"
    }

    const screeningStyle = {
        display : "flex",
        flexWrap: "wrap",
        justifyContent: "space-between"
    }


    return (
        
        <div style={TheatreBox}>
            <div>
                <img style={imageStyle} src={props.imgURL} alt="Admin theatre" />
            </div>

            <div>

                <div style={textStyle}>
                    <h2 style={{marginBottom : "15px"}}>{props.name}</h2>
                    <p>City : {props.city}</p>
                    <p>Location : {props.location}</p>
                    <p>Rating : {props.rating}</p>
                    <div>
                        <button onClick={handleClick} name="screening" style={buttonStyle} className="btn btn-sm btn-dark">Screening Movies</button>
                        <button name="update" style={buttonStyle} className="btn btn-sm btn-dark">Update Details</button>
                        <button onClick={handleClick} name="delete" style={buttonStyle} className="btn btn-sm btn-dark">Delete Theatre</button>
                    </div>
                </div>

            {
                button !=="" && (
                    <div>
                        <hr></hr>
                        {
                            (button === "screening") && (
                                <div>
                                    <div style={{display : "flex" , alignItems: "left", justifyContent : "left"}}>
                                        <h4 style={{margin : " auto auto 15px 0"}}>Movies Screening in Theatre</h4>
                                        <CloseButton onClick={closeClicked} aria-label="hide" />
                                    </div>

                                    {
                                        (movies.length === 0) ? 
                                        (
                                            <div>
                                                <p>Oops! no movies screening in this theatre</p>
                                                <p>Add movies to see.</p>
                                            </div>
                                        ):
                                        (
                                            <div style={screeningStyle}>
                                                {
                                                    movies.map((movie, index) => {
                                                        return(
                                                            <MovieBox 
                                                                key={index} 
                                                                name={movie.name} 
                                                                imdb={movie.imdb} 
                                                                genre={movie.genre} 
                                                                imgURL={movie.imgURL} 
                                                                trailer={movie.trailer}
                                                                actors={movie.actors}
                                                                showTimes={movie.showTimes}
                                                                city={movie.city}
                                                                location={movie.location}
                                                                theatre={movie.theatre}
                                                                onRemove={removeMovie}
                                                            />
                                                        )
                                                         
                                                    })
                                                }
                                            </div>
                                        )
                                    }

                                    {
                                        (!isNew) ?
                                        (   
                                            <div style={buttonStyle} >
                                                <button onClick={buttonClicked} className="btn btn-lg btn-dark">Add Movie</button>
                                            </div>
                                        ) : 
                                        
                                        (
                                            <AddNewMovie theatre={props.name} adminEmail={props.adminEmail} city={props.city} location={props.location} clicked={newAdd} />
                                        )
                                    }
                                </div>
                            )
                        }

                        {
                            (button === "update") && (<div></div>)
                        }

                        {
                            (button === "delete") && (<div></div>)
                        }

                    </div>

                )
            }

            </div>

        </div>
    );
}

export default AdminTheatreBox ;