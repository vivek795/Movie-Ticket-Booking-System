import React from "react";
import Header from "./components/Header";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Register from "./components/Register";
import Admin from "./components/Admin";
import Home from "./components/Home";
import User from "./components/User folder/User";


function App(){

  
  // const onButtonClick = useCallback(async () => {
  //   const res = await axios.post("/home", data);
  //   console.log("hello");
  //   console.log(res);
  // },[data]);

 

  // useEffect( () => {
  //     fetch("/home")
  //     .then(
  //       res => res.json()
  //     )
  //     .then(
  //       data => setData(data)
  //     )
  // }, []);


  return (
    <div>
      

      <BrowserRouter>
        
        <Routes>
          <Route path="/" element={
            <Home/>
          } />

          <Route path="/register" element={
            <div className="box">
              <Header />
              <Register></Register>
            </div>
          } />


          <Route path="/login/User" element={
              <User />
          } />
          
          <Route path="/login/Admin" element={
              <Admin/>
          } />

          {/* <Route path="/login/Admin/mytheatres" element = {
              <MyTheatres />
          } />  */}

        </Routes>
      </BrowserRouter>

      
      


    </div>
  );
}

export default App ;