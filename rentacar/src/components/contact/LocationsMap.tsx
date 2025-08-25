import { useCallback, useMemo, useState, useEffect } from 'react';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import type { Location, Id } from '../../domain/rentals';

type Props = {
  locations: Location[];
  pickupIds?: Id[];
  returnIds?: Id[];
  height?: number;
  zoom?: number;
};

const containerStyle = (h: number) => ({
  width: '100%',
  height: `${h}px`,
  borderRadius: '15px',
});

const ICONS = {
  pickup: 'https://maps.google.com/mapfiles/ms/icons/blue-dot.png',
  return: 'https://maps.google.com/mapfiles/ms/icons/green-dot.png',
  both: 'https://maps.google.com/mapfiles/ms/icons/purple-dot.png',
  other: 'https://maps.google.com/mapfiles/ms/icons/red-dot.png',
};

export default function LocationsMap({
  locations,
  pickupIds = [],
  returnIds = [],
  height = 420,
  zoom = 12,
}: Props) {
  const { isLoaded } = useJsApiLoader({
    id: 'google-map',
    googleMapsApiKey: import.meta.env.VITE_GOOGLE_MAPS_API_KEY as string,
  });

  const [map, setMap] = useState<google.maps.Map | null>(null);

  const markers = useMemo(() => {
    const p = new Set(pickupIds);
    const r = new Set(returnIds);
    return locations.map((l) => {
      const isP = p.has(l.id);
      const isR = r.has(l.id);
      const icon =
        isP && isR
          ? ICONS.both
          : isP
          ? ICONS.pickup
          : isR
          ? ICONS.return
          : ICONS.other;
      return { ...l, icon, isP, isR };
    });
  }, [locations, pickupIds, returnIds]);

  const onLoad = useCallback((m: google.maps.Map) => {
    setMap(m);
  }, []);

  const onUnmount = useCallback(() => {
    setMap(null);
  }, []);

  useEffect(() => {
    if (!map || markers.length === 0 || !window.google) return;
    const bounds = new window.google.maps.LatLngBounds();
    markers.forEach((m) => bounds.extend({ lat: m.lat, lng: m.lng }));
    if (markers.length === 1) {
      map.setCenter({ lat: markers[0].lat, lng: markers[0].lng });
      map.setZoom(zoom);
    } else {
      map.fitBounds(bounds);
    }
  }, [map, markers, zoom]);

  if (!isLoaded) {
    return (
      <div
        className='w-full animate-pulse rounded-xl border bg-gray-100'
        style={{ height }}
      />
    );
  }

  const center = markers[0]
    ? { lat: markers[0].lat, lng: markers[0].lng }
    : { lat: 44.81, lng: 20.46 };

  return (
    <GoogleMap
      mapContainerStyle={containerStyle(height)}
      center={center}
      zoom={zoom}
      onLoad={onLoad}
      onUnmount={onUnmount}
      options={{
        mapTypeControl: false,
        streetViewControl: false,
        fullscreenControl: false,
      }}
    >
      {markers.map((m) => (
        <Marker
          key={m.id}
          position={{ lat: m.lat, lng: m.lng }}
          title={`${m.city} • ${m.name}`}
          icon={m.icon}
        />
      ))}
    </GoogleMap>
  );
}
