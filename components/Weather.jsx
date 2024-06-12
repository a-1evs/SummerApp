
import React, { useEffect, useState } from 'react';

const Weather = () => {
    const [forecast, setForecast] = useState([]);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    const apiKey = 'c593b4d013e4a33298c51db30dd9096c';
    const location = 'Scarsdale'; // Replace with your location

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


    return (
        <div>
            {forecast.length > 0 ? (
                <div className="bg-gray p-4 rounded shadow-md flex space-x-8" >
                    {forecast.slice(0, 3).map((weather, index) => (
                        <div key={index} className="text-center" >
                            <div>{(new Date(weather.dt * 1000).toLocaleTimeString([], { hour: 'numeric', minute: '2-digit' })).substring(0, 5)}</div>
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
