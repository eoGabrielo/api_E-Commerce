const express = require("express");
const router = express.Router(); 

const TaskController = require("../controllers/userController");

//Registrar usuario
router.post("/register", TaskController.taskRegister)

//Login usuario
router.post("/login", TaskController.taskLogin)

module.exports = router;
