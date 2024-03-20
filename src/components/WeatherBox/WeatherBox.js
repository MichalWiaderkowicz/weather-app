import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback, useState } from "react";

const WeatherBox = (props) => {
  const [weatherData, setWeatherData] = useState("");
  const handleCityChange = useCallback((city) => {
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db0acb1792004fc9c27cbedbddb090d1&units=metric`
    )
      .then((res) => res.json())
      .then((data) => {
        setWeatherData({
          city: data.name,
          temp: data.main.temp,
          icon: data.weather[0].icon,
          description: data.weather[0].main,
        });
      });
  }, []);
  console.log(weatherData);
  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary weatherData={weatherData} />
      <Loader />
    </section>
  );
};

export default WeatherBox;
