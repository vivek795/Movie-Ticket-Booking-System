import React, {  useState } from "react";
import {useLocation, useNavigate} from "react-router-dom";
import axios from "axios";
import { Helmet } from "react-helmet";

function Register(){

    // to get the data sent from the previous page.
    const location = useLocation();

    const [account, setAccount] = useState({
        fname : "", lname : "", email : "", phone : "", password : ""
    });


    // to handle any change in the input.
    function handleChange(event){
        const {name,value} = event.target;

        setAccount(prev => {
            return {
                ...prev,
                [name] : value
            }
        });
    }

    // to pass the data to the backend to insert into the database.
    async function passData() {
        const path = "/register/" +  location.state.name;
        const res = await axios.post(path, account);
        console.log(res);
    };

    // to change the page on the frontend using React navigate function.
    const navigate = useNavigate();
    const goToLogin = (id) => {
        navigate("/");
    }

    
    // function called on create account function bring clicked.
    function buttonClicked(event){
        event.preventDefault();
        passData();
        goToLogin();
    }

    const registerBox = {
        textAlign: "center",
        margin: "60px auto",
        padding: "50px 200px"
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

    return (
        <div style={registerBox}>
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
                        }
                    
                    `}
                </style>
            </Helmet>
            <h1>Register as {location.state.name}</h1>
            
            <main style={formSignin} className="form-signin w-auto">
                <form>
                    <div style={entryStyle}>
                        <label style={labelStyle}>First Name : </label>
                        <input type="text" style={formControl} onChange={handleChange} className="form-control" name="fname" value={account.Fname} required></input>
                    </div>
                    
                    <div style={entryStyle}>
                        <label style={labelStyle}>Last Name : </label>
                        <input type="text" style={formControl} onChange={handleChange} className="form-control" name="lname" value={account.Lname} required ></input>
                    </div>

                    <div style={entryStyle}>
                        <label style={labelStyle}>Email : </label>
                        <input type="email" style={formControl} onChange={handleChange} className="form-control" name="email" value={account.email} required />
                    </div>

                    <div style={entryStyle}>
                        <label style={labelStyle}>Mobile no. : </label>
                        <input type="number" style={formControl} onChange={handleChange} className="form-control" name="phone" value={account.phone} max="9999999999" min="6000000000" required  />
                    </div>

                    <div style={entryStyle}>
                        <label style={labelStyle}>Create Password : </label>
                        <input type="password" style={formControl} onChange={handleChange} className="form-control" name="password" value={account.password} required />
                    </div>

                    <button onClick={buttonClicked} style={formControl}  type="submit" className="btn btn-lg btn-primary">Create Account</button>

                </form>
            </main>
        </div>
    );
}

export default Register;