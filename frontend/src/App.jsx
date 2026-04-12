import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./pages/Home";
import AskQuestion from "./pages/AskQuestion";
import AdminDashboard from "./pages/AdminDashboard";
import AdminLogin from "./pages/AdminLogin";

function App() {
  return (
    <Router>
      {/* Navbar */}
      <nav className="bg-gray-900 text-white px-6 py-3 flex gap-6">
        <Link to="/" className="hover:text-gray-300">Home</Link>
        <Link to="/ask" className="hover:text-gray-300">Ask</Link>
        <span
          className="hover:text-gray-300 cursor-pointer"
          onClick={() => {
            const token = localStorage.getItem("token");

            if (token) {
              window.location.href = "/admin";
            } else {
              window.location.href = "/admin-login";
            }
          }}
        >
          Admin
        </span>
      </nav>

      {/* Main Content */}
      <div className="max-w-3xl mx-auto p-4">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/ask" element={<AskQuestion />} />
          <Route path="/admin" element={<AdminDashboard />} />
          <Route path="/admin-login" element={<AdminLogin />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;