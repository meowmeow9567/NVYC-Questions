import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import API from "../api/api";

function AdminDashboard() {
    const [questions, setQuestions] = useState([]);
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // ✅ INSIDE

    useEffect(() => {
        const token = localStorage.getItem("token");

        if (!token) {
            navigate("/admin-login");
        } else {
            fetchAdminQuestions();
        }
    }, []);

    const fetchAdminQuestions = async () => {
        try {
            setLoading(true);
            const res = await API.get("/questions/admin");
            setQuestions(res.data);
        } catch (err) {
            alert("Unauthorized");
        } finally {
            setLoading(false);
        }
    };

    if (loading) return <p>Loading...</p>;

    const approve = async (id) => {
        await API.put(`/questions/approve/${id}`);
        fetchAdminQuestions();
    };

    const remove = async (id) => {
        await API.delete(`/questions/delete/${id}`);
        fetchAdminQuestions();
    };

    const submitAnswer = async (q) => {
        const answer = q.tempAnswer || q.answer;

        await API.put(`/questions/answer/${q._id}`, { answer });

        fetchAdminQuestions();
    };

    return (
  <div>
    {/* 🔐 Admin Logout Button */}
    <div className="flex justify-between items-center mb-4">
      <h2 className="text-2xl font-bold">Admin Dashboard</h2>

      <button
        className="bg-gray-800 text-white px-4 py-1 rounded"
        onClick={() => {
          localStorage.removeItem("token");   // ❌ remove admin token
          navigate("/admin-login");           // 🔁 go to login page
        }}
      >
        Logout
      </button>
    </div>

    {questions.map((q) => (
      <div key={q._id} className="bg-white p-4 rounded-xl shadow mb-4">
        <p className="font-semibold">Q: {q.text}</p>
        <p className="text-sm text-gray-500">By: {q.askedBy}</p>

        <p className="mt-2">
          Status: {q.isApproved ? "✅ Approved" : "⏳ Pending"}
        </p>

        <textarea
          className="w-full border p-2 rounded mt-3"
          placeholder="Write answer..."
          defaultValue={q.answer}
          onChange={(e) => (q.tempAnswer = e.target.value)}
        />

        <div className="mt-3 flex gap-2">
          <button
            className="bg-green-600 text-white px-3 py-1 rounded"
            onClick={() => submitAnswer(q)}
          >
            Save
          </button>

          {!q.isApproved && (
            <button
              className="bg-blue-600 text-white px-3 py-1 rounded"
              onClick={() => approve(q._id)}
            >
              Approve
            </button>
          )}

          <button
            className="bg-red-600 text-white px-3 py-1 rounded"
            onClick={() => remove(q._id)}
          >
            Delete
          </button>
        </div>
      </div>
    ))}
  </div>
);
}

export default AdminDashboard;