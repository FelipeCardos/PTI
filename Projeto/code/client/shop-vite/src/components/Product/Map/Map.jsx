import axios from "axios";
import L, { icon } from "leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect } from "react";

export default function MapComponent({ user, productionUnits }) {
  console.log(user);
  console.log(productionUnits);
  useEffect(() => {
    const map = L.map("map-container").setView(
      [user.coordinates.lat, user.coordinates.lon],
      5
    );

    L.tileLayer("https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png", {
      attribution:
        'Map data &copy; <a href="https://www.openstreetmap.org/">OpenStreetMap</a> contributors',
      maxZoom: 18,
    }).addTo(map);

    L.marker([user.coordinates.lat, user.coordinates.lon], {
      icon: L.icon({
        iconUrl: "https://cdn-icons-png.flaticon.com/128/1397/1397898.png",
        iconSize: [50, 75],
        iconAnchor: [25, 75],
        popupAnchor: [1, -34],
        tooltipAnchor: [16, -28],
      }),
    })
      .addTo(map)
      .bindPopup("You");

    productionUnits.forEach((unit) => {
      L.marker([
        unit.production_unit.coordinates.lat,
        unit.production_unit.coordinates.lon,
      ])
        .addTo(map)
        .bindPopup("Production Unit");
    });
  }, []);

  return (
    <div
      id='map-container'
      style={{ height: "100%", width: "70%", overflow: "hidden" }}
    ></div>
  );
}
