require("dotenv").config();
const express = require("express");
const morgan = require("morgan");
const route = require("./routes");
const db = require("./config/db");
const cors = require("cors");
const bodyParser = require("body-parser");
const syncModels = require("./middleware/SyncModels");
const cookieParser = require("cookie-parser");

const app = express();
const port = process.env.PORT || 8080;

// Config CORS
const corsOptions = {
  origin: "http://localhost:5173", // Miền gốc của bạn
  credentials: true, // Cho phép gửi thông tin xác thực
};

app.use(cors(corsOptions));
app.options("*", cors(corsOptions)); // Đảm bảo các yêu cầu preflight được xử lý đúng

// Middleware để parse JSON và dữ liệu URL-encoded
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(morgan("dev"));

// config CookieParser
app.use(cookieParser());

//connect db
db.connect();

// Routes init
route(app);

// Gọi hàm đồng bộ hóa model
syncModels();

app.use((req, res) => {
  return res.send("404 not found");
});

app.listen(port, () => {
  console.log(`Example app listening on port http://localhost:${port}`);
});
