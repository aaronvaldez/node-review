const url = require("url");
const fs = require("fs");
const path = require("path");
const { sendResponse, parseData } = require("./helpers.js");

//This is an in-memory object in place of a database. Do not do this in practice.
const lists = {};

const routes = {
  static: {
    GET: (req, res) => {
      let pathname = url.parse(req.url).pathname;
      if (pathname !== "/bundle.js") {
        pathname = "/index.html";
      }
      fs.readFile(
        path.join(__dirname, `../client/dist${pathname}`),
        "utf8",
        (err, data) => {
          if (err) {
            throw err;
          }
          res.end(data);
        }
      );
    }
  },
  "/api/lists": {
    GET: (req, res) => {
      sendResponse(res, lists, 200);
    },
    POST: (req, res) => {
      parseData(req, data => {
        const { listName } = data;
        lists[listName] = lists[listName] || [];
        sendResponse(res, lists[listName], 201);
      });
    }
  },
  "/api/todolist": {
    GET: (req, res) => {
      const query = url.parse(req.url, true).query;
      const { listName } = query;
      if (listName in lists) {
        sendResponse(res, lists[listName], 200);
      } else {
        sendResponse(res, "List not found", 404);
      }
    },
    POST: (req, res) => {
      parseData(req, data => {
        const { todo, listName } = data;
        lists[listName].push(todo);
        sendResponse(res, lists[listName], 201);
      });
    },
    DELETE: (req, res) => {
      const query = url.parse(req.url, true).query;
      const { index, listName } = query;
      lists[listName].splice(+index, 1);
      sendResponse(res, lists[listName], 202);
    }
  }
};

module.exports = (req, res) => {
  let pathname = url.parse(req.url).pathname;
  console.log('Serving request type', req.method, 'to path', pathname);
  if (pathname !== "/api/lists" && pathname !== "/api/todolist") {
    pathname = "static";
  }
  const handler = routes[pathname][req.method];
  if (handler) {
    handler(req, res);
  } else {
    sendResponse(res, "Page not found", 404);
  }
};
