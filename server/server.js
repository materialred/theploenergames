// 1. Benötigte Module laden
import express from 'express';
import { Server } from 'socket.io';
import http from 'http';
import { supabase } from './db.js'

// 2. Server aufsetzen
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: 'http://localhost:3000', // Vite's default port
    methods: ['GET', 'POST'],
    credentials: true
  }
});

const PORT = 5000;
var onlineUsers = 0; 
let interval;
let latestData = []; // Global variable to store the latest data from DB

// 3. "public" Ordner bereitstellen
// Express soll alle Dateien aus dem 'public' Ordner direkt an den Browser senden können
// Wenn der Browser "/" anfragt, wird automatisch public/index.html gesendet!


// --- HIER KOMMEN SPÄTER DIE SOCKET.IO SACHEN HIN ---
// 4. Lauschen auf neue Verbindungen
io.on('connection', (socket) => {
    // 'socket' repräsentiert die Verbindung zu EINEM Client
    console.log('Ein Benutzer hat sich verbunden:', socket.id);
    onlineUsers++;
    // 5. Was passiert, wenn der Benutzer die Verbindung trennt?
    socket.on('disconnect', () => {
        console.log('Benutzer hat die Verbindung getrennt:', socket.id);
        onlineUsers--;
        if(onlineUsers <= 0){
            clearInterval(interval);
        }
    });
    updateData();
    // Hier wird die Tabelle initialisiert
    console.log('Initialisiere Tabelle');
    socket.emit('setupTable', getData());
    interval = setInterval(async () => {
    if(onlineUsers > 0){
        //console.log('Es sind noch ' + onlineUsers + ' Benutzer online');
        //console.log('hole Daten von der DB');
        updateData();
        //console.log('Daten von der DB geholt');
        socket.emit('playerData', getData());
        //console.log('Daten gesendet:', getData());
    }
}, 30)
    // Hier werden wir später auf Nachrichten vom Client lauschen ('message')
    // und Antworten senden ('response')

});
// --- BIS HIER ---

// 6. Server starten
server.listen(PORT, () => {
  console.log(`🚀 Server läuft auf <http://localhost>:${PORT}`);
});

// 7. DB Daten verarbeitung und abfrage
// Gets data from the global cache and transforms it
function getData() {
    // Return empty array if latestData is not an array or is empty
    if (!Array.isArray(latestData) || latestData.length === 0) return [];
    
    // Transform the data for client consumption
    const transformed = latestData.map(row => ({ uuid: row.id, name: row.username, created_at: row.created_at }));
    /* debug
    console.log('Transformed data:', transformed);
    */
    return transformed;
}

// Fetches data from the DB and updates the global cache
async function updateData() {
        let { data, error } = await supabase
            .from('players')
            .select();
            
        if (error) {
            console.error('DB error:', error);
            latestData = [];
        } else {
            latestData = data || [];
        }
    //console.log('Latest data:', latestData);
    return latestData;
}
