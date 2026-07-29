import http from "http";
import { Server } from "socket.io";
import app from "./src/app.js";
import config from "./src/config/index.js";
import logger from "./src/utils/logger.js";

// ======================
//  CREATE HTTP SERVER
// ======================
const server = http.createServer(app);


// ======================
//  SOCKET.IO SETUP
// ======================
const io = new Server(server, {
  cors: {
    origin: config.FRONTEND_URL || "http://localhost:5173",
    methods: ["GET", "POST"],
    credentials: true,
  },
});

// Attach io to app (so you can use it in controllers)
app.set("io", io);


// ======================
//  SOCKET CONNECTION
// ======================
io.on("connection", (socket) => {
  logger.info(`Client connected: ${socket.id}`);

  socket.on("join", (userId) => {
    socket.join(userId);
    logger.info(`Socket ${socket.id} joined room ${userId}`);
  });

  socket.on("disconnect", () => {
    logger.info(`Client disconnected: ${socket.id}`);
  });
});


// ======================
//  EMIT HELPER
// ======================
export const emitToUser = (userId, event, data) => {
  io.to(userId).emit(event, data);
};


// ======================
//  START SERVER
// ======================
server.listen(config.PORT || 5000, () => {
  logger.info(`🚀 Server running on port ${config.PORT}`);
});