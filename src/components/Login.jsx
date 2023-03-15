import axios from "axios";
import React, { useState } from "react";
import {Link, useNavigate} from "react-router-dom";
import Helmet from "react-helmet";


function Login(props){

    const [info, setInfo] = useState({
        email: "", password : ""
    });


    // to handle any change in the input.
    function handleChange(event){
        const {name, value} = event.target;
        setInfo(prev => {
            return {
                ...prev,
                [name] : value
            }
        });
    }

    // to pass the login details to the backend for verification and authentication.
    async function passData(){
        const path  = "/login/" + props.name;
        const sendInfo = info;
        const res = await axios.post(path, sendInfo);
        console.log(res);
    }


    // to get the permission from the backend.
    async function getPermission() {
        const path2  = "/login/" + props.name;
        const response = await axios.get(path2);
        const data  = response.data;
        // console.log(data);
        return data;
    }

    // to navigate if the permission is granted.
    const navigate = useNavigate();
    const loginGranted = (id) => {
        const path3  = "/login/" + props.name;
        const mail = info.email;
        const pass = info.password;
        navigate(path3, {state : {id:1, email : mail, password : pass}});
    }
    

    // function called when the login button clicked.
    async function buttonClicked(event){
        event.preventDefault();
        // console.log(info);
        passData();
        setTimeout(async ()=> {
            const permission = await getPermission();

            console.log(permission);
            console.log("hello");
            if(permission.isAccessGranted === "true"){
                loginGranted();
            }
            else{
                alert("Please Check your username and password and Login again.");
            }

            setInfo({email : "", password : ""});
        }, 500);
        
    }


    const loginBox = {
        textAlign: "center",
        margin: "100px auto",
        padding: "50px 200px"
    }


    const formSignin = {
        width: "100%",
        maxWidth: "330px",
        padding: "15px",
        margin: "auto"
    }

    const formControl = {
        margin: "10px auto"
    }


    return (

    
        
        <div style={loginBox}>

            <Helmet>
                <style>
                    {`

                        html, body {
                            height: 100%;
                            width: 100%;
                            font-family: "Montserrat", sans-serif;
                        }
                    
                        body{
                            padding-top: 40px;
                            padding-bottom: 40px;
                            background-color: #f5f5f5;
                            {/* background-image : url("https://www.henselphelps.com/wp-content/uploads/2017/08/M5A7965.jpg");
                            background-position: center;
                            background-repeat: no-repeat;
                            background-size: cover; */}
                        }
                    
                    `}
                </style>
            </Helmet>

            <h2>Login as {props.name}</h2>
            <main style={formSignin} className="form-signin w-100 m-auto">
                <form>

                    <input type="text" style={formControl} onChange={handleChange} className="form-control" name="email" value={info.email} placeholder="username or email" required />
                    <input type="password" style={formControl} onChange={handleChange} className="form-control" name="password" value={info.password} placeholder="password" required />
                    <button type="submit" style={formControl} onClick={buttonClicked} className="w-100 btn btn-sm btn-primary">Login</button>
                    <p>Don't have an account ? </p>
                    <Link to="/register" 
                        state={{
                            name : props.name 
                        }}
                    >Create Account </Link>

                </form>
            </main>   
        </div>
      
    );
}

export default Login ;