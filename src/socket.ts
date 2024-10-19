import { io } from 'socket.io-client';
import { configDotenv } from 'dotenv'

configDotenv();
const { BACKEND_WS_URL } = process.env;

const socket = io(BACKEND_WS_URL);
console.log('socket', socket)
export default socket;