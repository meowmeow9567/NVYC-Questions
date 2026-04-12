const Question = require("../models/Question");

// PUBLIC: Ask question
exports.askQuestion = async (req, res) => {
    try {
        const { text, askedBy } = req.body;

        if (!askedBy || askedBy.trim() === "") {
            return res.status(400).json({ message: "Name is required" });
        }

        if (!text) {
            return res.status(400).json({ message: "Question required" });
        }

        const question = new Question({
            text,
            askedBy: askedBy || "Anonymous",
        });

        await question.save();

        res.status(201).json({ message: "Question submitted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// PUBLIC: Get questions (no identity)
exports.getPublicQuestions = async (req, res) => {
    try {
        const questions = await Question.find({ isApproved: true })
            .select("text answer createdAt");

        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

// ADMIN: Get all (with identity)
exports.getAdminQuestions = async (req, res) => {
    try {
        const questions = await Question.find();
        res.json(questions);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Approve Question
exports.approveQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        await Question.findByIdAndUpdate(id, { isApproved: true });

        res.json({ message: "Approved" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Delete Questions
exports.deleteQuestion = async (req, res) => {
    try {
        const { id } = req.params;

        await Question.findByIdAndDelete(id);

        res.json({ message: "Deleted" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

//Answer 
exports.answerQuestion = async (req, res) => {
    try {
        const { id } = req.params;
        const { answer } = req.body;

        await Question.findByIdAndUpdate(id, { answer });

        res.json({ message: "Answered" });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};