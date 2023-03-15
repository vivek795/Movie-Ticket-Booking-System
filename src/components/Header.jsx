import React from "react";

const heading = {
    color: "red",
    textAlign: "center",
    padding: "30px auto",
    marginTop : "50px",
    fontFamily : "Montserrat, sans-serif"
}

function Header(){
    return (
        <div style={heading}>
        <h1>BookYourShow</h1>
      </div>
    );
}

export default Header;