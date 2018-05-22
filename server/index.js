const http = require("http");
const requestHandler = require("./handler.js");

const port = 3000;
const ip = "127.0.0.1";

const server = http.createServer(requestHandler);

server.listen(port, ip);
console.log("Listening on port", port);
