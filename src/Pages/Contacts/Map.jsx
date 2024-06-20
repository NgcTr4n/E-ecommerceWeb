import React, { useEffect, useRef } from 'react';

const Map = ({ address }) => {
  const mapRef = useRef(null);

  useEffect(() => {
    if (!address || !window.google) return;

    const geocoder = new window.google.maps.Geocoder();
    const map = new window.google.maps.Map(mapRef.current, {
      center: { lat: 0, lng: 0 },
      zoom: 12,
    });

    geocoder.geocode({ address }, (results, status) => {
      if (status === 'OK' && results.length > 0) {
        const location = results[0].geometry.location;
        map.setCenter(location);

        new window.google.maps.Marker({
          position: location,
          map,
          title: address,
        });
      }
    });
  }, [address]);

  return <div ref={mapRef} style={{ width: '100%', height: '400px' }} />;
};

export default Map;
