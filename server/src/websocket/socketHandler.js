export default (io) => {
  io.on('connection', (socket) => {
    console.log('New client connected');

    socket.on('join', (userId) => {
      socket.join(userId); // Join a room named after the user ID
    });

    socket.on('disconnect', () => {
      console.log('Client disconnected');
    });
  });

  // Emit analysis completion event
  io.emitToUser = (userId, event, data) => {
    io.to(userId).emit(event, data);
  };
};