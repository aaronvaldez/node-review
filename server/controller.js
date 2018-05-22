//This is an in-memory object in place of a database. Do not do this in practice.
const lists = {};

module.exports = {
  lists: {
    fetch: (req, res) => {
      res.status(200).send(lists);
    },
    post: (req, res) => {
      const { listName } = req.body;
      if (listName) {
        lists[listName] = lists[listName] || [];
        res.status(201).send(lists[listName]);
      } else {
        res.status(404).send("Must provide list name");
      }
    }
  },
  todolist: {
    fetch: (req, res) => {
      const { listName } = req.query;
      if (lists[listName]) {
        res.status(200).send(lists[req.query.listName]);
      } else {
        res.status(404).send("List not found!");
      }
    },
    post: (req, res) => {
      const { todo, listName } = req.body;
      todo ? lists[listName].push(todo) : (lists[req.body.listName] = []);
      res.status(201).send(lists[listName]);
    },
    delete: (req, res) => {
      const { index, listName } = req.query;
      lists[listName].splice(+index, 1);
      res.status(202).send(lists[listName]);
    }
  }
};