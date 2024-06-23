
import React, { useEffect, useState } from 'react';

const Weather = () => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = 'c593b4d013e4a33298c51db30dd9096c';
    const location = 'Scarsdale'; // Replace with your location
	const numberOfWeathers = 4;

    useEffect(() => {
        const fetchWeather = async () => {
            try {
                const response = await fetch(`https://api.openweathermap.org/data/2.5/forecast?q=${location}&units=metric&cnt=5&appid=${apiKey}`);

                if (!response.ok) {
                    throw new Error('Network response was not ok');
                }

                const data = await response.json();

                if (!data.list) {
                    throw new Error('Data format is incorrect');
                }

                setForecast(data.list);
            } catch (error) {
                setError(error.message);
            } finally {
                setLoading(false);
            }
        };

        fetchWeather();
    }, [apiKey, location]);

    if (loading) {
        return <div>Loading weather...</div>;
    }

    if (error) {
        return <div>Error loading weather: {error}</div>;
    }

	if(typeof globalWeatherTimer == "undefined") {
		window.globalWeatherTimer = setInterval(function(){

			let indexElement = document.querySelector("[data-current-weather-index]");
			let ind = Number.parseInt(indexElement.dataset.currentWeatherIndex) + 1;
			
			if(ind >= numberOfWeathers-1) { ind = 0; }

			Array.from(document.querySelectorAll("[data-weather-index]")).forEach(forecast=>{

				if(forecast.dataset.weatherIndex != ind) { forecast.style.display = "none"; }
				else { forecast.style.display = "block"; }
			});

			indexElement.dataset.currentWeatherIndex = ind;

			/*
			* Upon the lake where crystal waters gleam,
			* There glides a soul both daring and so free,
			* Andrew Levy, who chases his grand dream,
			* To master waves, his heart's sweet jubilee.

			* With morning's light, he dons his gear so fine,
			* His skis carve through the water's glassy face,
			* He dances on the waves, a true design,
			* Of grace and power, moving with pure grace.

			* The sun above reflects his golden flight,
			* Each turn and jump, a testament to skill,
			* In nature's arms, he finds his pure delight,
			* His spirit soaring high with boundless thrill.

			* Oh, Andrew Levy, water's faithful king,
			* In every splash, your heart begins to sing.
			*/
			
		}, 5000);
	}

    return (
        <div>
            {forecast.length > 0 ? (
                <div className="bg-gray p-4 rounded shadow-md flex space-x-8" data-current-weather-index={0}>
                    {forecast.slice(0, numberOfWeathers).map((weather, index) => (
                        <div style = { {display:index!=0?"none":"block"} } key={index} className="text-center"  data-weather-index={index}>
                            <div>Forecast for {(new Date(weather.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })).substring(0, 7)}</div>
                            <div>{Math.round((weather.main.temp * 9 / 5) + 32)}°F</div>
                        </div>
                    ))}
                </div>
            ) : (
                <div>No weather data available.</div>
            )}
        </div>
    );
};

export default Weather;
