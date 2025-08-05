import { useState, useEffect } from 'react';
import { LocationData } from '../types/weather';

export const useLocation = (): LocationData => {
  const [location, setLocation] = useState<LocationData>({
    latitude: 0,
    longitude: 0
  });

  useEffect(() => {
    if (!navigator.geolocation) {
      setLocation(prev => ({ ...prev, error: 'Geolocation desteklenmiyor' }));
      return;
    }

    const success = (position: GeolocationPosition) => {
      setLocation({
        latitude: position.coords.latitude,
        longitude: position.coords.longitude
      });
    };

    const error = (err: GeolocationPositionError) => {
      setLocation(prev => ({ 
        ...prev, 
        error: `Konum alınamadı: ${err.message}` 
      }));
    };

    navigator.geolocation.getCurrentPosition(success, error);
  }, []);

  return location;
}; 