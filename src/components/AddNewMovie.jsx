import React, { useState } from "react";
import MovieShow from "./MovieShow";

function AddNewMovie(props){
    const [addNew , setNew] = useState({name : "", city: props.city , location : props.location , adminEmail : props.adminEmail, theatre : props.theatre , imdb : "", genre : "", actors: "", trailer : "",  imgURL : "", showTimes : "", shows : []});
    const [show , setShow] = useState({time : "", executive : "", club : "", platinum : "", executivePrice : "", clubPrice : "", platinumPrice : ""});
    const [newShows, setNewShows] = useState([]);

    function handleChange(event){
        const {name, value} = event.target;
        setNew(prev => {
            return {
                ...prev,
                [name] : value
            }
        });
    }

    function handleClick(event){
        event.preventDefault();
        props.clicked(addNew);
    }

    function handleShow(event){
        const {name, value} = event.target;

        setShow(prev => {
            return {
                ...prev,
                [name] : value
            }
        })
    }

    function addShow(event){
        event.preventDefault();

        setNewShows(prev => {
            return [
                ...prev,show
            ]
        });

        addNew.shows.push(show);
        setNew(addNew);

        setShow({time : "", executive : "", club : "", platinum : "",executivePrice : "", clubPrice : "", platinumPrice : ""});

    }

    const formSignin = {
        width: "100%",
        maxWidth: "600px",
        padding: "15px",
        margin: "auto"
    }

    const formControl = {
        margin: "10px auto"
    }

    const entryStyle = {
        width : "100%",
        display : "flex",
        alignItems : "center",
        justifyContent : "center",
    }

    const labelStyle = {
        width: "300px",
        marginRight : "10px"
    }

    const buttonStyle = {
        textAlign : "center",
        margin : "30px"
    }

    return (
        <div>
            <hr></hr>
            <form style={formSignin} className="form-signin w-100 m-auto">

                <div style={entryStyle}>
                    <label style={labelStyle}>Name of Movie : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="name" value={addNew.name} placeholder="Name of Movie" required />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle} >IMDB : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="imdb" value={addNew.imdb} placeholder="IMDB" required />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Genre : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="genre" value={addNew.genre} placeholder="Genre" required />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Actors : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="actors"  value={props.actors} placeholder="Actors" required />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Trailer Link : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="trailer" value={addNew.trailer} placeholder="trailer" required />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Image link : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="imgURL" value={addNew.imgURL} placeholder="Image Link" required />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Show Times : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="showTimes" value={addNew.showTimes} placeholder="Show Times" required />
                </div>

                <div >
                    <label style={{...labelStyle, marginTop: "20px"}}>Shows : </label>
                    <div>
                        {
                            newShows.map((element, index) => {
                                return (
                                    <MovieShow key={index} time = {element.time} executive = {element.executive} club = {element.club} platinum = {element.platinum} executivePrice={element.executivePrice} clubPrice={element.clubPrice} platinumPrice={element.platinumPrice} />
                                )
                            })
                        }

                    </div>
                    <div style={{maxWidth : "400px", margin: "10px auto 50px auto"}}>
                        <form>
                            <div style={entryStyle}>
                                <label style={labelStyle}>Time : </label>
                                <input onChange={handleShow} style={formControl} className="form-control" name= "time" type="text" value={show.time} placeholder="time" required/>
                            </div>

                            <div style={entryStyle}>
                                <label style={labelStyle} >Executive : </label>
                                <input onChange={handleShow} style={formControl} className="form-control" name= "executive" type="number" value={show.executive} placeholder="No. of Seats" required />
                                <input onChange={handleShow} style={{...formControl, marginLeft: "10px"}} className="form-control" name= "executivePrice" type="number" value={show.executivePrice} placeholder="Price" required />
                            </div>

                            <div style={entryStyle}>
                                <label style={labelStyle} >Club : </label>
                                <input onChange={handleShow} style={formControl} className="form-control" name= "club" type="number" value={show.club} placeholder="No. of Seats" required />
                                <input onChange={handleShow} style={{...formControl, marginLeft: "10px"}} className="form-control" name= "clubPrice" type="number" value={show.clubPrice} placeholder="Price" required />
                            </div>
                            
                            <div style={entryStyle}>
                                <label style={labelStyle} >Platinum : </label>
                                <input onChange={handleShow} style={formControl} className="form-control" name= "platinum" type="number" value={show.platinum} placeholder="No. of Seats" required/>
                                <input onChange={handleShow} style={{...formControl, marginLeft: "10px"}} className="form-control" name= "platinumPrice" type="number" value={show.platinumPrice} placeholder="Price" required/>
                            </div>

                            <div style={{textAlign : "center", margin : "10px"}}>
                                <button onClick={addShow} className="btn btn-sm btn-dark">Add Show</button>
                            </div>

                        </form>
                    </div>
                </div>

                <div style={buttonStyle}>
                    <button onClick={handleClick} className="btn btn-lg btn-dark">Add Movie</button>
                </div>
            
            </form>
        </div>
    );
}

export default AddNewMovie;