import { useState, useRef, useEffect } from "react";
// import Link from "next/link";
// import AudioPlayerFooter from "@/components/audio-player-footer";
import "../Listener/Listener.css";
import {
  Home,
  Search,
  Library,
  Plus,
  Heart,
  Clock,
  ChevronLeft,
  ChevronRight,
  User,
  ChevronDown,
  ListMusic,
  Radio,
  Mic2,
  Music,
} from "lucide-react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Listener() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(null);
  const [showUserMenu, setShowUserMenu] = useState(false);
  const [activeSection, setActiveSection] = useState("home");
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

  // Simulate fetching user data
  const user = {
    name: "John Doe",
    avatar: "/placeholder.svg?height=40&width=40",
    premium: true,
  };

  // Simulate fetching recently played
  const recentlyPlayed = [
    {
      id: 1,
      title: "Blinding Lights",
      artist: "The Weeknd",
      album: "After Hours",
      cover: "/placeholder.svg?height=150&width=150",
      audioUrl: "https://example.com/audio/blinding-lights.mp3", // This would be a real URL in production
      duration: 203,
      explicit: false,
    },
    {
      id: 2,
      title: "As It Was",
      artist: "Harry Styles",
      album: "Harry's House",
      cover: "/placeholder.svg?height=150&width=150",
      audioUrl: "https://example.com/audio/as-it-was.mp3",
      duration: 167,
      explicit: false,
    },
    {
      id: 3,
      title: "Bad Habit",
      artist: "Steve Lacy",
      album: "Gemini Rights",
      cover: "/placeholder.svg?height=150&width=150",
      audioUrl: "https://example.com/audio/bad-habit.mp3",
      duration: 232,
      explicit: true,
    },
    {
      id: 4,
      title: "Running Up That Hill",
      artist: "Kate Bush",
      album: "Hounds of Love",
      cover: "/placeholder.svg?height=150&width=150",
      audioUrl: "https://example.com/audio/running-up-that-hill.mp3",
      duration: 298,
      explicit: false,
    },
    {
      id: 5,
      title: "Heat Waves",
      artist: "Glass Animals",
      album: "Dreamland",
      cover: "/placeholder.svg?height=150&width=150",
      audioUrl: "https://example.com/audio/heat-waves.mp3",
      duration: 238,
      explicit: false,
    },
  ];

  // Simulate fetching featured playlists
  const featuredPlaylists = [
    {
      id: 1,
      title: "Discover Weekly",
      description: "Your weekly mixtape of fresh music",
      cover: "/placeholder.svg?height=200&width=200",
      tracks: 30,
      curator: "Melodify",
    },
    {
      id: 2,
      title: "Release Radar",
      description: "Catch all the latest music from artists you follow",
      cover: "/placeholder.svg?height=200&width=200",
      tracks: 25,
      curator: "Melodify",
    },
    {
      id: 3,
      title: "Daily Mix 1",
      description: "Kendrick Lamar, J. Cole, Drake and more",
      cover: "/placeholder.svg?height=200&width=200",
      tracks: 20,
      curator: "Melodify",
    },
    {
      id: 4,
      title: "Chill Vibes",
      description: "Relaxing beats for your evening",
      cover: "/placeholder.svg?height=200&width=200",
      tracks: 40,
      curator: "Melodify",
    },
    {
      id: 5,
      title: "Workout Energy",
      description: "Boost your workout with these energetic tracks",
      cover: "/placeholder.svg?height=200&width=200",
      tracks: 35,
      curator: "Melodify",
    },
    {
      id: 6,
      title: "Indie Discoveries",
      description: "Fresh indie tracks you need to hear",
      cover: "/placeholder.svg?height=200&width=200",
      tracks: 28,
      curator: "Melodify",
    },
  ];

  // Simulate fetching your playlists
  const yourPlaylists = [
    {
      id: 1,
      title: "Favorite Songs",
      cover: "/placeholder.svg?height=80&width=80",
      tracks: 124,
    },
    {
      id: 2,
      title: "Summer Hits",
      cover: "/placeholder.svg?height=80&width=80",
      tracks: 45,
    },
    {
      id: 3,
      title: "Throwbacks",
      cover: "/placeholder.svg?height=80&width=80",
      tracks: 78,
    },
    {
      id: 4,
      title: "Indie Mix",
      cover: "/placeholder.svg?height=80&width=80",
      tracks: 56,
    },
    {
      id: 5,
      title: "Chill Lofi",
      cover: "/placeholder.svg?height=80&width=80",
      tracks: 92,
    },
  ];

  // Simulate fetching top artists
  const topArtists = [
    {
      id: 1,
      name: "The Weeknd",
      cover: "/placeholder.svg?height=150&width=150",
      followers: "85.4M",
    },
    {
      id: 2,
      name: "Billie Eilish",
      cover: "/placeholder.svg?height=150&width=150",
      followers: "72.1M",
    },
    {
      id: 3,
      name: "Drake",
      cover: "/placeholder.svg?height=150&width=150",
      followers: "68.9M",
    },
    {
      id: 4,
      name: "Taylor Swift",
      cover: "/placeholder.svg?height=150&width=150",
      followers: "92.3M",
    },
    {
      id: 5,
      name: "Kendrick Lamar",
      cover: "/placeholder.svg?height=150&width=150",
      followers: "45.7M",
    },
  ];

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
    if (currentTrackIndex === songId && isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setCurrentTrackIndex(songId);
      setIsPlaying(true);

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
      // audioRef.current.src = audios.find((song) => song.id === songId).audioUrl;
      // audioRef.current.play();
    }
  };

  const handleNext = () => {
    if (currentTrackIndex !== null) {
      const nextIndex = (currentTrackIndex + 1) % recentlyPlayed.length;
      setCurrentTrackIndex(nextIndex);
      setIsPlaying(true);
    }
  };

  const handlePrevious = () => {
    if (currentTrackIndex !== null) {
      const prevIndex =
        (currentTrackIndex - 1 + recentlyPlayed.length) % recentlyPlayed.length;
      setCurrentTrackIndex(prevIndex);
      setIsPlaying(true);
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

    // if (!query.trim()) {
    //   alert("Search term cannot be empty.");
    //   return;
    // }
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

  useState(() => {
    getSinger();
    console.log(singer);
  });

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
      const url = generalUrl + `playList?name=${name}&audioId=${audioId}`;
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
                        className={`track-row ${
                          currentTrackIndex === index ? "active-track" : ""
                        }`}
                        onClick={() => playSong(index)}
                      >
                        <td
                          className="track-number"
                          style={{ textAlign: "left", padding: "0px" }}
                        >
                          <div className="track-number-container">
                            <span className="track-index">{index + 1}</span>
                            <button
                              className="track-play-button"
                              onClick={() => playSong(index)}
                            >
                              {currentTrackIndex === index && isPlaying ? (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  stroke="none"
                                >
                                  <rect
                                    x="6"
                                    y="4"
                                    width="4"
                                    height="16"
                                  ></rect>
                                  <rect
                                    x="14"
                                    y="4"
                                    width="4"
                                    height="16"
                                  ></rect>
                                </svg>
                              ) : (
                                <svg
                                  xmlns="http://www.w3.org/2000/svg"
                                  width="16"
                                  height="16"
                                  viewBox="0 0 24 24"
                                  fill="currentColor"
                                  stroke="none"
                                >
                                  <polygon points="5 3 19 12 5 21 5 3"></polygon>
                                </svg>
                              )}
                            </button>
                          </div>
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
              <a
                href="#"
                className="browse-card"
                style={{ backgroundColor: "#4c1d95" }}
              >
                <ListMusic size={32} />
                <span>Playlists</span>
              </a>
              <a
                href="#"
                className="browse-card"
                style={{ backgroundColor: "#be185d" }}
              >
                <Mic2 size={32} />
                <span>Artists</span>
              </a>
            </div>
          </section>
        </div>
      </main>

      {/* Audio Player Footer */}
      {/* <div
        currentSong={
          currentTrackIndex !== null ? recentlyPlayed[currentTrackIndex] : null
        }
        artistName={
          currentTrackIndex !== null
            ? recentlyPlayed[currentTrackIndex].artist
            : ""
        }
        onNext={handleNext}
        onPrevious={handlePrevious}
      /> */}
      {currentTrackIndex && (
        <footer className="player-bar">
          <div className="now-playing">
            <img
              src={
                searchedAudio.find((song) => song.id === currentTrackIndex)?.imageUrl ||
                "/placeholder.svg"
              }
              alt="Song cover"
              className="track-cover"
            />
            <div className="track-info">
              <h4 className="track-title">
                {searchedAudio.find((song) => song.id === currentTrackIndex)?.name}
              </h4>
              {/* <p className="track-artist">{artist.artistName}</p> */}
            </div>
          </div>{" "}
          <audio
            controls
            ref={audioRef}
            src={searchedAudio.find((song) => song.id == currentTrackIndex).audioUrl}
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
