import L from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function MapComponent() {
  useEffect(() => {
    const map = L.map("map-container").setView([51.505, -0.09], 13);

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);
  }, []);

  return (
    <div
      id='map-container'
      style={{ height: "100%", width: "70%", overflow: "hidden" }}
    ></div>
  );
}
