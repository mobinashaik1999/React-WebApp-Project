import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Profiles from "./profiles";

function App() {
  return (
    <Router basename="/React-WebApp-Project">
      <nav>
        <Link to="/">Home</Link> | <Link to="/profiles">Profiles</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
        {/* Catch-all route for invalid URLs */}
        <Route path="*" element={<h2>Page Not Found</h2>} />
      </Routes>
    </Router>
  );
}

export default App;
