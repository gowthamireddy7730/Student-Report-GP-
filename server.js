const express = require("express");
const path = require("path");
const app = express();

const appPath = path.join(__dirname, "webapp");

app.use(express.static(appPath));

app.get("/", (req, res) => {
    res.sendFile(path.join(appPath, "index.html"));
});

const port = process.env.PORT || 3000;

app.listen(port, () => {
    console.log("Server running on port " + port);
});