"use client";

import Container from "@/components/ui/container";
import {
  MapContainer,
  TileLayer,
  Marker,
  Polyline,
  Popup,
} from "react-leaflet";
import { useEffect, useMemo, useRef, useState } from "react";
import L from "leaflet";

const sellerIcon = new L.Icon({
  iconUrl: "/icons/seller.png",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
});

const buyerIcon = new L.Icon({
  iconUrl: "/icons/buyer.png",
  iconSize: [32, 48],
  iconAnchor: [16, 48],
});

type LatLng = { lat: number; lng: number };

interface SellerMapSectionProps {
  seller?: LatLng;
  buyer?: LatLng;
  height?: number;
}

const defaultSeller: LatLng = { lat: 37.6264, lng: -77.378 }; // Mechanicsville, VA
const defaultBuyer: LatLng = { lat: 37.5804, lng: -77.461 }; // Richmond, VA

const SellerMapSection = ({
  seller = defaultSeller,
  buyer = defaultBuyer,
  height = 580,
}: SellerMapSectionProps) => {
  const mapRef = useRef<L.Map | null>(null);
  const [routeCoords, setRouteCoords] = useState<LatLng[]>([]);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [loadingRoute, setLoadingRoute] = useState<boolean>(false);

  const initialBounds: [[number, number], [number, number]] = useMemo(
    () => [
      [buyer.lat, buyer.lng],
      [seller.lat, seller.lng],
    ],
    [buyer, seller]
  );

  // Fetch a driving route that follows roads using OSRM (free demo server)
  useEffect(() => {
    const fetchRoute = async () => {
      setLoadingRoute(true);
      setRouteError(null);
      setRouteCoords([]);
      try {
        const url = `https://router.project-osrm.org/route/v1/driving/${buyer.lng},${buyer.lat};${seller.lng},${seller.lat}?overview=full&geometries=geojson`;
        const res = await fetch(url);
        if (!res.ok) throw new Error(`OSRM error: ${res.status}`);
        const data = await res.json();
        const coords: Array<[number, number]> =
          data?.routes?.[0]?.geometry?.coordinates ?? [];
        if (!coords.length) throw new Error("No route found");
        const latLngs: LatLng[] = coords.map(([lon, lat]) => ({
          lat,
          lng: lon,
        }));
        setRouteCoords(latLngs);
      } catch (err: any) {
        setRouteError(err?.message || "Failed to fetch route");
      } finally {
        setLoadingRoute(false);
      }
    };
    fetchRoute();
  }, [buyer, seller]);

  // Fit map view to the route once available
  useEffect(() => {
    if (routeCoords.length && mapRef.current) {
      const bounds = L.latLngBounds(
        routeCoords.map((p) => L.latLng(p.lat, p.lng))
      );
      mapRef.current.fitBounds(bounds, { padding: [24, 24] });
    }
  }, [routeCoords]);

  return (
    <div className="my-6">
      <Container>
        <MapContainer
          bounds={initialBounds}
          style={{ height, width: "100%" }}
          className="w-full rounded-xl overflow-hidden border"
          scrollWheelZoom
          ref={mapRef}
        >
          <TileLayer
            url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
            attribution="&copy; OpenStreetMap contributors"
          />
          <Marker position={seller} icon={sellerIcon}>
            <Popup>Private Seller</Popup>
          </Marker>
          <Marker position={buyer} icon={buyerIcon}>
            <Popup>You (Buyer)</Popup>
          </Marker>
          {routeCoords.length > 0 && (
            <Polyline
              positions={routeCoords}
              color="#020fff"
              weight={5}
              opacity={0.9}
            />
          )}
          {routeError && (
            <Popup position={buyer} closeButton={false} autoClose={false}>
              {routeError}
            </Popup>
          )}
        </MapContainer>
        {loadingRoute && (
          <div className="text-sm text-muted-foreground mt-2">
            Fetching driving route…
          </div>
        )}
      </Container>
    </div>
  );
};

export default SellerMapSection;
