import React, { useState } from "react";

function AddNewTheatre(props){

    const [addNew , setNew] = useState({name : "", city: "", location : "", adminEmail : props.adminEmail , rating : "", imgURL : ""});

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
                    <label style={labelStyle}>Name of Theatre : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="name" value={addNew.name} placeholder="Name of Theatre" />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle} >City : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="city" value={addNew.city} placeholder="City" />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Location : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="location" value={addNew.location} placeholder="Location" />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Email of Admin : </label>
                    <input type="email" onChange={handleChange} style={formControl} className="form-control" name="adminEmail"  value={props.adminEmail} />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Rating : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="rating" value={addNew.rating} placeholder="Rating" />
                </div>

                <div style={entryStyle}>
                    <label style={labelStyle}>Image link : </label>
                    <input type="text" onChange={handleChange} style={formControl} className="form-control" name="imgURL" value={addNew.imgURL} placeholder="Image Link" />
                </div>

                <div style={buttonStyle}>
                    <button onClick={handleClick} className="btn btn-lg btn-dark">Add Theatre</button>
                </div>
            
            </form>
        </div>
    );
}

export default AddNewTheatre;