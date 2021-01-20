var path = require("path");

// HTML Routes
module.exports = function (app) {
    // Index Route
    
    app.get("/", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/index.html"));
    });
    // Stats Route

    app.get("/stats", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/stats.html"));
    });
    // Exercise Route

    app.get("/exercise", function (req, res) {
        res.sendFile(path.join(__dirname, "../public/exercise.html"));
    });
};