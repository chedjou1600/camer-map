import { MapContainer, TileLayer, GeoJSON } from "react-leaflet";
import "leaflet/dist/leaflet.css";
import { useEffect, useState } from "react";
import L from "leaflet";

const layers = [
  { name: "Bordures", path: "/geojson/gadm41_CMR_0.geojson", color: "black" },
  { name: "Régions", path: "/geojson/gadm41_CMR_1.geojson", color: "blue" },
  { name: "Départements", path: "/geojson/gadm41_CMR_2.geojson", color: "green" },
  { name: "Arrondissements", path: "/geojson/gadm41_CMR_3.geojson", color: "red" },
];

const Map = ({ onDistrictHover }) => {
  const [geoData, setGeoData] = useState([]);
  const [districtData, setDistrictData] = useState([]);

  useEffect(() => {
    // Charger les fichiers GeoJSON pour toutes les couches
    Promise.all(
      layers.map((layer) =>
        fetch(layer.path)
          .then((res) => res.json())
          .catch((err) =>
            console.error(`Erreur lors du chargement de la couche ${layer.name}:`, err)
          )
      )
    ).then((data) => setGeoData(data));
    
    // Charger les données des résultats
    const loadDistrictData = async () => {
      const response = await fetch("/result/result.json");
      const data = await response.json();
      setDistrictData(data.arrondissements);
    };

    loadDistrictData();
  }, []);

  const onEachFeature = (feature, layer) => {
    const district = districtData.find(d => d.name === feature.properties.NAME_3);
    
    if (district) {
      layer.bindTooltip(district.name, {
        permanent: false,
        direction: "top",
        className: "custom-tooltip",
      });

      layer.on("mouseover", (e) => {
        e.target.openTooltip();
        // Appeler la fonction de gestion du survol
        onDistrictHover(district.name, district.candidates);
      });

      layer.on("mouseout", (e) => {
        e.target.closeTooltip();
        // Réinitialiser la sélection
        onDistrictHover(null, []);
      });
    }
  };

  return (
    <MapContainer
      center={[7.3697, 12.3547]} // Coordonnées pour centrer la carte
      zoom={6}
      style={{ height: "100%", width: "100%" }}
    >
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
      />
      {geoData.map((data, index) => (
        <GeoJSON
          key={index}
          data={data}
          style={() => ({
            color: layers[index].color,
            weight: 2,
            fillOpacity: 0.3,
          })}
          onEachFeature={onEachFeature}
        />
      ))}
    </MapContainer>
  );
};

export default Map;