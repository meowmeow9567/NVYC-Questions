const express = require("express");
const router = express.Router();

const {
  askQuestion,
  getPublicQuestions,
  getAdminQuestions,
  approveQuestion,
  deleteQuestion,
  answerQuestion,
} = require("../controllers/questionController");

const auth = require("../middleware/auth");

router.post("/ask", askQuestion);
router.get("/public", getPublicQuestions);
router.get("/admin", auth, getAdminQuestions);
router.put("/approve/:id", auth, approveQuestion);
router.delete("/delete/:id", auth, deleteQuestion);
router.put("/answer/:id", auth, answerQuestion);


module.exports = router;