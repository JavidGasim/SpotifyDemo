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

  // Format time for display (e.g., 3:45)
  const formatTime = (seconds) => {
    if (!seconds && seconds !== 0) return "--:--";
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  const playSong = (index) => {
    if (currentTrackIndex === index && isPlaying) {
      setIsPlaying(false);
    } else {
      setCurrentTrackIndex(index);
      setIsPlaying(true);
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
        setSearchedAudio(response.data.SearchResults);
        // console.log("asdasd");
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

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

  return (
    <div className="listener-page">
      {/* Sidebar */}
      {/* <aside className="sidebar">
        <div className="logo-container">
          <a href="/" className="logo-link">
            <h1 className="logo">Melodify</h1>
          </a>
        </div>

        <div className="sidebar-section">
          <ul className="nav-list">
            <li
              className={`nav-item ${activeSection === "home" ? "active" : ""}`}
            >
              <a
                href="#"
                className="nav-link"
                onClick={() => setActiveSection("home")}
              >
                <Home size={20} />
                <span>Home</span>
              </a>
            </li>
            <li
              className={`nav-item ${
                activeSection === "search" ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="nav-link"
                onClick={() => setActiveSection("search")}
              >
                <Search size={20} />
                <span>Search</span>
              </a>
            </li>
            <li
              className={`nav-item ${
                activeSection === "library" ? "active" : ""
              }`}
            >
              <a
                href="#"
                className="nav-link"
                onClick={() => setActiveSection("library")}
              >
                <Library size={20} />
                <span>Your Library</span>
              </a>
            </li>
          </ul>
        </div>

        <div className="sidebar-section">
          <div className="sidebar-header">
            <h3>Your Playlists</h3>
            <button className="icon-button" title="Create playlist">
              <Plus size={18} />
            </button>
          </div>
          <ul className="playlist-list">
            <li className="playlist-item">
              <a href="#" className="playlist-link special">
                <div className="playlist-icon-container liked">
                  <Heart size={16} />
                </div>
                <span>Liked Songs</span>
              </a>
            </li>
            {yourPlaylists.map((playlist) => (
              <li key={playlist.id} className="playlist-item">
                <a href="#" className="playlist-link">
                  <img
                    src={playlist.cover || "/placeholder.svg"}
                    alt={playlist.title}
                    className="playlist-thumb"
                  />
                  <div className="playlist-info">
                    <span className="playlist-title">{playlist.title}</span>
                    <span className="playlist-details">
                      Playlist • {playlist.tracks} songs
                    </span>
                  </div>
                </a>
              </li>
            ))}
          </ul>
        </div>
      </aside> */}

      {/* Main content */}
      <main className="main-content3">
        {/* Top bar */}
        {/* <div className="top-bar">
          <div className="navigation-buttons">
            <button className="nav-button" title="Go back">
              <ChevronLeft size={24} />
            </button>
            <button className="nav-button" title="Go forward">
              <ChevronRight size={24} />
            </button>
          </div>

          <div className="search-container">
            <Search className="search-icon" size={18} />
            <input
              type="text"
              className="search-input"
              placeholder="Search for songs, artists, or albums"
            />
          </div>

          <div className="user-menu-container" ref={userMenuRef}>
            <button
              className="user-menu-button"
              onClick={() => setShowUserMenu(!showUserMenu)}
              aria-expanded={showUserMenu}
              aria-haspopup="true"
            >
              <div className="user-avatar">
                <img src={user.avatar || "/placeholder.svg"} alt={user.name} />
                {user.premium && (
                  <div className="premium-badge" title="Premium subscriber">
                    P
                  </div>
                )}
              </div>
              <span className="user-name">{user.name}</span>
              <ChevronDown
                size={16}
                className={`dropdown-icon ${showUserMenu ? "open" : ""}`}
              />
            </button>

            {showUserMenu && (
              <div className="user-dropdown">
                <ul className="dropdown-menu">
                  <li className="dropdown-item">
                    <a href="/profile" className="dropdown-link">
                      <User size={16} />
                      <span>Profile</span>
                    </a>
                  </li>
                  <li className="dropdown-item">
                    <a href="/settings" className="dropdown-link">
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
                        <circle cx="12" cy="12" r="3"></circle>
                        <path d="M19.4 15a1.65 1.65 0 0 0 .33 1.82l.06.06a2 2 0 0 1 0 2.83 2 2 0 0 1-2.83 0l-.06-.06a1.65 1.65 0 0 0-1.82-.33 1.65 1.65 0 0 0-1 1.51V21a2 2 0 0 1-2 2 2 2 0 0 1-2-2v-.09A1.65 1.65 0 0 0 9 19.4a1.65 1.65 0 0 0-1.82.33l-.06.06a2 2 0 0 1-2.83 0 2 2 0 0 1 0-2.83l.06-.06a1.65 1.65 0 0 0 .33-1.82 1.65 1.65 0 0 0-1.51-1H3a2 2 0 0 1-2-2 2 2 0 0 1 2-2h.09A1.65 1.65 0 0 0 4.6 9a1.65 1.65 0 0 0-.33-1.82l-.06-.06a2 2 0 0 1 0-2.83 2 2 0 0 1 2.83 0l.06.06a1.65 1.65 0 0 0 1.82.33H9a1.65 1.65 0 0 0 1-1.51V3a2 2 0 0 1 2-2 2 2 0 0 1 2 2v.09a1.65 1.65 0 0 0 1 1.51 1.65 1.65 0 0 0 1.82-.33l.06-.06a2 2 0 0 1 2.83 0 2 2 0 0 1 0 2.83l-.06.06a1.65 1.65 0 0 0-.33 1.82V9a1.65 1.65 0 0 0 1.51 1H21a2 2 0 0 1 2 2 2 2 0 0 1-2 2h-.09a1.65 1.65 0 0 0-1.51 1z"></path>
                      </svg>
                      <span>Settings</span>
                    </a>
                  </li>
                  <li className="dropdown-divider"></li>
                  <li className="dropdown-item">
                    <a href="/sign-out" className="dropdown-link">
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
                        <path d="M9 21H5a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h4"></path>
                        <polyline points="16 17 21 12 16 7"></polyline>
                        <line x1="21" y1="12" x2="9" y2="12"></line>
                      </svg>
                      <span>Sign out</span>
                    </a>
                  </li>
                </ul>
              </div>
            )}
          </div>
        </div> */}
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
            {searchAudio (<h1>asdasdsd</h1>)}
          </section>

          {/* Recently played section */}
          <section className="content-section">
            <div className="section-header">
              <h2>Recently Played</h2>
              <a href="#" className="see-all-link">
                See All
              </a>
            </div>

            <div className="track-table-container">
              <table className="track-table">
                <thead>
                  <tr>
                    <th className="track-number">#</th>
                    <th className="track-title">Title</th>
                    <th className="track-album">Album</th>
                    <th className="track-duration">
                      <Clock size={16} />
                    </th>
                  </tr>
                </thead>
                <tbody>
                  {recentlyPlayed.map((track, index) => (
                    <tr
                      key={track.id}
                      className={`track-row ${
                        currentTrackIndex === index ? "active-track" : ""
                      }`}
                      onDoubleClick={() => playSong(index)}
                    >
                      <td className="track-number">
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
                                <rect x="6" y="4" width="4" height="16"></rect>
                                <rect x="14" y="4" width="4" height="16"></rect>
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
                      <td className="track-title">
                        <div className="track-info">
                          <img
                            src={track.cover || "/placeholder.svg"}
                            alt={track.title}
                            className="track-cover"
                          />
                          <div className="track-details">
                            <span className="track-name">{track.title}</span>
                            <div className="track-artist-container">
                              {track.explicit && (
                                <span className="explicit-badge">E</span>
                              )}
                              <span className="track-artist">
                                {track.artist}
                              </span>
                            </div>
                          </div>
                        </div>
                      </td>
                      <td className="track-album">{track.album}</td>
                      <td className="track-duration">
                        {formatTime(track.duration)}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>

          {/* Featured playlists section */}
          <section className="content-section">
            <div className="section-header">
              <h2>Featured Playlists</h2>
              <a href="#" className="see-all-link">
                See All
              </a>
            </div>
            <div className="playlist-grid">
              {featuredPlaylists.map((playlist) => (
                <div key={playlist.id} className="playlist-card">
                  <div className="playlist-artwork">
                    <img
                      src={playlist.cover || "/placeholder.svg"}
                      alt={playlist.title}
                    />
                    <div className="playlist-overlay">
                      <button className="play-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="playlist-title">{playlist.title}</h3>
                  <p className="playlist-description">{playlist.description}</p>
                </div>
              ))}
            </div>
          </section>

          {/* Top artists section */}
          <section className="content-section">
            <div className="section-header">
              <h2>Top Artists</h2>
              <a href="#" className="see-all-link">
                See All
              </a>
            </div>
            <div className="artist-grid">
              {topArtists.map((artist) => (
                <div key={artist.id} className="artist-card">
                  <div className="artist-artwork">
                    <img
                      src={artist.cover || "/placeholder.svg"}
                      alt={artist.name}
                    />
                    <div className="artist-overlay">
                      <button className="play-button">
                        <svg
                          xmlns="http://www.w3.org/2000/svg"
                          width="24"
                          height="24"
                          viewBox="0 0 24 24"
                          fill="currentColor"
                          stroke="none"
                        >
                          <polygon points="5 3 19 12 5 21 5 3"></polygon>
                        </svg>
                      </button>
                    </div>
                  </div>
                  <h3 className="artist-name">{artist.name}</h3>
                  <p className="artist-followers">
                    {artist.followers} followers
                  </p>
                </div>
              ))}
            </div>
          </section>

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
              <a
                href="#"
                className="browse-card"
                style={{ backgroundColor: "#1e40af" }}
              >
                <Music size={32} />
                <span>Albums</span>
              </a>
              <a
                href="#"
                className="browse-card"
                style={{ backgroundColor: "#065f46" }}
              >
                <Radio size={32} />
                <span>Podcasts</span>
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
