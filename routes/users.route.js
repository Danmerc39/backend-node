const express = require('express');
const UsersService = require('../services/users.service');

const usersService = new UsersService
const router = express.Router();

router.get('/', async (req, res) => {
  try {
    const tasks = await usersService.findAll()
    res.json(tasks);
  } catch (error) {
    console.log(error);
  }
});

module.exports = router;
