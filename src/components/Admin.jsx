import React, { useState } from "react";
import Navigationbar from "./Navbar";
import famousTheatresData from "../famousTheatresData.js";
import TheaterBox from "./TheaterBox";
import {  useLocation, useNavigate } from "react-router-dom";
import MyTheatres from "./MyTheatres";
import { Helmet } from "react-helmet";
import axios from "axios";


function Admin(){

    const location = useLocation();
    const [option, setOption] = useState("home");
    const [adminTheatres, setAdminTheatres] = useState([]);

    const famousStyle = {
        backgroundColor : "rgb(128, 212, 193)",
        marginTop : "40px",
        marginBottom : "50px",
        padding : "10px 50px 10px 10px",
        display : "inline-block",
        borderTopRightRadius : "20px",
        borderBottomRightRadius : "20px",
        boxSizing: "border-box"
    }

    const buttonStyle = {
        textAlign : "center",
        margin: "30px"
    }

    // to get the initialy added theatres from the database
    async function getTheatres(){
        const sendMail = location.state.email;
        const res = await axios.get("/login/Admin/" + sendMail) ;
        const myTheatres = res.data;
        // console.log(myTheatres);
        return myTheatres;
    }

    // var adminTheatres = [];

    const navigate = useNavigate();
    function logout(){
        navigate("/");
    }

    async function linkClicked(checkValue){
        if(checkValue==="myTheatres"){
            const temp = await getTheatres();
            setAdminTheatres(temp);
        }
        else if(checkValue === "logout"){
            logout();
        }

        setTimeout(()=>{
            setOption(checkValue);
        }, 500);
    }

    async function buttonClicked(){
        const temp = await getTheatres();
        setAdminTheatres(temp);
        // console.log(adminTheatres);
        setTimeout(()=>{
            setOption("myTheatres");
        }, 500);
    }

    return (
        <div data-testid = "famous-theatres">


            <Helmet>
                <style>
                    {`

                        html, body {
                            height: auto;
                            width: 100%;
                            font-family: "Montserrat", sans-serif;
                        }
                    
                        body{
                            padding-bottom: 40px;
                            background-color: #f5f5f5;
                        }
                    
                    `}
                </style>
            </Helmet>


            <Navigationbar linkClicked = {linkClicked} />
            {
                (
                    (option==="home")?
                    (
                        <div>
                            <div style={famousStyle} className="famous">
                                <h3 >Famous Theatres</h3>
                            </div>

                            <div style={{display : "flex", flexWrap : "wrap", justifyContent : "center"}}>
                                {
                                    famousTheatresData.map((theatreData,index) => {
                                        return (
                                            <TheaterBox key={index} imgURL={theatreData.imgURL} name={theatreData.name} location={theatreData.location}/>
                                        );
                                    })
                                }
                            </div>

                            <div style={buttonStyle}>
                                <button onClick={buttonClicked} className="btn btn-lg btn-dark">Add My Theatres</button>
                            </div>
                        </div>
                    ) :
                    <div>
                        {/* {console.log("hello in second div")}
                        {console.log(option)}
                        {console.log(adminTheatres)} */}
                        <MyTheatres adminEmail = {location.state.email} dbTheatres = {{myDBTheatre : adminTheatres}} />
                    </div>
                )
            }

            

            
            
        </div>
    )
}

export default Admin;