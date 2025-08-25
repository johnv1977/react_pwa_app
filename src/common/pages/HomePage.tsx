import React from 'react';

const HomePage: React.FC = () => {
  return (
    <div style={{ 
      display: 'flex', 
      flexDirection: 'column', 
      alignItems: 'center', 
      justifyContent: 'center', 
      minHeight: '100vh',
      padding: '20px',
      textAlign: 'center'
    }}>
      <h1 style={{ color: '#2196f3', marginBottom: '20px' }}>
        🎮 DnuGame
      </h1>
      <h2 style={{ color: '#666', marginBottom: '30px' }}>
        Piedra, Papel o Tijera Multijugador
      </h2>
      <p style={{ color: '#888', marginBottom: '40px', maxWidth: '500px' }}>
        Únete a salas de juego en tiempo real y desafía a otros jugadores en el clásico juego de 
        Piedra, Papel o Tijera.
      </p>
      <div style={{ display: 'flex', gap: '15px', flexWrap: 'wrap', justifyContent: 'center' }}>
        <button 
          style={{
            padding: '12px 24px',
            backgroundColor: '#2196f3',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => console.log('Navegar a salas')}
        >
          Ver Salas
        </button>
        <button 
          style={{
            padding: '12px 24px',
            backgroundColor: '#4caf50',
            color: 'white',
            border: 'none',
            borderRadius: '6px',
            cursor: 'pointer',
            fontSize: '16px'
          }}
          onClick={() => console.log('Crear sala')}
        >
          Crear Sala
        </button>
      </div>
    </div>
  );
};

export default HomePage;
