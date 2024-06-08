import React, { useEffect, useState } from "react";
import "./css/style.css";
export default function Tempapp() {
  const [city, setcity] = useState(null);
  const [search, setsearch] = useState("Mumbai");
  const[theme,setTheme]=useState("lightTheme");
  const [buttonText,setbuttonText]=useState("Dark Mode")

  useEffect(() => {
    const fetchAPI = async () => {
      // console.log(search,"///");
      const url = `
            https://api.openweathermap.org/data/2.5/weather?q=${search}&units=metric&appid=9d2964a3c46655ef6482884d424864e8`;
      const response = await fetch(url);
      const resJson = await response.json();
      // console.log(resJson ,"....");
      setcity(resJson.main);
    };
    fetchAPI();
  }, [search]);


  function ChangeMode(){
    if(theme==="DarkTheme"){
      setTheme("lightTheme")
      setbuttonText("Click for Dark Mode") 
    }else{
      setTheme("DarkTheme")
      setbuttonText("Click for Light Mode")
      
    }
   }

 useEffect(()=>{
  document.body.className=theme;
 },[theme])


  return (
    <>
      <div className="box">
        <div className="input">
          <input
            type="search"
            className="inputFilled"
            value={search}
            onChange={(event) => {
              {
                setsearch(event.target.value);
              }
            }}
          />
        </div>

        {!city ? (
          <p>No data</p>
        ) : (
          <div className="info">
            <h1 className="location">{search}</h1>

            <h2 className="temp">Temprature : {city.temp}</h2>
            <h3 className="tempmin_max">Max Temp = {city.temp_max}</h3>
            <h3 className="tempmin_min">Min temp = {city.temp_min}</h3>
          </div>
        )}
        <button className="btn" onClick={ChangeMode}>{buttonText}</button>
      </div>
     
    </>
  );
}
