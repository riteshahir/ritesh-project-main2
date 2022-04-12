import React, { useState, useEffect } from "react";


export default function UpcomingRides() {
  const [nearestRides, setNearestRides] = useState([]);
  useEffect(() => {
    fetchRideData();
  }, []);
  useEffect(() => {
    console.log(nearestRides);
  }, [nearestRides]);

  async function fetchRideData() {
    let res = await fetch("https://assessment.api.vweb.app/rides");
    let rides = await res.json();

    res = await fetch("https://assessment.api.vweb.app/user");
    const { station_code } = await res.json();
    console.log(station_code);

    const date=new Date();

    rides.filter((r,i) => {
      return r.date>date;
    })


    setNearestRides(rides);
  }

  return <div>UpcomingRides</div>;
}
