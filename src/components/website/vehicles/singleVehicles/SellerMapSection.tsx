"use client";

import Container from "@/components/ui/container";
import { useEffect, useRef, useState } from "react";
import Script from "next/script";
import { Info } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";

// TypeScript declarations for Google Maps API
declare global {
  interface Window {
    google?: any;
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
  const isSellerValid = seller.lat !== 0 && seller.lng !== 0;
  const isBuyerValid = buyer.lat !== 0 && buyer.lng !== 0;
  const hasValidCoords = isSellerValid && isBuyerValid;

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
    // console.log("Initializing map...");
    // console.log("mapRef.current:", mapRef.current);
    // console.log("window.google:", window.google);
    // console.log("API Key:", process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY);

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

      // console.log("Map created successfully:", map);
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

      // Seller InfoWindow (Compact Badge)
      const sellerInfoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 4px 10px; font-weight: 700; font-size: 11px; color: white; background: #B91C1C; border-radius: 6px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); display: flex; items-center: center; gap: 6px;">
          <span>Seller</span>
          <span id="close-seller-badge" style="font-weight: 400; opacity: 0.8; margin-left: 4px; font-size: 10px; cursor: pointer; padding: 1px;">✕</span>
        </div>`,
        disableAutoPan: true,
        pixelOffset: new google.maps.Size(0, 15),
      });

      google.maps.event.addListener(sellerInfoWindow, "domready", () => {
        const closeBtn = document.getElementById("close-seller-badge");
        if (closeBtn) {
          closeBtn.onclick = () => sellerInfoWindow.close();
        }
      });

      sellerInfoWindow.open(map, sellerMarker);

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

      // Buyer InfoWindow (Compact Badge)
      const buyerInfoWindow = new google.maps.InfoWindow({
        content: `<div style="padding: 4px 10px; font-weight: 700; font-size: 11px; color: white; background: #1D4ED8; border-radius: 6px; white-space: nowrap; box-shadow: 0 2px 4px rgba(0,0,0,0.3); border: 1px solid rgba(255,255,255,0.2); display: flex; items-center: center; gap: 6px;">
          <span>You (Buyer)</span>
          <span id="close-buyer-badge" style="font-weight: 400; opacity: 0.8; margin-left: 4px; font-size: 10px; cursor: pointer; padding: 1px;">✕</span>
        </div>`,
        disableAutoPan: true,
        pixelOffset: new google.maps.Size(0, 15),
      });

      google.maps.event.addListener(buyerInfoWindow, "domready", () => {
        const closeBtn = document.getElementById("close-buyer-badge");
        if (closeBtn) {
          closeBtn.onclick = () => buyerInfoWindow.close();
        }
      });

      buyerInfoWindow.open(map, buyerMarker);

      // console.log("Markers created:", { sellerMarker, buyerMarker });

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
      // console.log("Google Maps callback triggered");
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
          // console.log("Google Maps script loaded");
          // Don't set isLoaded here, let the callback handle it
        }}
        onError={(e) => {
          console.error("Failed to load Google Maps script:", e);
          setMapError("Failed to load Google Maps API");
        }}
      />
      <div className="my-6">
        <Container>
          <style>{`
            .gm-style-iw-c {
              background: transparent !important;
              box-shadow: none !important;
              padding: 0 !important;
              max-height: none !important;
            }
            .gm-style-iw-t::after {
              display: none !important;
            }
            .gm-style-iw-d {
              overflow: visible !important;
              padding: 5px !important;
            }
            .gm-ui-hover-svc,
            .gm-ui-hover-effect {
              display: none !important;
            }
            .gm-style-iw-tc {
              display: none !important;
            }
          `}</style>
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
            <div className="mt-4 flex flex-col items-center justify-center p-6 bg-white border border-gray-100 rounded-xl shadow-sm">
              <div className="relative group cursor-help">
                <div className="flex items-center space-x-2 text-primary bg-primary/5 px-4 py-2 rounded-full transition-all duration-300 hover:bg-primary/10">
                  <Info className="w-5 h-5" />
                  <span className="text-sm font-semibold">
                    Location Information
                  </span>
                </div>

                {/* Tooltip */}
                <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-3 w-80 p-4 bg-gray-900 text-white text-xs rounded-xl opacity-0 invisible group-hover:opacity-100 group-hover:visible transition-all duration-300 shadow-xl z-10">
                  <div className="space-y-2">
                    {!isBuyerValid && !isSellerValid ? (
                      <p className="leading-relaxed">
                        Both you and the seller need to set your base locations
                        in your profiles to view the route and distance.
                      </p>
                    ) : !isBuyerValid ? (
                      <p className="leading-relaxed">
                        You haven&apos;t set your location in your profile.
                        Please set a valid location to see the route to the
                        seller.
                      </p>
                    ) : (
                      <p className="leading-relaxed">
                        The seller hasn&apos;t set their location yet. We
                        can&apos;t calculate a route until they provide their
                        coordinates.
                      </p>
                    )}

                    <p className="text-gray-400 font-medium pt-1 border-t border-gray-800">
                      Pro Tip: Please login and visit your profile page to set
                      your location on the map.
                    </p>
                  </div>
                  {/* Tooltip Arrow */}
                  <div className="absolute top-full left-1/2 -translate-x-1/2 border-8 border-transparent border-t-gray-900" />
                </div>
              </div>
              <p className="mt-3 text-sm text-gray-500 text-center max-w-xs">
                Missing coordinates for route calculation.
              </p>
            </div>
          )}
        </Container>
      </div>
    </>
  );
};

export default SellerMapSection;
