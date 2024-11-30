// https://uizard.io/static/89cb1d30cdee9c19b0ce72efe004ff49/a8e47/f5e31989f816c5b15c47cd54b0eb0b30b210b6f0-1440x835.png

import {
  faCloudRain,
  faCloudSunRain,
  faDroplet,
  faList,
  faMap,
  faSearch,
  faSliders,
  faWind,
} from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React, { useState } from "react";
import styles from "../../styles/weatherApp/container.module.css";
import {
  getMultiDayWeatherData,
  getWeatherData,
} from "../../services/apiServices";
import ThumbnailsList from "./thumbnailsList/ThumbnailsList";
import {
  getDayWiseData,
  getWeatherCondition,
  getWeatherIcon,
  kelvinToCelcius,
} from "../../helpers/weatherHelper";
import WeatherList from "./weatherList/WeatherList";

function Container() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [multiDayData, setMultiDayData] = useState(null);
  const [viewMore, setViewmore] = useState(false);

  function handleChange(e) {
    setCity(e.target.value);
  }

  function handleSearch() {
    getWeatherData(city)
      .then((data) => {
        setWeather(data);
        getMultiDayWeatherData(data.id)
          .then((data) => {
            const fiveDaysData = getDayWiseData(data.list);
            setMultiDayData(fiveDaysData);
          })
          .catch((error) => {
            console.log("Error: ", error);
          });

      })
      .catch(() => { });
  }

  console.log("View More", viewMore);

  function render() {
    if (!weather) {


      return (
        <>

          <h1 style={{ color: "white", alignItems: "center", textAlign: "center", width: "100%", height: "100%", justifyContent: "center", display: "flex" }}>Please select a city to check weather of your city...!</h1>
        </>
      );
    }
    return (
      <>


        <div className={styles.maincontainer}>

          <div className={styles.tempInfoContainer}>
            <div>
              <h2 style={{ fontSize: viewMore ? "4rem" : "6rem" }}>
                {kelvinToCelcius(weather.main.temp)}
              </h2>
              <p>{getWeatherCondition(weather)}</p>
            </div>
            <div>

              <img
                className={styles.weatherImg}
                src={getWeatherIcon(weather)}
                alt=""
                style={{ height: viewMore ? "100px" : "150px" }}
              />
            </div>
          </div>
          <ThumbnailsList multiDayData={multiDayData} setWeather={setWeather} />

          <div
            className={styles.extraInfoContainer}
            style={{ padding: viewMore ? "4px" : "8px" }}
          >
            <h3 style={{ color: "#8F959D" }}>AIR CONDITIONS</h3>
            <div className={styles.extracontainer}>

              <div>
                <FontAwesomeIcon icon={faWind} className={styles.extraIcon} /><p>Speed</p>
                <p>{weather.wind.speed} km/h</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faDroplet} className={styles.extraIcon} /><p>Humidity</p>
                <p>{weather.main.humidity}</p>
              </div>
              <div>
                <FontAwesomeIcon icon={faCloudRain} className={styles.extraIcon} /><p>Rain Speed</p>
                <p>15 km/h</p>
              </div>
            </div>
          </div>
        </div>
      </>
    );
  }

  return (

    <>


      <div className={styles.videocontainer}>
        <video src="/images/back.mp4" autoPlay muted loop className={styles.video}></video>
      </div>
      <div className={styles.containerOuter}>
        <div className={styles.containerInner}>

          <div className={styles.weatherInfoContainer}>
            {viewMore === false && (
              <div className={styles.searchbarContainer}>
                <input
                  type="text"
                  placeholder="Enter city..."
                  required={true}
                  value={city}
                  onChange={handleChange}
                />
                <button onClick={handleSearch}>
                  <FontAwesomeIcon icon={faSearch} />
                </button>
              </div>
            )}
            {render()}
          </div>

          <WeatherList multiDayData={multiDayData} setWeather={setWeather} />

        </div>
      </div>
    </>
  );
}

export default Container;
