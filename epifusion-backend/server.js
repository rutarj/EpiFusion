// server.js
const express = require("express");
const cors = require("cors");
require("dotenv").config();

const alertRoutes = require("./routes/alerts");
const analyzeRoutes = require("./routes/analyze");
const resourceRoutes = require("./routes/resources");

const app = express();
app.use(cors());
app.use(express.json());

app.use("/api/alerts", alertRoutes);

app.use("/api/analyze", analyzeRoutes);

app.use("/api/resources", resourceRoutes);

app.get("/", (req, res) => {
  res.send("EpiFusion API is live");
});

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
