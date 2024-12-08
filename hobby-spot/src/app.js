import React, { useState, useEffect } from 'react';
import ReactDOM from 'react-dom/client';
import { BrowserRouter as Router, Routes, Route, useNavigate } from 'react-router-dom';
import './index.css';

// Página principal
const App = () => {
    const [formData, setFormData] = useState({
        name: "",
        state: "",
        city: "",
        hobbies: []
    });

    const [users, setUsers] = useState(() => {
        const savedUsers = localStorage.getItem('users');
        return savedUsers ? JSON.parse(savedUsers) : [];
    });

    const navigate = useNavigate();

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value
        });
    };

    const handleHobbiesChange = (e) => {
        const selectedHobbies = Array.from(e.target.selectedOptions, (option) => option.value);
        setFormData({
            ...formData,
            hobbies: selectedHobbies
        });
    };

    const handleSubmit = (e) => {
        e.preventDefault();

        const newUser = { ...formData };

        setUsers((prevUsers) => {
            const updatedUsers = [...prevUsers, newUser];
            localStorage.setItem('users', JSON.stringify(updatedUsers));
            return updatedUsers;
        });

        // Salva o último formulário submetido
        localStorage.setItem('lastSubmitted', JSON.stringify(formData));

        // Reseta o formulário
        setFormData({ name: "", state: "", city: "", hobbies: [] });

        // Redireciona para a página de usuários
        navigate('/users');
    };

    useEffect(() => {
        localStorage.setItem('users', JSON.stringify(users));
    }, [users]);

    const imagePaths = Array.from({ length: 13 }, (_, i) => `/assets/${i + 1}.png`);

    return (
        <div className="App">
            <header>
                <div className="logo-with-images">
                    <a href="#home" className="logo">
                        <img src="/assets/logo.jpg" alt="Logo HobbySpot" />
                    </a>
                    <div className="extra-images">
                        {imagePaths.map((path, index) => (
                            <img key={index} src={path} alt={`Imagem ${index + 1}`} />
                        ))}
                    </div>
                </div>
                <nav className="menu">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">Quem somos</a></li>
                        <li><a href="#contact">Contato</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="form-section">
                    <h2>Cadastre-se para encontrar pessoas com hobbies semelhantes!</h2>
                    <form id="hobby-form" onSubmit={handleSubmit}>
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
                            <label htmlFor="state">Estado</label>
                            <input
                                type="text"
                                id="state"
                                name="state"
                                placeholder="Digite o estado"
                                value={formData.state}
                                onChange={handleInputChange}
                                required
                            />
                        </div>
                        <div className="input-group">
                            <label htmlFor="city">Cidade</label>
                            <input
                                type="text"
                                id="city"
                                name="city"
                                placeholder="Digite a cidade"
                                value={formData.city}
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

                <section id="user-list">
                    <h2>Lista Global de Usuários</h2>
                    <ul>
                        {users.map((user, index) => (
                            <li key={index}>
                                {user.name} - {user.city}, {user.state} - Hobbies: {user.hobbies.join(", ")}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 HobbySpot</p>
            </footer>
        </div>
    );
};

// Página de lista de usuários
const UserList = () => {
    const users = JSON.parse(localStorage.getItem('users')) || [];
    const formData = JSON.parse(localStorage.getItem('lastSubmitted')) || {};

    const filteredUsers = users.filter(user =>
        user.state === formData.state &&
        user.city === formData.city &&
        user.hobbies.some(hobby => formData.hobbies.includes(hobby))
    );

    return (
        <div className="App">
            <header>
                <div className="logo-with-images">
                    <a href="#home" className="logo">
                        <img src="/assets/logo.jpg" alt="Logo HobbySpot" />
                    </a>
                </div>
                <nav className="menu">
                    <ul>
                        <li><a href="#home">Home</a></li>
                        <li><a href="#about">Quem somos</a></li>
                        <li><a href="#contact">Contato</a></li>
                    </ul>
                </nav>
            </header>

            <main>
                <section id="user-list">
                    <h2>Usuários com hobbies semelhantes</h2>
                    <ul>
                        {filteredUsers.map((user, index) => (
                            <li key={index}>
                                {user.name} - {user.city}, {user.state} - Hobbies: {user.hobbies.join(", ")}
                            </li>
                        ))}
                    </ul>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 HobbySpot</p>
            </footer>
        </div>
    );
};

// Root com rotas
const Root = () => (
    <Router>
        <Routes>
            <Route path="/" element={<App />} />
            <Route path="/users" element={<UserList />} />
        </Routes>
    </Router>
);

// Renderização no root
const rootElement = document.getElementById('root');
const root = ReactDOM.createRoot(rootElement);

root.render(
    <React.StrictMode>
        <Root />
    </React.StrictMode>
);

export default App;
