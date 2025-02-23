import React, { useState, useEffect } from 'react';
import Header from '../components/Header';
import Footer from '../components/Footer';
import RegistrationForm from '../components/RegistrationForm';
import GlobalUserList from '../components/GlobalUserList';

const HomePage = () => {
  const [users, setUsers] = useState(() => {
    const storedUsers = localStorage.getItem('users');
    return storedUsers ? JSON.parse(storedUsers) : [];
  });

  useEffect(() => {
    localStorage.setItem('users', JSON.stringify(users));
  }, [users]);

  return (
    <div className="App">
      <Header />
      <main>
        <RegistrationForm setUsers={setUsers} />
        <GlobalUserList users={users} />
      </main>
      <Footer />
    </div>
  );
};

export default HomePage;
