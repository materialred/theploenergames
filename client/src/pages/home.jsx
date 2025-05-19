import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import DecryptedText from '../components/DecryptedText';
import './home.css';
import socket from '../socket'; // oder '../socket' je nach Ordnerstruktur
import playerTable from '../components/tables/player_table';

export default function Home() {
  const [setPlayers] = useState([]);

  useEffect(() => {
    socket.on('tableData', (data) => {
      console.log('📥 Daten vom Server empfangen:', data);
      setPlayers(data);
    });


    // Clean up the socket listener when component unmounts
    return () => {
      socket.off('tableData');
    };
  }, []);
  return (
    <div className="home-container">
      <div className="home-content">
        <h1>
          <DecryptedText
            text="WILLKOMMEN ZU DEN PLÖNER GAMES"
            interval={25}
            animateOn="view"
            sequential={true}
          />
        </h1>
        <p>Hello</p>
        <div className="playerTable">
        <table id="playerTable">
          <thead>
            <tr><th>Name</th></tr>
          </thead>
        </table>
      </div>
        <br />
        <Link to="/about" style={{ color: 'white' }}>Zur About-Seite</Link>
      </div>
    </div>

  );
}
