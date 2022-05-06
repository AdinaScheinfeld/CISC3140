import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";

export default function SingleCar() {

  const [backendData, setBackendData] = useState([{}])
  const { carid } = useParams();
  
  useEffect(() => {
    fetch(`/api/cars/${carid}`).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  
  console.log(carid);
  return (
    <div>
      {(typeof backendData.data === 'undefined') ? (
        <p>Loading...</p>
      ): (
            <p> Car: { backendData.data.Car_ID }</p>
      )}
    </div>
  )
}