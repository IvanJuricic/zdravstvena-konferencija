const http = require("http");
const express = require("express");
const socketio = require("socket.io");
const connectDB = require("./config/db");

const app = express();
const server = http.createServer(app);
const io = socketio(server);

// Connect Database
connectDB();

// Init Middleware
app.use(express.json({ extended: false }));

// Define Routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/papers", require("./routes/api/papers"));
app.use("/api/admin", require("./routes/api/admin"));

const PORT = process.env.PORT;

app.get("/", (req, res) => res.send("API Running"));

server.listen(PORT, () => console.log(`Server started on port ${PORT}`));
