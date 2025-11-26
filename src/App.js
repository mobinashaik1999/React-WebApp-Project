// App.js
import { Routes, Route, Link } from "react-router-dom";
import Home from "./Home";
import Profiles from "./profiles";

function App() {
  return (
    <div>
      <nav>
        <Link to="/">Home</Link>
        <br/>
        <Link to="/profiles">Profiles</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/profiles" element={<Profiles />} />
      </Routes>
    </div>
  );
}

export default App;
