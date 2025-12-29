// Return Server Status
exports.default = (_req, res) => {
    res.send("Server is running");
};

// Test Route for GET
exports.get = (_req, res) => {
    res.json({ message: "GET request received" });
};

// Test Route for POST
exports.post = (_req, res) => {
    res.json({ message: "POST request received" });
};