var path = require("path");

// HTML Routes
module.exports = (app) => {
    // Route to home page
    app.get("/", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/index.html"));
    });

    // Exercise page
    app.get("/exercise", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/exercise.html"));
    });

    // Stats page
    app.get("/stats", (req, res) => {
        res.sendFile(path.join(__dirname, "../public/html/stats.html"));
    });
}