import axios from "axios";
import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useRef } from "react";

export default function MapComponent({
  user,
  productionUnits,
  selectProductionUnit,
}) {
  const mapContainerRef = useRef(null);
  const mapRef = useRef(null);
  const polylineRef = useRef(null);

  useEffect(() => {
    if (!mapContainerRef.current) return;

    if (!mapRef.current) {
      // Create the map instance
      mapRef.current = L.map(mapContainerRef.current).setView(
        [user.coordinates.lat, user.coordinates.lon],
        5
      );

      L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
        attribution:
          'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
        maxZoom: 18,
      }).addTo(mapRef.current);

      const userMarker = L.marker(
        [user.coordinates.lat, user.coordinates.lon],
        {
          icon: L.icon({
            iconUrl: "https://cdn-icons-png.flaticon.com/128/1397/1397898.png",
            iconSize: [50, 75],
            iconAnchor: [25, 75],
            popupAnchor: [1, -34],
            tooltipAnchor: [16, -28],
          }),
        }
      )
        .addTo(mapRef.current)
        .bindPopup("You");

      productionUnits.forEach((unit) => {
        const marker = L.marker([
          unit.production_unit.coordinates.lat,
          unit.production_unit.coordinates.lon,
        ])
          .addTo(mapRef.current)
          .bindPopup("Production Unit");
      });
    }

    if (polylineRef.current && mapRef.current.hasLayer(polylineRef.current)) {
      mapRef.current.removeLayer(polylineRef.current);
    }

    // Update the polyline
    if (Object.keys(selectProductionUnit).length !== 0) {
      const selectUnitCoordinates =
        selectProductionUnit.production_unit.coordinates;

      const polyline = L.polyline(
        [
          [user.coordinates.lat, user.coordinates.lon],
          [selectUnitCoordinates.lat, selectUnitCoordinates.lon],
        ],
        { color: "blue" }
      ).addTo(mapRef.current);

      polylineRef.current = polyline;
    }
  }, [user, productionUnits, selectProductionUnit]);

  useEffect(() => {
    return () => {
      // Clean up the map when the component is unmounted
      if (mapRef.current) {
        mapRef.current.remove();
        mapRef.current = null;
      }
    };
  }, []);

  return (
    <div style={{ height: "100%", width: "100%" }}>
      <div
        id='map-component'
        style={{ height: "100%", width: "100%", overflow: "hidden" }}
      >
        <div ref={mapContainerRef} style={{ height: "100%" }}></div>
      </div>
    </div>
  );
}
