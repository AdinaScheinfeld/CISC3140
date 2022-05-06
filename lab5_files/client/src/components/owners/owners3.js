import React, { useEffect, useState } from "react";

function Cars() {

  const [backendData, setBackendData] = useState([{}])
  
  useEffect(() => {
    fetch("/api/owners").then(
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
        backendData.data.map((owner, i) => (
          <p key={i}>{owner.Name}</p>
        ))
      )}
    </div>
  )
}

export default Cars;
