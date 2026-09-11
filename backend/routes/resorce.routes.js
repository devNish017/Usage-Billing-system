const express = require("express");
const { createResource, getResources } = require("../controllers/resource.controller");

const router = express.Router();

router.post("/", createResource);
router.get("/", getResources);

module.exports = router;