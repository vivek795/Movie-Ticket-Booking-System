import axios from "axios";
import React, { useState } from "react";
import AddNewTheatre from "./AddNewTheatre";
import AdminTheatreBox from "./AdminTheatreBox";


function MyTheatres(props){

    // console.log("Hello");
    // console.log(props.dbTheatres.myDBTheatre);

    const [theatres, setTheatre] = useState(props.dbTheatres.myDBTheatre);
    const [isNew , setIsNew] = useState(false);
    

    
    // console.log(props.adminEmail);

    function buttonClicked(){
        const temp = !isNew;
        setIsNew(temp);
    }

    async function passData(data){
        const path  = "/login/admin/myTheatres";
        const res = await axios.post(path, data);
        console.log(res);
    }

    function newAdd(theatreData){
        // console.log(theatreData);
        passData(theatreData);

        setTimeout(() => {

            setTheatre(prev => {
                return [ ...prev , theatreData] ;
            });
    
            setIsNew(false);
        }, 500);
    }


    // to get theatres again.
    async function getTheatres(){
        const sendMail = props.adminEmail;
        const res = await axios.get("/login/Admin/" + sendMail) ;
        const newTheatreData = res.data;
        setTimeout(()=>{
            setTheatre(newTheatreData);
        },200);
    }


    // to pass data for deleting a theatre in database.
    async function passDeleteData(details){
        const deleteTheatre = details;

        const deletePath = "/login/Admin/DeleteTheatre";

        const res = await axios.post(deletePath, deleteTheatre);
        console.log(res);
    }

    // to delete a theatre.
    function deleteTheatre(details){
        passDeleteData(details);

        setTimeout(()=>{
            getTheatres();
        },100);
    }


    const h3Heading = {
        margin : "100px 30px",
        backgroundColor : "grey",
        display : "inline-block",
        padding : "20px",
        borderRadius : "20px"
    }

    const buttonStyle = {
        margin : "60px 30px 30px 30px",
        textAlign : "center"
    }

    return (
        <div>

            <div style = {h3Heading}>
                <h2>Theatres in Control </h2>
            </div>


            <div>
            {
                (theatres.length !== 0) ?
                (
                    theatres.map((theatre,index) => {
                        return(
                            <AdminTheatreBox 
                                key={index} 
                                name={theatre.name}
                                city={theatre.city}
                                location={theatre.location}
                                rating={theatre.rating}
                                imgURL={theatre.imgURL}
                                adminEmail = {theatre.adminEmail}
                                onDeleteTheatre = {deleteTheatre}
                            />
                        ) 
                    }) 
                ) :
                (

                    <div style={{textAlign : "center", margin : "50px"}}>
                        <h1>Sorry! You have not added any theatres yet.</h1>
                        <p>To add new theatre please click on "Add Theatre" button below.</p>
                    </div>
                )
            }
            </div>
            
            {
                (!isNew) ?
                (   
                    <div style={buttonStyle} >
                        <button onClick={buttonClicked} className="btn btn-lg btn-dark">Add Theatre</button>
                    </div>
                ) : 
                
                (
                    <AddNewTheatre adminEmail={props.adminEmail} clicked={newAdd} />
                )
            }

        </div>
    );
}

export default MyTheatres;