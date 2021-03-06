const express = require("express");
const connectDB = require("./config/db");

const app = express();

// connect database (from db.js)
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

//define routes
app.use("/api/users", require("./routes/api/users"));
app.use("/api/profile", require("./routes/api/profile"));
app.use("/api/auth", require("./routes/api/auth"));
app.use("/api/posts", require("./routes/api/posts"));
app.use("/api/conversations", require("./routes/api/conversations"));
app.use("/api/messages", require("./routes/api/messages"));

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));
