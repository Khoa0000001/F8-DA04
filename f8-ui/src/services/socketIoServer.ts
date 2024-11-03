// socket.ts
import { io, Socket } from 'socket.io-client';

// Tạo và xuất một kết nối socket duy nhất
const socket: Socket = io(import.meta.env.VITE_HTTP_WEBSOCKET);

export default socket;