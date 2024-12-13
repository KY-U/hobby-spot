import React from 'react';
import './index.css'; // Certifique-se de que os estilos estão configurados

const UserListPage = ({ users }) => {
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
                        {users.length > 0 ? (
                            users.map((user, index) => (
                                <li key={index}>
                                    {user.name} - {user.city}, {user.state} - Hobbies: {user.hobbies.join(", ")}
                                </li>
                            ))
                        ) : (
                            <li>Nenhum usuário encontrado.</li>
                        )}
                    </ul>
                </section>
            </main>

            <footer>
                <p>&copy; 2024 HobbySpot</p>
            </footer>
        </div>
    );
};

export default UserListPage;
