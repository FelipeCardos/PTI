import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

export default function MapLocalImpact({ pusCoordinatesRadius }) {
  console.log(pusCoordinatesRadius);
  const mapRef = useRef(null);

  useEffect(() => {
    // Create the Leaflet map
    const map = L.map(mapRef.current).setView([0, 0], 2);

    // Add the tile layer to the map
    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution: "Map data &copy; OpenStreetMap contributors",
      maxZoom: 18,
    }).addTo(map);

    for (const [puId, puCoordinatesRadius] of Object.entries(
      pusCoordinatesRadius
    )) {
      // Create the circle layer
      const circle = L.circle(
        [
          puCoordinatesRadius.coordinates.lat,
          puCoordinatesRadius.coordinates.lon,
        ],
        {
          radius: puCoordinatesRadius.radius,
          color: "blue",
          fillColor: "blue",
          fillOpacity: 0.5,
        }
      ).addTo(map);
    }

    return () => {
      // Clean up the map when the component is unmounted
      map.remove();
    };
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        id='map-component'
        ref={mapRef}
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      ></div>
    </div>
  );
}
