import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import AudioPlayerFooter from "@/components/audio-player-footer";
import "../Listener/Listener.css";
import { Clock, Cookie, ListMusic, Mic2 } from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Listener() {
  const [isPlaying, setIsPlaying] = useState(false);
  // const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
  const [currentSongId, setCurrentSongId] = useState("");
  const userMenuRef = useRef(null);
  const navigate = useNavigate();

  const [artist, setArtist] = useState({
    email: "",
    id: "",
    imagepath: "",
    name: "",
    surname: "",
    username: "",
  });

  var generalUrl = "https://localhost:5002/";

  async function CurrentUser() {
    const name = Cookies.get("username");
    const token = Cookies.get(name);
    const url = generalUrl + `currentUser`;
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setUser(response.data.user);
        console.log(response.data);
        setArtist(response.data.user);
      })
      .catch((error) => {
        alert(error.response.data.message);
      });
  }

  useEffect(() => {
    CurrentUser();
  }, []);

  const audioRefs = useRef({});

  const handleMetadataLoaded = (id, duration) => {
    setSearchedAudio((prev) =>
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

      // const audio = audioRef.current;
      // console.log(audio.duration);
      // console.log(audio.metadata);
      // In a real app, you would load the audio file here
      // For now, we'll just simulate playback
      // setDuration(audios.find((song) => song.id === songId).duration);
      // // setDuration(audioRef.current.duration);
      // console.log(duration);

      // setCurrentTime(0);

      // If we had actual audio:
      // audioRef.current.src = searchedAudio.find(
      //   (song) => song.id === songId
      // ).audioUrl;
      // audioRef.current.play();
    }
  };

  // Close user menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setShowUserMenu(false);
      }
    };

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const [query, setQuery] = useState("");
  const [searchedAudio, setSearchedAudio] = useState([]);

  const searchAudio = async () => {
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    if (!query.trim()) {
      alert("Search term cannot be empty.");
      return;
    }
    const url = generalUrl + `searchAudio/${query}`;
    console.log("Query:", query);
    console.log("URL:", url);
    console.log("Token:", token);
    // alert(query)
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setUser(response.data.user);
        console.log(response.data);
        setSearchedAudio(response.data.searchResults);
        console.log(searchedAudio);
        getSinger();
        // console.log("asdasd");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

  const [singer, setSinger] = useState([]);

  const getSinger = async () => {
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    // const url = generalUrl + `getUserById/${id}`;
    // console.log(id);
    const url = generalUrl + `getAllUsers`;

    // console.log("Query:", query);
    // console.log("URL:", url);
    // console.log("Token:", token);
    // alert(query)
    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        // setUser(response.data.user);
        console.log(response.data.users);
        // console.log(response.data.userName);
        // console.log(response.data.user.userName);

        setSinger(response.data.users);
        console.log(singer);

        // setSearchedAudio(response.data.searchResults);
        // console.log(searchedAudio);
        // return response.data.user.userName;

        // console.log("asdasd");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

  useEffect(() => {
    getSinger();
    console.log(singer);
  }, []);

  const handleInputChange = (e) => {
    setQuery(e.target.value);
  };

  const handleSearchClick = () => {
    // onSearch(query); // inputdakı dəyəri ötürür
    searchAudio();
  };

  const handleEnterKey = (e) => {
    if (e.key === "Enter") {
      // onSearch(query);
      searchAudio();
    }
  };

  const [showPlaylistInput, setShowPlaylistInput] = useState({});
  const [playlistNames, setPlaylistNames] = useState({});

  async function addPlaylist(audioId) {
    const name = playlistNames[audioId]; // O anki audio için playlist adı
    if (!name?.trim()) {
      alert("Please enter a valid playlist name.");
      return;
    }

    try {
      const username = Cookies.get("username");
      const token = Cookies.get(username);
      const url =
        generalUrl +
        `playList?name=${name}&audioId=${audioId}&creatorId=${artist.id}`;
      await axios.post(
        url,
        {},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      alert(`Playlist "${name}" added successfully!`);
      setShowPlaylistInput({});
      setPlaylistNames((prevState) => ({ ...prevState, [audioId]: "" })); // İlgili inputu temizle
      // fetchAllAudios(); // Listeyi güncelle
    } catch (error) {
      console.error(error);
      alert("Failed to add playlist.");
    }
  }

  const [playLists, setPlaylists] = useState([]);
  const [myplayLists, setMyPlaylists] = useState([]);

  async function getPlaylists() {
    const name = Cookies.get("username");
    const token = Cookies.get(name);
    const url = generalUrl + `allPlayLists`;

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.playLists);
        setPlaylists(response.data.playLists);
        // alert(response.data.playLists[0].name);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  }

  async function getMyPlaylists() {
    const name = Cookies.get("username");
    const token = Cookies.get(name);
    const url = generalUrl + `allPlayLists`;

    await axios
      .get(url, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => {
        console.log(response.data.playLists);
        response.data.playLists.forEach((playList) => {
          if (playList.creatorId === artist.id) {
            setMyPlaylists(response.data.playLists);
          }
        });
        // alert(response.data.playLists[0].name);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  }

  const handlePlaylist = () => {
    if (playLists.length < 1) {
      getPlaylists();
      console.log(playLists);
    } else {
      setPlaylists([]);
    }
  };

  const handleMyPlaylist = () => {
    if (myplayLists.length < 1) {
      getMyPlaylists();
      console.log(playLists);
    } else {
      setMyPlaylists([]);
    }
  };

  const [allArtists, setAllArtists] = useState([]);

  const getAllArtists = async () => {
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
        console.log(response.data);
        console.log(response.data.users);
        setAllArtists(response.data.users);
        console.log(allArtists);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

  const handleArtists = () => {
    if (allArtists.length < 1) {
      getAllArtists();
      console.log(allArtists);
    } else {
      setAllArtists([]);
    }
  };

  return (
    <div className="listener-page">
      {/* Main content */}
      <main className="main-content3">
        <nav className="navbar">
          <div className="logo-container">
            <h1 className="logo" onClick={() => navigate("/")}>
              Spotify
            </h1>
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            <input
              type="text"
              placeholder="Search..."
              value={query}
              onChange={handleInputChange}
              onKeyDown={handleEnterKey}
              style={{
                padding: "8px",
                width: "200px",
                borderRadius: "4px",
                border: "1px solid #ccc",
              }}
            />
            <button
              onClick={handleSearchClick}
              style={{
                padding: "8px 12px",
                borderRadius: "4px",
                // backgroundColor: "#007bff",
                color: "white",
                border: "1px solid #ccc",
                cursor: "pointer",
              }}
            >
              Search
            </button>
          </div>
          <div className="auth-buttons">
            <button className="sign-in-button" onClick={() => {
                const allCookies = Cookies.get();
                
                for (let cookieName in allCookies) {
                  Cookies.remove(cookieName);
                }

                navigate("/");
            }}>
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
        {/* Artist header */}
        <div
          className="artist-header"
          //   style={{ backgroundImage: `url(${artist.coverImage})` }}
        >
          <div className="artist-header-overlay">
            <div className="artist-profile">
              <div className="artist-avatar">
                <img
                  src={artist.imagePath || "/placeholder.svg"}
                  alt={artist.userName}
                />
              </div>
              <div className="artist-info">
                <h1 className="artist-name">{artist.userName}</h1>
              </div>
            </div>
          </div>
        </div>

        {/* Content sections */}
        <div className="content-wrapper">
          {/* Welcome section */}
          <section className="welcome-section">
            <h1>
              Good {getTimeOfDay()}, {artist.userName}
            </h1>

            {/* <div className="quick-links">
              <a href="#" className="quick-link-card">
                <div className="quick-link-content">
                  <img
                    src="/placeholder.svg?height=80&width=80"
                    alt="Liked Songs"
                    className="quick-link-image"
                  />
                  <div className="quick-link-text">
                    <span>Liked Songs</span>
                    <small>124 songs</small>
                  </div>
                </div>
              </a>
              {yourPlaylists.slice(0, 5).map((playlist) => (
                <a href="#" key={playlist.id} className="quick-link-card">
                  <div className="quick-link-content">
                    <img
                      src={playlist.cover || "/placeholder.svg"}
                      alt={playlist.title}
                      className="quick-link-image"
                    />
                    <div className="quick-link-text">
                      <span>{playlist.title}</span>
                      <small>{playlist.tracks} songs</small>
                    </div>
                  </div>
                </a>
              ))}
            </div> */}
            {/* {searchedAudio && searchedAudio.map((audio) => <li>{audio}</li>)} */}
            {/* {searchedAudio && (<h1>asdasdsd</h1>)} */}
          </section>

          {/* Recently played section */}
          {searchedAudio.length > 0 && (
            <section className="content-section">
              <div className="section-header">
                <h2>Results</h2>
              </div>

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
                      <th></th>
                    </tr>
                  </thead>
                  <tbody>
                    {searchedAudio.map((track, index) => (
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
                        <td>
                          <button
                            style={{
                              padding: "0",
                              backgroundColor: "transparent",
                              border: 0,
                            }}
                            onClick={() =>
                              setShowPlaylistInput((prevState) => ({
                                ...prevState,
                                [track.id]: !prevState[track.id],
                              }))
                            }
                          >
                            <svg
                              xmlns="http://www.w3.org/2000/svg"
                              width="20"
                              height="17"
                              fill="none"
                              stroke="currentColor"
                              strokeWidth="2"
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              className="feather feather-playlist-plus"
                            >
                              <path d="M3 4h10"></path>
                              <path d="M3 8h10"></path>
                              <path d="M3 12h6"></path>
                              <path d="M16 7v6"></path>
                              <path d="M13 10h6"></path>
                            </svg>
                          </button>
                          {showPlaylistInput[track.id] && (
                            <div className="playlist-input-wrapper">
                              <input
                                type="text"
                                placeholder="Enter playlist name..."
                                value={playlistNames[track.id] || ""}
                                onChange={(e) =>
                                  setPlaylistNames((prevState) => ({
                                    ...prevState,
                                    [track.id]: e.target.value,
                                  }))
                                }
                                className="playlist-input"
                              />
                              <button
                                onClick={() => addPlaylist(track.id)}
                                className="playlist-add-button"
                              >
                                Add
                              </button>
                            </div>
                          )}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          )}

          {/* Browse section */}
          <section className="content-section">
            <div className="section-header">
              <h2>Browse</h2>
            </div>
            <div className="browse-grid">
              <button
                // href="#"
                onClick={handleMyPlaylist}
                className="browse-card"
                style={{ backgroundColor: "orange" }}
              >
                <ListMusic size={32} />
                <span>My Playlists</span>
              </button>
              <button
                // href="#"
                onClick={handlePlaylist}
                className="browse-card"
                style={{ backgroundColor: "#4c1d95" }}
              >
                <ListMusic size={32} />
                <span>Playlists</span>
              </button>
              <button
                // href="#"
                className="browse-card"
                style={{ backgroundColor: "#be185d" }}
                onClick={handleArtists}
              >
                <Mic2 size={32} />
                <span>Artists</span>
              </button>
            </div>
          </section>

          {myplayLists.length > 0 && (
            <div>
              <section className="content-section">
                <div className="section-header">
                  <h2>My Playlists</h2>
                </div>

                <div className="track-table-container">
                  <table className="track-table">
                    <thead>
                      <tr>
                        <th className="track-number">#</th>
                        <th className="track-album">Playlist Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {myplayLists.map((playList, index) => (
                        <tr
                          key={playList.id}
                          className={
                            currentSongId === playList.id ? "active-song" : ""
                          }
                          onClick={() => {
                            navigate(`/playlist/${playList.name}`);
                          }}
                        >
                          <td style={{ padding: "0", verticalAlign: "top" }}>
                            <button>{index + 1}</button>
                          </td>
                          <td className="track-title">
                            <span className="track-name">{playList.name}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {playLists.length > 0 && (
            <div>
              <section className="content-section">
                <div className="section-header">
                  <h2>Playlists</h2>
                </div>

                <div className="track-table-container">
                  <table className="track-table">
                    <thead>
                      <tr>
                        <th className="track-number">#</th>
                        <th className="track-album">Playlist Name</th>
                      </tr>
                    </thead>
                    <tbody>
                      {playLists.map((playList, index) => (
                        <tr
                          key={playList.id}
                          className={
                            currentSongId === playList.id ? "active-song" : ""
                          }
                          onClick={() => {
                            navigate(`/playlist/${playList.name}`);
                          }}
                        >
                          <td style={{ padding: "0", verticalAlign: "top" }}>
                            <button>{index + 1}</button>
                          </td>
                          <td className="track-title">
                            <span className="track-name">{playList.name}</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </section>
            </div>
          )}

          {allArtists.length > 0 && (
            <button onClick={() => navigate("/allArtists")}>All artists</button>
          )}
        </div>
      </main>

      {/* Audio Player Footer */}
      {currentSongId && (
        <footer className="player-bar">
          {console.log(currentSongId)}
          <div className="now-playing">
            <img
              src={
                searchedAudio.find((song) => song.id === currentSongId)
                  ?.imageUrl || "/placeholder.svg"
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
                      searchedAudio.find((song) => song.id === currentSongId)
                        ?.userId
                  )?.userName}
                <span> - </span>
                {searchedAudio.find((song) => song.id === currentSongId)?.name}
              </span>
              {/* <h4 className="track-title"></h4> */}
              {/* <p className="track-artist">{artist.artistName}</p> */}
            </div>
          </div>{" "}
          <audio
            controls
            ref={audioRef}
            src={
              searchedAudio.find((song) => song.id == currentSongId).audioUrl
            }
            // onPlay={setIsPlaying(true)}
            // onPause={setIsPlaying(false)}
            // onLoadedMetadata={handleMetadata}
          />
          {/* <AudioPlayer
            autoPlay
            src={audios.find((song) => song.Id == currentSongId).audioUrl}
            onPlay={(e) => console.log("onPlay")}
          /> */}
        </footer>
      )}
    </div>
  );
}

// Helper function to get time of day greeting
function getTimeOfDay() {
  const hour = new Date().getHours();
  if (hour < 12) return "morning";
  if (hour < 18) return "afternoon";
  return "evening";
}
