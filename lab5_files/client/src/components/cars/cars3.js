import React, { useEffect, useState } from "react";
import { useSearchParams } from 'react-router-dom'

function Cars() {

  const [backendData, setBackendData] = useState([{}]);
  const [searchParams, setSearchParams] = useSearchParams();

  const searchTerm = searchParams.get('year') || '';

  const handleSearch = event => {
    const year = event.target.value;

    if(year) {
        setSearchParams({ year });
        
    } else {
        setSearchParams({});
    }
  };
  
  useEffect(() => {
    fetch(`/api/cars?year=${searchParams}`).then(
      response => response.json()
    ).then(
      data => {
        setBackendData(data)
      }
    )
  }, [])
  
  return (
    <div>
      <h1>Cars: </h1>
      <input type="text" value={ searchTerm } onChange={ handleSearch } />
        {backendData.data
        .filter(car => car.year.includes(searchTerm))
        .map((car, i) => (
            <p key={i}>{car.Car_ID}</p>
          ))}
      
    </div>
  )
}

export default Cars;
