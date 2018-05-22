const headers = {
  "access-control-allow-origin": "*",
  "access-control-allow-methods": "GET, POST, PUT, DELETE, OPTIONS",
  "access-control-allow-headers": "content-type, accept",
  "access-control-max-age": 10, // Seconds.
  "Content-Type": "application/json"
};

module.exports = {
  sendResponse: (res, data, statusCode) => {
    statusCode = statusCode || 200;
    res.writeHead(statusCode, headers);
    res.end(JSON.stringify(data));
  },
  parseData: (req, cb) => {
    let data = "";
    req.on("data", chunk => {
      data += chunk;
    });
    req.on("end", () => {
      cb(JSON.parse(data));
    });
  }
};
