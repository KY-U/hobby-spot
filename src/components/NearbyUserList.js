// src/components/NearbyUserList.js
import React from 'react';

const NearbyUserList = ({ filteredUsers = [] }) => {
  return (
    <section id="nearby-user-list">
      {filteredUsers.length > 0 ? (
        <ul>
          {filteredUsers.map((user, index) => (
            <li key={index}>
              {user.name} - {user.city} - Hobbies: {user.hobbies.join(", ")}
            </li>
          ))}
        </ul>
      ) : (
        <p>Nenhum usuário próximo encontrado.</p>
      )}
    </section>
  );
};

export default NearbyUserList;
