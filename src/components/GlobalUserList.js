import React from 'react';

const GlobalUserList = ({ users }) => (
  <section id="global-user-list">
    <h2>Lista Global de Usuários</h2>
    <ul>
      {users.length > 0 ? (
        users.map((user, index) => (
          <li key={index}>
            {user.name} - {user.city} - Hobbies: {user.hobbies.join(", ")}
          </li>
        ))
      ) : (
        <li>Nenhum usuário cadastrado.</li>
      )}
    </ul>
  </section>
);

export default GlobalUserList;
