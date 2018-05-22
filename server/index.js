const express = require("express");
const path = require("path");
const parser = require("body-parser");

const server = express();
const port = 3000;

const routes = require("./routes.js");

const customLogger = (req, res, next) => {
  console.log("Serving request type", req.method, "to path", req.path);
  next();
};

server.use(parser.json());
server.use(parser.urlencoded({ extended: false }));
server.use(customLogger);

server.use(express.static(path.join(__dirname, "../client/dist")));

server.use("/api", routes);

server.get("*", (req, res) => {
  res.sendFile(path.resolve(__dirname, "../client/dist", "index.html"));
});

server.listen(port, () => console.log(`Server listening on port ${port}`));
