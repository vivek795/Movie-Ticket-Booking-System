import React from "react";
import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import NavDropdown from 'react-bootstrap/NavDropdown';

function UserNavigationbar(props){

    function handleClick(event){
        const {name}= event.target;
        // console.log(name);
        return props.linkClicked(name);
    }
    
    return (
        <div>
            <Navbar sticky="top" bg="dark" variant="dark">
                <Container>
                <Navbar.Brand style={{fontSize : "3rem"}} name="home" onClick={handleClick}>BookYourShow</Navbar.Brand>
                <Nav className="ml-auto">
                    <Nav.Link name="home" onClick={handleClick}>Home</Nav.Link>
                    <Nav.Link  name="myBookings" onClick={handleClick}>My Bookings</Nav.Link>
                    <NavDropdown title="More" id="collasible-nav-dropdown">
                        <NavDropdown.Item>My Profile</NavDropdown.Item>
                        <NavDropdown.Item name="logout" onClick={handleClick}>
                            Logout
                        </NavDropdown.Item>
                        {/* <NavDropdown.Item href="#action/3.3">Something</NavDropdown.Item>
                        <NavDropdown.Divider />
                        <NavDropdown.Item href="#action/3.4">
                            Separated link
                        </NavDropdown.Item> */}
                    </NavDropdown>
                </Nav>
                </Container>
            </Navbar>
        </div>
    );
}

export default UserNavigationbar;