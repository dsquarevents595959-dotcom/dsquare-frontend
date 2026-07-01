import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import MainSite from "./MainSite";

function App() {
  return (
    <Router>
      <div className="min-h-screen flex flex-col bg-gray-50">
        <Routes>
          <Route path="*" element={<MainSite />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;