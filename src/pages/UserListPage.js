// src/pages/UserListPage.js
import React from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import NearbyUserList from '../components/NearbyUserList';
import MapComponent from '../components/MapComponent';

const EARTH_RADIUS_KM = 6371;

function deg2rad(deg) {
  return deg * (Math.PI / 180);
}

function getDistanceFromLatLonInKm(lat1, lon1, lat2, lon2) {
  const dLat = deg2rad(lat2 - lat1);
  const dLon = deg2rad(lon2 - lon1);
  const a =
    Math.sin(dLat / 2) ** 2 +
    Math.cos(deg2rad(lat1)) *
      Math.cos(deg2rad(lat2)) *
      Math.sin(dLon / 2) ** 2;
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1 - a));
  return EARTH_RADIUS_KM * c;
}

const UserListPage = () => {
  // Lê todos os usuários; se não houver, retorna um array vazio.
  const users = JSON.parse(localStorage.getItem('users')) || [];
  // Lê o usuário atual; se não houver, define um objeto padrão com hobbies vazio.
  const currentUser = JSON.parse(localStorage.getItem('lastSubmitted')) || { hobbies: [] };

  // Calcula o array filtrado: somente usuários com coordenadas, não o próprio,
  // que estejam a até 50 km e compartilhem pelo menos um hobby.
  const filteredUsers = users.filter(user => {
    if (!user.lat || !user.lon || !currentUser.lat || !currentUser.lon) return false;
    if (user.name === currentUser.name) return false;
    const distance = getDistanceFromLatLonInKm(
      Number(currentUser.lat),
      Number(currentUser.lon),
      Number(user.lat),
      Number(user.lon)
    );
    const sharesHobby =
      Array.isArray(user.hobbies) &&
      user.hobbies.some(hobby => currentUser.hobbies.includes(hobby));
    return distance <= 50 && sharesHobby;
  });

  return (
    <div className="App">
      <Header />
      <main>
        <h2>Usuários próximos com hobbies semelhantes</h2>
        {/* Passa o array filtrado para a listagem */}
        <NearbyUserList filteredUsers={filteredUsers} currentUser={currentUser} />
        {/* Passa o array filtrado para o mapa */}
        <MapComponent currentUser={currentUser} filteredUsers={filteredUsers} />
      </main>
      <Footer />
    </div>
  );
};

export default UserListPage;
