const express = require("express");
const http = require("http");
const { Server } = require("socket.io");
const cors = require("cors"); // Thêm dòng này
const axios = require("axios");
require("dotenv").config();

const app = express();
const server = http.createServer(app);
const Base_URL = process.env.APP_BASE_URL;

app.use(cors({ origin: "http://localhost:5173" })); // Cho phép localhost:5173 truy cập

let users = {};
const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173", // Cho phép client này kết nối với WebSocket server
    methods: ["GET", "POST"],
  },
});

io.on("connection", (socket) => {
  console.log("A user connected:", socket.id);
  // Lắng nghe sự kiện "register" từ client để lưu userID và socket ID
  socket.on("register", (userID) => {
    if (!users[userID]) {
      // Nếu userID chưa tồn tại trong object, khởi tạo một mảng rỗng
      users[userID] = [];
    }

    // Kiểm tra nếu socket.id đã tồn tại trong mảng hay chưa
    if (!users[userID].includes(socket.id)) {
      users[userID].push(socket.id); // Thêm socket ID vào user nếu chưa tồn tại
      console.log(`User ${userID} registered with socket ${socket.id}`);
    } else {
      console.log(
        `Socket ${socket.id} is already registered for user ${userID}`
      );
    }
  });
  // Xử lý sự kiện gửi tin nhắn đến một user cụ thể
  socket.on("sendNotification", async ({ toUser, notification }) => {
    const data = {
      notificationTypeID: notification.type,
      userID: notification.userID,
      idUserN: toUser,
      id: notification.id,
    };
    const response = await axios.post(`${Base_URL}/notification/add`, data, {
      withCredentials: true, // Đảm bảo gửi cookies
      headers: {
        Cookie: `jwt=${notification.jwt}`, // Đặt JWT token trong cookies
      },
    });
    const recipientSockets = users[toUser];
    if (recipientSockets) {
      recipientSockets.forEach((socketId) => {
        console.log(toUser);
        io.to(socketId).emit("receiveNotification", {
          notificationTypeID: notification.type,
          userID: notification.userID,
          idUserN: toUser,
          id: Number(notification.id),
          users: {
            avatar: notification.avatar,
            idUser: notification.idUser,
            name: notification.name,
          },
        });
      });
    } else {
      console.log(`User ${toUser} not found.`);
    }
  });

  socket.on("sendMessage", () => {
    io.emit("receiveMessage");
  });

  // Xử lý khi client ngắt kết nối
  socket.on("disconnect", () => {
    console.log("User disconnected:", socket.id);
    // Loại bỏ socket ID khỏi user
    for (let userID in users) {
      users[userID] = users[userID].filter((id) => id !== socket.id);
      if (users[userID].length === 0) {
        delete users[userID]; // Xóa user nếu không còn socket nào
      }
    }
  });
});

server.listen(3001, () => {
  console.log("Server is running on port 3001");
});
