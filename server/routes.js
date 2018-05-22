const router = require("express").Router();
const controller = require("./controller.js");

router.route("/lists")
.get(controller.lists.fetch)
.post(controller.lists.post);
router.route("/todolist")
.get(controller.todolist.fetch)
.post(controller.todolist.post)
.delete(controller.todolist.delete);

module.exports = router;
