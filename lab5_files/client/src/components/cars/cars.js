import React, { useEffect, useState } from "react";

function Cars() {

  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/api/cars").then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  
  return (
    <div>
      {(typeof backendData.data === 'undefined') ? (
        <p>Loading...</p>
      ): (
        backendData.data.map((car, i) => (
          <p key={i}>{car.Car_ID}</p>
        ))
      )}
    </div>
  )
}

export default Cars;
