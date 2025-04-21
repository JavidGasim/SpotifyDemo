import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import "./App.css";
import Main from "./components/Main/Main";
import Login from "./components/Login/Login";
import Register from "./components/Register/Register";
import Artist from "./components/Artist/Artist";
import Listener from "./components/Listener/Listener";
import Playlist from "./components/Playlist/Playlist";
import AllArtists from "./components/AllArtists/AllArtists";
import SelectedArtist from "./components/SelectedArtist/SelectedArtist";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Main />} />
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/artist" element={<Artist />} />
        <Route path="/listener" element={<Listener />} />
        <Route path="/playlist/:name" element={<Playlist />} />
        <Route path="/allArtists" element={<AllArtists />} />
        <Route path="/selectedArtist/:id" element={<SelectedArtist />} />
      </Routes>
    </Router>
  );
}

export default App;
