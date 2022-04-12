import React, { useEffect, useState } from "react";

export default function PastRides() {

  const [pastRides,setPastRides]= useState([]);

  useEffect(() => {
    fetchData();
  },[]);
  

  const date=new Date();
  // console.log(date);

  async function fetchData(){
    await fetch("https://assessment.api.vweb.app/rides").then(res => {
      return res.json();
    }).then(rides => {
      return setPastRides(rides);
    }).catch(err =>{
      console.log(err);
    })

    pastRides.filter((element,index) => {
      return element.date < date;
    })

  }

  function formStationPath(station_path) {
    let ans='[';
    station_path.forEach((element,index) => {
      ans+=element;
      if(index!==station_path.length-1)
        ans+=", ";
    });
    ans+=']';
    return ans;
  }

  return (
    pastRides && 
    pastRides.map((item, i) => {
      return (
        <div className="card" key={i}>
          <div className="card-img">
            <img src={item.map_url} alt="card-img" />
          </div>
          <div className="card-detail">
            <p>Ride Id: {item.id}</p>
            <p>Origin Station: {item.origin_station_code}</p>
            <p>station_path: {formStationPath(item.station_path)}</p>
            <p>Date: {item.date}</p>
            <p>Distance: {item.distance}</p>
          </div>
          <div className="card-place">
            <p>{item.city}</p>
            <p>{item.state}</p>
          </div>
        </div>
      );
    })
  )
}
