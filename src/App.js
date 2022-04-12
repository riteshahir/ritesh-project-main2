import "./App.css";
import NearestRide from "./components/NearestRide";
import React, { useEffect, useState } from "react";
import UpcomingRides from "./components/UpcomingRides";
import PastRides from "./components/PastRides";

function App() {
  const [tab, setTab] = useState("nearest");
  const [user,setUser]=useState({});

  let component = <NearestRide />;

  if (tab === "nearest") {
    component = <NearestRide />;
  } else if (tab === "upcoming") {
    component = <UpcomingRides />;
  } else {
    component = <PastRides />;
  }

  useEffect(() =>{
    fetchData();
  },{});
  useEffect(() => {console.log(user)},user);

  var user_name,user_url;

  async function fetchData() {
    fetch("https://assessment.api.vweb.app/user").then(userData => {
      return userData.json();
    }).then(user => {
      return setUser(user);
    }).catch(err => {
      console.log(err);
    })
    // let userData = await fetch("https://assessment.api.vweb.app/user");
    // const user=await userData.json();
    // setUser(user);
  }


  return (
    <div className="App">
      <header className="header">
        <h1>Edvora</h1>
        <div className="profile">
          <h2>{user.name}</h2>
          <div className="header-img">
            <img src={user.url} alt="img" />
          </div>
        </div>
      </header>

      <main className="main-container">
        <div className="tabs">
          <div className="tabs-left">
            <p onClick={() => setTab("nearest")}>Nearest Rides</p>
            <p onClick={() => setTab("upcoming")}>Upcoming Rides</p>
            <p onClick={() => setTab("past")}>Past Rides</p>
          </div>
          <div className="tabs-right">
            <p>Filters</p>
          </div>
        </div>
        {component}
      </main>
    </div>
  );
}

export default App;
