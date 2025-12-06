"use client";
import { GoogleMap, Marker, useLoadScript } from "@react-google-maps/api";
import { useEffect, useRef } from "react";

type Coords = { lat: number | null; lng: number | null };

export default function ProfileMap({
  coords,
  setCoords,
}: {
  coords: Coords;
  setCoords: React.Dispatch<React.SetStateAction<Coords>>;
}) {
  const { isLoaded } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY!,
  });

  const mapRef = useRef<google.maps.Map | null>(null);

  useEffect(() => {
    if (!mapRef.current) return;
    const { lat, lng } = coords || {};
    if (lat !== null && lng !== null) {
      mapRef.current.panTo({ lat, lng });
    }
  }, [coords]);

  if (!isLoaded) return <p>Loading map...</p>;

  const center =
    coords?.lat !== null && coords?.lng !== null
      ? { lat: coords.lat as number, lng: coords.lng as number }
      : { lat: 23.8103, lng: 90.4125 }; // fallback

  return (
    <div className="h-[400px] w-full">
      <GoogleMap
        center={center}
        zoom={coords?.lat !== null && coords?.lng !== null ? 15 : 5}
        mapContainerStyle={{ width: "100%", height: "100%" }}
        onLoad={(map) => {
          mapRef.current = map;
        }}
        onClick={(e) => {
          const lat = e.latLng?.lat();
          const lng = e.latLng?.lng();
          if (typeof lat === "number" && typeof lng === "number") {
            setCoords({ lat, lng });
          }
        }}
      >
        {coords?.lat !== null && coords?.lng !== null && (
          <Marker
            position={{ lat: coords.lat as number, lng: coords.lng as number }}
            draggable
            onDragEnd={(e) => {
              const lat = e.latLng?.lat();
              const lng = e.latLng?.lng();
              if (typeof lat === "number" && typeof lng === "number") {
                setCoords({ lat, lng });
              }
            }}
          />
        )}
      </GoogleMap>
    </div>
  );
}
