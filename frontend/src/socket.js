import { io } from "socket.io-client";

// Replace with your backend port
const socket = io("http://localhost:5000");

export default socket;
