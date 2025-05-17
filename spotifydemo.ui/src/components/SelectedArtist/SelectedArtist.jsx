import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import "../SelectedArtist/SelectedArtist.css";
import { Clock } from "lucide-react";

export default function SelectedArtist() {
  const navigate = useNavigate();
  const id = useParams().id;
  const [user, setUser] = useState({});

  const generalUrl = "https://localhost:5002/";

  const getUserById = async () => {
    const name = Cookies.get("username");
    const token = Cookies.get(name);
    const url = generalUrl + `getUserById/${id}`;

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data);
        setUser(response.data.user);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

  useEffect(() => {
    getUserById();
  }, []);

  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);

  async function AllAudios() {
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    try {
      setLoading(true);
      const url = generalUrl + `userAllAudios/${user.id}`;
      const response = await axios.get(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      setAudios(response.data.audios);
      console.log(audios.audioUrl);
    } catch (error) {
      alert(error.response?.data?.message || "Failed to fetch audios");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    AllAudios();
  }, [user]);

  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  const audioRefs = useRef({});

  const playSong = async (songId) => {
    if (currentSongId === songId && isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setCurrentSongId(songId);
      setIsPlaying(true);
      setDuration(audios.find((song) => song.id === songId).duration);
      console.log(duration);
      setCurrentTime(0);
    }
  };

  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const handleMetadataLoaded = (id, duration) => {
    setAudios((prev) =>
      prev.map((song) => (song.id === id ? { ...song, duration } : song))
    );
  };

  return (
    <div className="listener-page" style={{ height: "100vh" }}>
      {/* Main content */}
      <main className="main-content3">
        <nav className="navbar">
          <div className="logo-container">
            <h1 className="logo" onClick={() => navigate("/")}>
              Melodify
            </h1>
          </div>
          <div className="auth-buttons">
            <button
              className="sign-in-button"
              onClick={() => {
                const allCookies = Cookies.get();

                for (let cookieName in allCookies) {
                  Cookies.remove(cookieName);
                }

                navigate("/");
              }}
            >
              <svg
                xmlns="http://www.w3.org/2000/svg"
                width="24"
                height="24"
                viewBox="0 0 30 22"
                fill="none"
                stroke="currentColor"
                strokeWidth="2"
                strokeLinecap="round"
                strokeLinejoin="round"
              >
                <path d="M9 16l-4-4 4-4" />
                <path d="M5 12h14" />
                <path d="M13 21h6a2 2 0 0 0 2-2V5a2 2 0 0 0-2-2h-6" />
              </svg>
              {/* {" "}
            Log out */}
            </button>
          </div>
        </nav>
        <div
          style={{
            display: "flex",
            alignItems: "center",
            gap: "6px",
            marginLeft: "5px",
            marginTop: "5px",
            marginBottom: "5px",
          }}
        >
          <button
            onClick={() => window.history.back()}
            style={{
              display: "flex",
              alignItems: "center",
              gap: "6px",
              padding: "10px 16px",
              backgroundColor: "transparent", // Buttonun arxa fonu qara
              color: "white", // Yazı rəngi ağ
              border: "none",
              borderRadius: "8px",
              cursor: "pointer",
              fontSize: "14px",
            }}
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="18"
              height="18"
              viewBox="0 0 24 24"
              fill="none"
              stroke="white" // Oxun rəngi ağ
              strokeWidth="2"
              strokeLinecap="round"
              strokeLinejoin="round"
            >
              <polyline points="15 18 9 12 15 6" />
            </svg>
            Back
          </button>
        </div>
        <div className="artist-header">
          <div className="artist-header-overlay">
            <div className="artist-profile">
              <div className="artist-avatar">
                <img
                  src={user.imagePath || "/placeholder.svg"}
                  alt={user.userName}
                />
              </div>
              <div className="artist-info">
                <h1 className="artist-name" style={{ textAlign: "left" }}>
                  Username: {user.userName}
                </h1>
                <h1 className="artist-name" style={{ textAlign: "left" }}>
                  Name: {user.name}
                </h1>
                <h1 className="artist-name" style={{ textAlign: "left" }}>
                  Surname: {user.surname}
                </h1>
              </div>
            </div>
          </div>
        </div>
        <section className="songs-section">
          <div className="section-header">
            <h2>{user.userName} Songs</h2>
          </div>

          {audios.length === 0 ? (
            <div className="no-songs">
              <p>{user.userName}'s haven't uploaded any songs yet.</p>
            </div>
          ) : (
            <div className="songs-table-container">
              <table className="songs-table">
                <thead>
                  <tr>
                    <th style={{ width: "50px" }}>#</th>
                    <th style={{ width: "40%" }}>Song Name</th>
                    <th className="track-duration">
                      <Clock size={16} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {audios.map((song, index) => (
                    <tr
                      key={song.id}
                      className={currentSongId === song.id ? "active-song" : ""}
                    >
                      <td>
                        <button
                          className="play-button"
                          onClick={() => playSong(song.id)}
                        >
                          {currentSongId === song.id && isPlaying ? (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <rect x="6" y="4" width="4" height="16"></rect>
                              <rect x="14" y="4" width="4" height="16"></rect>
                            </svg>
                          ) : (
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="16"
                              height="16"
                              viewBox="0 0 24 24"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                            >
                              <polygon points="5 3 19 12 5 21 5 3"></polygon>
                            </svg>
                          )}
                        </button>
                      </td>
                      <td>
                        <div className="song-info">
                          <img
                            src={song.imageUrl || "/placeholder.svg"}
                            alt={song.title}
                            className="song-cover"
                          />
                          <span className="song-title">{song.name}</span>
                        </div>
                      </td>
                      <td className="track-duration">
                        {formatTime(song.duration)}
                      </td>
                      <td>
                        <audio
                          style={{ display: "none" }}
                          ref={(el) => (audioRefs.current[song.id] = el)}
                          src={song.audioUrl}
                          onLoadedMetadata={() =>
                            handleMetadataLoaded(
                              song.id,
                              audioRefs.current[song.id].duration
                            )
                          }
                          controls
                        />
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          )}
        </section>
      </main>
      {currentSongId && (
        <footer className="player-bar">
          <div className="now-playing">
            <img
              src={
                audios.find((song) => song.id === currentSongId)?.imageUrl ||
                "/placeholder.svg"
              }
              alt="Song cover"
              className="track-cover"
            />
            <div className="track-info">
              <h4 className="track-title">
                {audios.find((song) => song.id === currentSongId)?.name}
              </h4>
            </div>
          </div>{" "}
          <audio
            controls
            ref={audioRef}
            src={audios.find((song) => song.id == currentSongId).audioUrl}
          />
        </footer>
      )}
    </div>
  );
}
