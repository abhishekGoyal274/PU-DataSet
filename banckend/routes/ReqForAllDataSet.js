const express = require("express");

const {
  ReqAllDataSetController,
} = require("../controller/ReqAllDataSetController.js");
const router = express.Router();

/*router.post("/create_account", authController.createAccount);
router.get("/verify_account/:token", authController.verifyAccount);
router.post("/login", authController.login);*/

router.post("/", ReqAllDataSetController);

module.exports = { router };
