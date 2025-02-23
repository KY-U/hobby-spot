import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const RegistrationForm = ({ setUsers }) => {
  const [formData, setFormData] = useState({
    name: '',
    hobbies: []
  });
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
  };

  const handleHobbiesChange = (e) => {
    const options = Array.from(e.target.selectedOptions, opt => opt.value);
    setFormData(prev => ({ ...prev, hobbies: options }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          // Chamada para reverse geocoding usando a API do Nominatim (OpenStreetMap)
          fetch(`https://nominatim.openstreetmap.org/reverse?format=jsonv2&lat=${latitude}&lon=${longitude}`)
            .then(response => response.json())
            .then(data => {
              // Tenta extrair a cidade (pode estar em city, town ou village)
              const city = data.address.city || data.address.town || data.address.village || 'Desconhecida';
              const newUser = { ...formData, lat: latitude, lon: longitude, city };
              const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
              const updatedUsers = [...storedUsers, newUser];
              localStorage.setItem('users', JSON.stringify(updatedUsers));
              localStorage.setItem('lastSubmitted', JSON.stringify(newUser));
              setUsers(updatedUsers);
              navigate('/users');
            })
            .catch(error => {
              console.error("Erro no reverse geocoding:", error);
              // Se houver erro, salva com cidade 'Desconhecida'
              const newUser = { ...formData, lat: latitude, lon: longitude, city: "Desconhecida" };
              const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
              const updatedUsers = [...storedUsers, newUser];
              localStorage.setItem('users', JSON.stringify(updatedUsers));
              localStorage.setItem('lastSubmitted', JSON.stringify(newUser));
              setUsers(updatedUsers);
              navigate('/users');
            });
        },
        (error) => {
          console.error("Erro na geolocalização:", error);
          // Caso falhe a geolocalização, cadastra sem coordenadas e sem cidade
          const newUser = { ...formData, city: "Desconhecida" };
          const storedUsers = JSON.parse(localStorage.getItem('users')) || [];
          const updatedUsers = [...storedUsers, newUser];
          localStorage.setItem('users', JSON.stringify(updatedUsers));
          localStorage.setItem('lastSubmitted', JSON.stringify(newUser));
          setUsers(updatedUsers);
          navigate('/users');
        }
      );
    } else {
      alert("Geolocalização não suportada neste dispositivo.");
    }
  };

  return (
    <section id="form-section">
      <h2>Cadastre-se para encontrar pessoas com hobbies semelhantes!</h2>
      <form onSubmit={handleSubmit}>
        <div className="input-group">
          <label htmlFor="name">Nome</label>
          <input
            type="text"
            id="name"
            name="name"
            placeholder="Digite seu nome"
            value={formData.name}
            onChange={handleInputChange}
            required
          />
        </div>
        <div className="input-group">
          <label htmlFor="hobbies">Hobbies</label>
          <select
            id="hobbies"
            name="hobbies"
            multiple
            value={formData.hobbies}
            onChange={handleHobbiesChange}
            required
          >
            <option value="musica">Música</option>
            <option value="esportes">Esportes</option>
            <option value="arte">Arte</option>
            <option value="tecnologia">Tecnologia</option>
          </select>
        </div>
        <button type="submit">Spot!</button>
      </form>
    </section>
  );
};

export default RegistrationForm;
