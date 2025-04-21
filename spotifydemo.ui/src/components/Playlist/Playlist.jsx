import React, { useEffect, useRef, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import "../Playlist/Playlist.css";
import axios from "axios";
import Cookies from "js-cookie";
import { Clock } from "lucide-react";

export default function Playlist() {
  const navigate = useNavigate();
  const { name } = useParams();
  var generalUrl = "https://localhost:5002/";

  const [songs, setSongs] = useState([]);
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState("");

  const getPlaylist = async () => {
    const name2 = Cookies.get("username");
    const token = Cookies.get(name2);
    const url = generalUrl + `playListAudios`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
        params: {
          name: name,
        },
      })
      .then((response) => {
        console.log(response.data.audios);
        setSongs(response.data.audios);
        console.log(songs);
        getSinger();
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

  useEffect(() => {
    getPlaylist();
  }, []);

  const audioRefs = useRef({});

  const handleMetadataLoaded = (id, duration) => {
    setSongs((prev) =>
      prev.map((song) => (song.id === id ? { ...song, duration } : song))
    );
  };

  // Format time for display (e.g., 3:45)
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const audioRef = useRef(null);

  const playSong = async (songId) => {
    if (currentSongId === songId && isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
      console.log("stopped");
    } else {
      setCurrentSongId(songId);
      setIsPlaying(true);
      console.log("playing");
    }
  };

  const [singer, setSinger] = useState([]);

  const getSinger = async () => {
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    const url = generalUrl + `getAllUsers`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.users);

        setSinger(response.data.users);
        console.log(singer);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

  return (
    <div className="listener-page" style={{ height: "100vh" }}>
      <main className="main-content3">
        <nav className="navbar">
          <div className="logo-container">
            <h1 className="logo" onClick={() => navigate("/")}>
              Spotify
            </h1>
          </div>

          <div className="auth-buttons">
            <button className="sign-in-button" onClick={() => navigate("/")}>
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
        <div className="content-wrapper">
          <div>
            <section className="content-section">
              <div className="section-header">
                <h2>{name}</h2>
              </div>
            </section>
          </div>
          {songs.length > 0 && (
            <section className="content-section">
              <div className="track-table-container">
                <table className="track-table">
                  <thead>
                    <tr>
                      <th className="track-number">#</th>
                      <th className="track-title">Cover</th>
                      <th className="track-album">Track Name</th>
                      <th className="track-album">Singer Name</th>
                      <th className="track-duration">
                        <Clock size={16} />
                      </th>
                    </tr>
                  </thead>
                  <tbody>
                    {songs.map((track, index) => (
                      <tr
                        key={track.id}
                        className={
                          currentSongId === track.id ? "active-song" : ""
                        }
                        // onClick={() => playSong(index)}
                      >
                        <td style={{ padding: "0", verticalAlign: "top" }}>
                          <button
                            className="play-button"
                            style={{ margin: "0" }}
                            onClick={() => playSong(track.id)}
                          >
                            {currentSongId === track.id && isPlaying ? (
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
                          {" "}
                          <img
                            src={track.imageUrl || "/placeholder.svg"}
                            alt={track.title}
                            className="track-cover"
                          />
                        </td>
                        <td className="track-title">
                          <span className="track-name">{track.name}</span>
                        </td>
                        <td className="track-album">
                          {" "}
                          <span className="track-name">
                            {Array.isArray(singer) &&
                              singer.find((s) => s.id == track.userId)
                                ?.userName}
                          </span>
                        </td>
                        <td className="track-duration">
                          {formatTime(track.duration)}
                        </td>
                        <td>
                          <audio
                            style={{ display: "none" }}
                            ref={(el) => (audioRefs.current[track.id] = el)}
                            src={track.audioUrl}
                            onLoadedMetadata={() =>
                              handleMetadataLoaded(
                                track.id,
                                audioRefs.current[track.id].duration
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
            </section>
          )}{" "}
        </div>
      </main>
      {/* Audio Player Footer */}
      {currentSongId && (
        <footer className="player-bar">
          {console.log(currentSongId)}
          <div className="now-playing">
            <img
              src={
                songs.find((song) => song.id === currentSongId)?.imageUrl ||
                "/placeholder.svg"
              }
              alt="Song cover"
              className="track-cover"
            />
            <div className="track-info">
              <span className="track-name">
                {Array.isArray(singer) &&
                  singer.find(
                    (s) =>
                      s.id ==
                      songs.find((song) => song.id === currentSongId)?.userId
                  )?.userName}
                <span> - </span>
                {songs.find((song) => song.id === currentSongId)?.name}
              </span>
            </div>
          </div>{" "}
          <audio
            controls
            ref={audioRef}
            src={songs.find((song) => song.id == currentSongId).audioUrl}
          />
        </footer>
      )}
    </div>
  );
}
