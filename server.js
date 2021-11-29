const express = require("express");
const connectDB = require('./config/db');

const app = express();

// connect database (from db.js)
connectDB();

// initialize middleware
app.use(express.json({ extended: false }));
// app.use(express.urlencoded({ extended: true }));
// app.use(express.json());

app.get("/", (req, res) => res.send("API running"));

//define routes
app.use("/api/users", require("./routes/users"));
app.use("/api/profile", require("./routes/profile"));
app.use("/api/auth", require("./routes/auth"));
app.use("/api/posts", require("./routes/posts"));

// Serve static assets in production
if (process.env.NODE_ENV === 'production') {
    // Set static folder
    app.use(express.static('client/build'));
  
    app.get('*', (req, res) => {
      res.sendFile(path.resolve(__dirname, 'client', 'build', 'index.html'));
    });
  }

const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server Started on port ${PORT}`));