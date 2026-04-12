import { useState } from "react";
import API from "../api/api";

function AskQuestion() {
    const [text, setText] = useState("");
    const [name, setName] = useState("");

    const submit = async () => {
        if (!name.trim()) {
            alert("Name is required");
            return;
        }

        if (!text.trim()) {
            alert("Question cannot be empty");
            return;
        }

        try {
            await API.post("/questions/ask", {
                text,
                askedBy: name || "Anonymous",
            });

            alert("Question submitted!");
            setText("");
            setName("");
        } catch (err) {
            console.log(err);
            alert("Error submitting question");
        }
    };

    return (
        <div className="max-w-md mx-auto mt-6">
            <h2 className="text-xl font-bold mb-4">Ask a Question</h2>

            <input
                className="w-full border p-2 rounded mb-3"
                placeholder="Your Name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                required
            />

            <textarea
                className="w-full border p-2 rounded mb-3"
                rows="4"
                placeholder="Write your question..."
                value={text}
                onChange={(e) => setText(e.target.value)}
            />

            <button
                className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
                onClick={submit}
            >
                Submit
            </button>
        </div>
    );
}

export default AskQuestion;