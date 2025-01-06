import React, { useState, useEffect } from 'react';
import { fetchCountries } from '../services/api';

const CountrySelector = () => {
  const [countries, setCountries] = useState([]);
  const [leftTableData, setLeftTableData] = useState([]); 
  const [rightTableData, setRightTableData] = useState([]); 
  const [selectedCountries, setSelectedCountries] = useState(new Set()); 

  
  useEffect(() => {
    fetchCountries()
      .then((response) => {
        console.log(response);
        setCountries(response.data.data);
        setLeftTableData([]); 
        setRightTableData([]); 
      })
      .catch((error) => console.error('Error fetching countries:', error));
  }, []);

  
  const handleSelectCountry = (countryId) => {
    setSelectedCountries((prevSelected) => {
      const updatedSelected = new Set(prevSelected);
      if (updatedSelected.has(countryId)) {
        updatedSelected.delete(countryId); 
      } else {
        updatedSelected.add(countryId);
      }
      return updatedSelected;
    });
  };

 
  const moveToRight = () => {
    const selected = Array.from(selectedCountries);

 
    const newRightTableData = [
      ...rightTableData,
      ...countries.filter((country) => selected.includes(country.id)),
    ];

  
    setRightTableData(newRightTableData);
    setSelectedCountries(new Set()); 
  };

  
  const moveToLeft = () => {
    const selected = Array.from(selectedCountries);

   
    const newLeftTableData = [
      ...leftTableData,
      ...countries.filter((country) => selected.includes(country.id)),
    ];

   
    setLeftTableData(newLeftTableData);
    setSelectedCountries(new Set()); 
  };

  return (
    <div className="country-selector-container">
    
      <div className="table-container">
        <h2>All Countries</h2>
        <table className="country-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Country Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {countries.map((country) => (
              <tr key={country.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCountries.has(country.id)}
                    onChange={() => handleSelectCountry(country.id)}
                  />
                </td>
                <td>{country.name}</td>
                <td>{country.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      
      <div className="button-container">
        <button onClick={moveToRight}>Move Right</button>
        <button onClick={moveToLeft}>Move Left</button>
      </div>

     
   { leftTableData.length>0 &&  (<div className="table-container">
        <h2>Left Table</h2>
        <table className="country-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Country Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {leftTableData.map((country) => (
              <tr key={country.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCountries.has(country.id)}
                    onChange={() => handleSelectCountry(country.id)}
                  />
                </td>
                <td>{country.name}</td>
                <td>{country.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}

    
   { rightTableData.length>0 &&  (<div className="table-container">
        <h2>Right Table</h2>
        <table className="country-table">
          <thead>
            <tr>
              <th>Select</th>
              <th>Country Name</th>
              <th>ID</th>
            </tr>
          </thead>
          <tbody>
            {rightTableData.map((country) => (
              <tr key={country.id}>
                <td>
                  <input
                    type="checkbox"
                    checked={selectedCountries.has(country.id)}
                    onChange={() => handleSelectCountry(country.id)}
                  />
                </td>
                <td>{country.name}</td>
                <td>{country.id}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>)}
    </div>
  );
};

export default CountrySelector;
