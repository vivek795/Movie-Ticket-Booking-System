import React from "react";
import Header from "./Header";
import Login from "./Login";


const box={
    display: "flex",
    alignItems: "center",
    justifyContent: "center"
}

function Home(){
    return (
        <div >
            <Header />
            <div style={box}>
                <div className="Admin">
                    <Login name="Admin"/>
                </div>

                <div className="User">
                    <Login name="User" />
                </div>  
            </div>
        </div>
    );
}

export default Home;