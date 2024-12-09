"use client"
import { MapContainer, TileLayer, GeoJSON } from 'react-leaflet';
import { useState, useEffect } from 'react';

type GeoJsonFeature = {
  type: string;
  features: any[];
};

const Map = () => {
  const [countryData, setCountryData] = useState<GeoJsonFeature | null>(null);
  const [regionData, setRegionData] = useState<GeoJsonFeature | null>(null);
  const [departmentData, setDepartmentData] = useState<GeoJsonFeature | null>(null);
  const [districtData, setDistrictData] = useState<GeoJsonFeature | null>(null);

  // Charger les fichiers GeoJSON
  useEffect(() => {
    const loadGeoJson = async (url: string) => {
      const response = await fetch(url);
      return response.json();
    };

    Promise.all([
      loadGeoJson('/geojson/gadm41_CMR_0.geojson'),
      loadGeoJson('/geojson/gadm41_CMR_1.geojson'),
      loadGeoJson('/geojson/gadm41_CMR_2.geojson'),
      loadGeoJson('/geojson/gadm41_CMR_3.geojson'),
    ]).then(([country, regions, departments, districts]) => {
      setCountryData(country);
      setRegionData(regions);
      setDepartmentData(departments);
      setDistrictData(districts);
    });
  }, []);

  return (
    <MapContainer center={[7.3697, 12.3547]} zoom={6} style={{ height: '100vh', width: '100%' }}>
      {/* Fond de carte */}
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {/* Couche GeoJSON pour le Cameroun */}
      {countryData && <GeoJSON data={countryData} style={{ color: '#0000FF', weight: 2 }} />}
      {/* Couche GeoJSON pour les régions */}
      {regionData && <GeoJSON data={regionData} style={{ color: '#FF0000', weight: 1.5 }} />}
      {/* Couche GeoJSON pour les départements */}
      {departmentData && <GeoJSON data={departmentData} style={{ color: '#00FF00', weight: 1 }} />}
      {/* Couche GeoJSON pour les arrondissements */}
      {districtData && <GeoJSON data={districtData} style={{ color: '#FFA500', weight: 0.5 }} />}
    </MapContainer>
  );
};

export default Map;
