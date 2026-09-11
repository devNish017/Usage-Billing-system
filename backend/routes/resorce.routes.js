const express = require("express");
const { createResource } = require("../controllers/resource.controller");

const router = express.Router();

router.post("/", createResource);

module.exports = router;