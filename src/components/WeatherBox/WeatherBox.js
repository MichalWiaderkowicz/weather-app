import PickCity from "../PickCity/PickCity";
import WeatherSummary from "../WeatherSummary/WeatherSummary";
import Loader from "../Loader/Loader";
import { useCallback, useState } from "react";
import ErrorBox from "../ErrorBox/ErrorBox";

const WeatherBox = (props) => {
  const [weatherData, setWeatherData] = useState("");
  const [pending, setPending] = useState(false);
  const [error, setError] = useState(false);

  const handleCityChange = useCallback((city) => {
    setError(false);
    setPending(true);
    fetch(
      `http://api.openweathermap.org/data/2.5/weather?q=${city}&appid=db0acb1792004fc9c27cbedbddb090d1&units=metric`
    ).then((res) => {
      if (res.status === 200) {
        return res.json().then((data) => {
          setWeatherData({
            city: data.name,
            temp: data.main.temp,
            icon: data.weather[0].icon,
            description: data.weather[0].main,
          });
          setPending(false);
        });
      } else {
        setError(true);
      }
    });
  }, []);
  console.log(weatherData, pending);
  return (
    <section>
      <PickCity action={handleCityChange} />
      <WeatherSummary weatherData={weatherData} />
      {pending && !error && <Loader />}
      {error && <ErrorBox />}
    </section>
  );
};

export default WeatherBox;
