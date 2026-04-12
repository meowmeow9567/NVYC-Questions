import { useEffect, useState } from "react";
import API from "../api/api";
import logo from "../assets/logo.png";

function Home() {
  const [questions, setQuestions] = useState([]);
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    fetchQuestions();
  }, []);

  const fetchQuestions = async () => {
    try {
      setLoading(true);
      const res = await API.get("/questions/public");
      setQuestions(res.data);
    } catch (err) {
      console.log(err);
    } finally {
      setLoading(false);
    }
  };

  if (loading) return <p className="text-center mt-10">Loading...</p>;

  return (
    <div>
      {/* 🔱 Logo + Title */}
      <div className="text-center mb-8">
        <img
          src={logo}
          alt="VYC Logo"
          className="mx-auto w-60 md:w-72 mb-6"
        />

        <h1 className="text-3xl font-bold">
          Vaikuntha Yagya Committee
        </h1>

        <p className="text-gray-600 mt-2 italic">
          He lives in His Books
        </p>
      </div>

      {/* Questions Section */}
      <h2 className="text-xl font-semibold mb-4">Questions & Answers</h2>

      {questions.length === 0 ? (
        <p className="text-gray-500">No approved questions yet</p>
      ) : (
        questions.map((q) => (
          <div key={q._id} className="bg-white p-4 rounded-xl shadow mb-4">
            <p className="font-semibold">Q: {q.text}</p>

            {q.answer && (
              <p className="mt-2 text-green-700">
                Answer: {q.answer}
              </p>
            )}
          </div>
        ))
      )}
    </div>
  );
}

export default Home;