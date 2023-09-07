import { useEffect, useState } from 'react';

interface GeolocationData {
   coords: {
      latitude: number;
      longitude: number;
      altitude: number | null;
      accuracy: number;
      altitudeAccuracy: number | null;
      heading: number | null;
      speed: number | null;
   };
   timestamp: number;
}

interface GeolocationError {
   code: number;
   message: string;
}

interface GeolocationOptions {
   enableHighAccuracy?: boolean;
   timeout?: number;
   maximumAge?: number;
}

interface GeolocationResult {
   loading: boolean;
   error: GeolocationError | null;
   data: GeolocationData;
}

export default function useGeolocation(
   options: GeolocationOptions
): GeolocationResult {
   const [loading, setLoading] = useState(true);
   const [error, setError] = useState<GeolocationError | null>(null);
   const [data, setData] = useState<GeolocationData | null>(null);

   useEffect(() => {
      const successHandler = (e: GeolocationPosition) => {
         setLoading(false);
         setError(null);
         setData({
            coords: {
               latitude: e.coords.latitude,
               longitude: e.coords.longitude,
               altitude: e.coords.altitude,
               accuracy: e.coords.accuracy,
               altitudeAccuracy: e.coords.altitudeAccuracy,
               heading: e.coords.heading,
               speed: e.coords.speed
            },
            timestamp: e.timestamp
         });
      };

      const errorHandler = (e: GeolocationPositionError) => {
         setError({ code: e.code, message: e.message });
         setLoading(false);
      };

      const id = navigator.geolocation.watchPosition(
         successHandler,
         errorHandler,
         options
      );

      return () => navigator.geolocation.clearWatch(id);
   }, [options]);

   return { loading, error, data: data };
}
