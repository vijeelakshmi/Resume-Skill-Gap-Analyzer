import { io } from 'socket.io-client';
import { WS_URL } from '../config';

let socket = null;

export const connectSocket = (userId) => {
  socket = io(WS_URL);
  socket.emit('join', userId);
  return socket;
};

export const disconnectSocket = () => {
  if (socket) socket.disconnect();
};

export const onAnalysisComplete = (callback) => {
  if (socket) socket.on('analysisComplete', callback);
};

export const offAnalysisComplete = () => {
  if (socket) socket.off('analysisComplete');
};