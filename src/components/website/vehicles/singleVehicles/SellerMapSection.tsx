"use client";

import Container from "@/components/ui/container";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";

// TypeScript declarations for Google Maps API
declare global {
  interface Window {
    google: typeof google;
    initGoogleMaps: () => void;
  }
}

type LatLng = { lat: number; lng: number };

interface SellerMapSectionProps {
  seller: LatLng;
  buyer: LatLng;
  height?: number;
}

const SellerMapSection = ({
  seller,
  buyer,
  height = 580,
}: SellerMapSectionProps) => {
  const hasValidCoords =
    seller.lat !== 0 && seller.lng !== 0 && buyer.lat !== 0 && buyer.lng !== 0;
  const mapRef = useRef<HTMLDivElement>(null);
  const googleMapRef = useRef<google.maps.Map | null>(null);
  const directionsServiceRef = useRef<google.maps.DirectionsService | null>(
    null,
  );
  const directionsRendererRef = useRef<google.maps.DirectionsRenderer | null>(
    null,
  );
  const [isLoaded, setIsLoaded] = useState(false);
  const [routeError, setRouteError] = useState<string | null>(null);
  const [mapError, setMapError] = useState<string | null>(null);

  const initializeMap = () => {
    console.log("Initializing map...");
    console.log("mapRef.current:", mapRef.current);
    console.log("window.google:", window.google);
    console.log("API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

    if (!mapRef.current) {
      setMapError("Map container not found");
      return;
    }

    if (!window.google) {
      setMapError("Google Maps API not loaded");
      return;
    }

    try {
      // Initialize map
      const map = new google.maps.Map(mapRef.current, {
        center: {
          lat: (buyer.lat + seller.lat) / 2,
          lng: (buyer.lng + seller.lng) / 2,
        },
        zoom: 10,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
      });

      console.log("Map created successfully:", map);
      googleMapRef.current = map;

      // Add seller marker
      const sellerMarker = new google.maps.Marker({
        position: seller,
        map: map,
        title: "Private Seller",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/red-dot.png",
          scaledSize: new google.maps.Size(32, 32),
        },
      });

      // Add buyer marker
      const buyerMarker = new google.maps.Marker({
        position: buyer,
        map: map,
        title: "You (Buyer)",
        icon: {
          url: "https://maps.google.com/mapfiles/ms/icons/blue-dot.png",
          scaledSize: new google.maps.Size(32, 32),
        },
      });

      console.log("Markers created:", { sellerMarker, buyerMarker });

      // Initialize directions service and renderer
      directionsServiceRef.current = new google.maps.DirectionsService();
      directionsRendererRef.current = new google.maps.DirectionsRenderer({
        suppressMarkers: true, // We already have custom markers
        polylineOptions: {
          strokeColor: "#4285F4",
          strokeWeight: 4,
          strokeOpacity: 0.8,
        },
      });
      directionsRendererRef.current.setMap(map);

      // Calculate and display route
      calculateRoute();

      setMapError(null); // Clear any previous errors
    } catch (error) {
      console.error("Error initializing map:", error);
      setMapError(`Failed to initialize map: ${error}`);
    }
  };

  const calculateRoute = () => {
    if (!directionsServiceRef.current || !directionsRendererRef.current) return;

    setRouteError(null);

    directionsServiceRef.current.route(
      {
        origin: buyer,
        destination: seller,
        travelMode: google.maps.TravelMode.DRIVING,
      },
      (result, status) => {
        if (status === "OK" && result) {
          directionsRendererRef.current?.setDirections(result);
        } else {
          setRouteError("Could not calculate driving directions");
          console.error("Directions request failed:", status);
        }
      },
    );
  };

  useEffect(() => {
    // Set up global callback for Google Maps
    (window as any).initGoogleMaps = () => {
      console.log("Google Maps callback triggered");
      setIsLoaded(true);
    };

    return () => {
      // Cleanup
      delete (window as any).initGoogleMaps;
    };
  }, []);

  useEffect(() => {
    if (isLoaded && hasValidCoords) {
      initializeMap();
    }
  }, [isLoaded, buyer, seller, hasValidCoords]);

  return (
    <>
      <Script
        src={`https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=geometry&callback=initGoogleMaps`}
        onLoad={() => {
          console.log("Google Maps script loaded");
          // Don't set isLoaded here, let the callback handle it
        }}
        onError={(e) => {
          console.error("Failed to load Google Maps script:", e);
          setMapError("Failed to load Google Maps API");
        }}
      />
      <div className="my-6">
        <Container>
          <div
            ref={mapRef}
            style={{ height: `${height}px`, width: "100%", minHeight: "400px" }}
            className="w-full rounded-xl overflow-hidden border bg-gray-100"
          />
          {mapError && (
            <div className="text-sm text-red-600 mt-2 p-2 bg-red-50 rounded">
              <strong>Map Error:</strong> {mapError}
            </div>
          )}
          {routeError && (
            <div className="text-sm text-red-600 mt-2">
              <strong>Route Error:</strong> {routeError}
            </div>
          )}
          {!isLoaded && !mapError && (
            <div className="text-sm text-muted-foreground mt-2">
              Loading Google Maps...
            </div>
          )}
          {!hasValidCoords && (
            <div className="text-sm text-muted-foreground mt-2 p-2 bg-yellow-50 rounded">
              Location coordinates are not available for the seller or buyer.
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default SellerMapSection;
