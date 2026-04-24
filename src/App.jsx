import { BrowserRouter as Router, Routes, Route, Navigate } from "react-router-dom";
import MainSite from "./MainSite";
import AdminLogin from "./components/admin/AdminLogin";
import AdminDashboard from "./components/admin/AdminDashboard";


function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Routes>
          <Route path="/admin" element={<Navigate to="/admin/dashboard" replace />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/dashboard" element={<AdminDashboard />} />
          <Route path="*" element={<MainSite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;