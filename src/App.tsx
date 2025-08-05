import React, { useState, useEffect, useCallback } from 'react';
import { useLocation } from './hooks/useLocation';
import { WeatherData } from './types/weather';
import './App.css';

function App() {
  const [weather, setWeather] = useState<WeatherData | null>(null);
  const [city, setCity] = useState<string>('İstanbul');
  const [loading, setLoading] = useState<boolean>(false);
  const { latitude, longitude, error: locationError } = useLocation();

  const API_KEY = process.env.REACT_APP_OPENWEATHER_API_KEY; // OpenWeatherMap API anahtarınızı .env dosyasından alıyoruz
  
  // API anahtarını kontrol et
  console.log('API Key:', API_KEY);
  if (!API_KEY) {
    console.error('API anahtarı bulunamadı! .env dosyasını kontrol edin.');
  }

  const fetchWeather = useCallback(async (searchCity: string = city): Promise<void> => {
    if (!API_KEY) {
      console.error('API anahtarı yok!');
      return;
    }
    
    setLoading(true);
    try {
      const API_URL = `https://api.openweathermap.org/data/2.5/weather?q=${searchCity}&appid=${API_KEY}&units=metric&lang=tr`;
      console.log('API URL:', API_URL);
      
      const response = await fetch(API_URL);
      console.log('Response status:', response.status);
      
      const data = await response.json();
      console.log('Weather data:', data);
      
      if (data.cod === 200) {
        setWeather(data);
      } else {
        console.error('API Error:', data.message);
        setWeather(data); // Hata mesajını göstermek için
      }
    } catch (error) {
      console.error('Hava durumu verisi alınamadı:', error);
      setWeather(null);
    }
    setLoading(false);
  }, [city, API_KEY]);

  const fetchWeatherByLocation = useCallback(async (): Promise<void> => {
    if (latitude && longitude) {
      setLoading(true);
      try {
        const API_URL = `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${API_KEY}&units=metric&lang=tr`;
        const response = await fetch(API_URL);
        const data: WeatherData = await response.json();
        setWeather(data);
        setCity(data.name);
      } catch (error) {
        console.error('Konum bazlı hava durumu verisi alınamadı:', error);
      }
      setLoading(false);
    }
  }, [latitude, longitude, API_KEY]);

  useEffect(() => {
    fetchWeather();
  }, [fetchWeather]);

  useEffect(() => {
    if (latitude && longitude) {
      fetchWeatherByLocation();
    }
  }, [latitude, longitude, fetchWeatherByLocation]);

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>): void => {
    e.preventDefault();
    fetchWeather();
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>🌤️ Hava Durumu Uygulaması</h1>
        
        <form onSubmit={handleSubmit} className="search-form">
          <input
            type="text"
            value={city}
            onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCity(e.target.value)}
            placeholder="Şehir adı girin..."
            className="city-input"
          />
          <button type="submit" className="search-button">
            Ara
          </button>
        </form>
        
        <div className="location-section">
          <button 
            onClick={fetchWeatherByLocation} 
            className="location-button"
            disabled={!latitude || !longitude}
          >
            📍 Mevcut Konumum
          </button>
          {locationError && (
            <div className="location-error">
              Konum erişimi reddedildi. Tarayıcı ayarlarından konum iznini etkinleştirin.
            </div>
          )}
        </div>

        {loading && <div className="loading"></div>}

        {weather && weather.cod === 200 && (
          <div className="weather-card">
            <h2>{weather.name}, {weather.sys.country}</h2>
            <div className="weather-info">
              <div className="temperature">
                {Math.round(weather.main.temp)}°C
              </div>
              <div className="description">
                {weather.weather[0].description}
              </div>
              <div className="details">
                <div className="detail-item">
                  <span>Nem:</span> {weather.main.humidity}%
                </div>
                <div className="detail-item">
                  <span>Rüzgar:</span> {weather.wind.speed} m/s
                </div>
                <div className="detail-item">
                  <span>Basınç:</span> {weather.main.pressure} hPa
                </div>
              </div>
            </div>
          </div>
        )}

        {weather && weather.cod !== 200 && (
          <div className="error">
            Şehir bulunamadı. Lütfen geçerli bir şehir adı girin.
          </div>
        )}
      </header>
    </div>
  );
}

export default App; 