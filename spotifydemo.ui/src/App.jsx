import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Artist from "./components/Artist/Artist";
import Listener from "./components/Listener/Listener";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/listener" element={<Listener />} />
      </Routes>
    </Router>
  );
}

export default App;
