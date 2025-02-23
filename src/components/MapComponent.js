// src/components/MapComponent.js
import React, { useEffect } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';

// Corrige os ícones padrão do Leaflet
delete L.Icon.Default.prototype._getIconUrl;
L.Icon.Default.mergeOptions({
  iconRetinaUrl: require('leaflet/dist/images/marker-icon-2x.png'),
  iconUrl: require('leaflet/dist/images/marker-icon.png'),
  shadowUrl: require('leaflet/dist/images/marker-shadow.png'),
});

const MapComponent = ({ currentUser, filteredUsers = [] }) => {
  // Converte as coordenadas para Number (caso venham como string)
  const currentLat = Number(currentUser.lat);
  const currentLon = Number(currentUser.lon);
  
  // Debug: exibe as coordenadas no console
  useEffect(() => {
    console.log('Current User:', currentUser);
    console.log('Parsed Coordinates:', currentLat, currentLon);
  }, [currentUser, currentLat, currentLon]);

  // Define o centro do mapa com base na localização atual, ou [0,0] se indisponível
  const center = (currentLat && currentLon) ? [currentLat, currentLon] : [0, 0];

  return (
    <div id="map-section">
      <h2>Mapa</h2>
      <MapContainer center={center} zoom={13} style={{ height: '400px', width: '100%' }}>
        <TileLayer
          attribution='&copy; <a href="https://openstreetmap.org">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />

        {/* Marcador para a sua localização */}
        {(currentLat && currentLon) && (
          <Marker position={center}>
            <Popup>Sua localização</Popup>
          </Marker>
        )}

        {/* Marcadores para os usuários filtrados */}
        {filteredUsers.map((user, index) => {
          const lat = Number(user.lat);
          const lon = Number(user.lon);
          return (
            <Marker key={index} position={[lat, lon]}>
              <Popup>{user.name}</Popup>
            </Marker>
          );
        })}
      </MapContainer>
    </div>
  );
};

export default MapComponent;
