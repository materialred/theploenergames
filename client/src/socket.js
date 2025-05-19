import { io } from 'socket.io-client';

// Stelle Verbindung zum Backend her
const socket = io("http://localhost:5000", { withCredentials: true });

export default socket;
