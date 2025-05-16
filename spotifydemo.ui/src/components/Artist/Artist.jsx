import { useState, useRef, useEffect } from "react";
import "../Artist/Artist.css";
import { useNavigate } from "react-router-dom";
import Cookies from "js-cookie";
import axios from "axios";
import AudioPlayer from "react-h5-audio-player";
export default function Artist() {
  // Artist profile data
  const [artist, setArtist] = useState({
    email: "",
    id: "",
    imagepath: "",
    name: "",
    surname: "",
    username: "",
  });

  const [audios, setAudios] = useState([]);
  const [loading, setLoading] = useState(true);

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

  async function AllAudios() {
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    try {
      setLoading(true);
      const url = generalUrl + `userAllAudios/${artist.id}`;
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
    CurrentUser();
  }, []);

  useEffect(() => {
    if (artist.id) {
      AllAudios();
    }
  }, [artist]);

  useEffect(() => {
    console.log("Updated Artist:", artist);
  }, [artist]);

  // Player state
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentSongId, setCurrentSongId] = useState("");
  const [currentTime, setCurrentTime] = useState(0);
  const [duration, setDuration] = useState(0);
  const audioRef = useRef(null);
  // const [audioUrl, setAudioUrl] = useState(null);
  const [previewUrl, setPreviewUrl] = useState("");
  // Form states
  const [showAddForm, setShowAddForm] = useState(false);
  const [showEditForm, setShowEditForm] = useState(false);
  const [formData, setFormData] = useState({
    id: null,
    title: "",
    name: "",
    coverArt: null,
    audioFile: null,
  });
  const [coverArtPreview, setCoverArtPreview] = useState(null);
  const [audioFileName, setAudioFileName] = useState("");
  const coverArtInputRef = useRef(null);
  const audioFileInputRef = useRef(null);

  // Handle song playback
  const playSong = async (songId) => {
    if (currentSongId === songId && isPlaying) {
      setIsPlaying(false);
      audioRef.current.pause();
    } else {
      setCurrentSongId(songId);
      setIsPlaying(true);

      // const audio = audioRef.current;
      // console.log(audio.duration);
      // console.log(audio.metadata);
      // In a real app, you would load the audio file here
      // For now, we'll just simulate playback
      setDuration(audios.find((song) => song.id === songId).duration);
      // setDuration(audioRef.current.duration);
      console.log(duration);

      setCurrentTime(0);

      // If we had actual audio:
      // audioRef.current.src = audios.find((song) => song.id === songId).audioUrl;
      // audioRef.current.play();
    }
  };

  const handleMetadata = async () => {
    const audio = audioRef.current;
    console.log(audio);

    if (audio) {
      setDuration(audio.duration); // Audio-nun uzunluğunu (duration) alırıq
    }
  };
  // Format time for display (e.g., 3:45)
  const formatTime = (seconds) => {
    const mins = Math.floor(seconds / 60);
    const secs = Math.floor(seconds % 60);
    return `${mins}:${secs < 10 ? "0" : ""}${secs}`;
  };

  // Format date for display
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString("en-US", {
      year: "numeric",
      month: "short",
      day: "numeric",
    });
  };

  // Handle progress bar change
  const handleProgressChange = (e) => {
    const newTime = (e.target.value / 100) * duration;
    setCurrentTime(newTime);
    // In a real app with actual audio:
    // audioRef.current.currentTime = newTime
  };

  useEffect(() => {
    let interval;

    if (isPlaying) {
      audioRef.current.play();
      interval = setInterval(() => {
        if (currentTime < duration) {
          setCurrentTime((prev) => {
            const newTime = prev + 1;
            if (newTime >= duration) {
              setIsPlaying(false);
              return 0;
            }
            return newTime;
          });
        } else {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  // Handle form input changes
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData({
      ...formData,
      [name]: value,
    });
  };

  // Handle file inputs
  const [audioLoad, setAudioLoad] = useState(false);
  const handleFileChange = async (e) => {
    const { name, files } = e.target;

    if (name === "coverArt" && files[0]) {
      const file = e.target.files[0];

      if (!file) {
        return;
      }

      const allowedFormats = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "image/bmp",
        "image/webp",
      ];
      if (!allowedFormats.includes(file.type)) {
        alert("Yalnız şəkil formatında fayllara icazə verilir!");
        return;
      }

      const newPreviewUrl = URL.createObjectURL(file);
      setPreviewUrl(newPreviewUrl);
      // setFormData((prevdata) => ({
      //   ...prevdata,
      //   coverArt: newPreviewUrl,
      // }));

      const formData2 = new FormData();
      formData2.append("file", file);

      try {
        const response = await axios.post(
          "https://localhost:5002/msNewImage",
          formData2,
          {
            headers: {
              "Content-Type": "multipart/form-data",
            },
          }
        );
        // alert(response.data.imageUrl);
        // setImageUrl(response.data.imageUrl);
        setFormData((prevdata) => ({
          ...prevdata,
          coverArt: response.data.imageUrl,
        }));
        setCoverArtPreview(response.data.imageUrl);
        console.log(formData.coverArt);

        console.log("Şəkil yükləndi:", response.data.imageUrl);
      } catch (error) {
        console.error("Yükləmə xətası:", error);
      }
    }

    if (name === "audioFile" && files[0]) {
      const file = e.target.files[0];

      if (!file) {
        // alert("Please select an audio file first!");
        return;
      }

      setAudioLoad(true);
      const formData2 = new FormData();
      formData2.append("file", file);

      try {
        const response = await axios.post(
          "https://localhost:5002/uploadAudio",
          formData2
        );
        // setAudioUrl(response.data.audioUrl);
        setFormData((prevdata) => ({
          ...prevdata,
          audioFile: response.data.audioUrl,
        }));
        setAudioFileName(response.data.audioUrl);
        console.log(formData.audioFile);

        console.log("Audio url => ", response.data.audioUrl);
        // alert(response.data.audioUrl);
      } catch (error) {
        console.error("Audio upload failed", error);
        // alert(error.response.data.message);
      } finally {
        setAudioLoad(false);
      }
    }
  };

  // Open add song form
  const openAddForm = () => {
    setFormData({
      id: null,
      title: "",
      name: "",
      coverArt: null,
      audioFile: null,
    });
    setCoverArtPreview(null);
    setAudioFileName("");
    setShowAddForm(true);
    setShowEditForm(false);
  };

  // Open edit song form
  const openEditForm = async (song) => {
    setFormData({
      id: song.id,
      title: song.title,
      name: song.name,
      coverArt: song.coverArt,
      audioFile: null,
    });
    setCoverArtPreview(song.imageUrl);
    setAudioFileName(song.audioUrl);
    setShowEditForm(true);
    setShowAddForm(false);
  };

  // Close forms
  const closeForm = () => {
    setShowAddForm(false);
    setShowEditForm(false);
  };

  // Handle form submission

  const [updateLoading, setUpdateLoading] = useState(false);
  // const [addLoading, setAddLoading] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();

    if (showAddForm) {
      // Add new song
      var obj = {
        name: formData.name,
        title: formData.title,
        imageUrl: formData.coverArt,
        audioUrl: formData.audioFile,
        userId: artist.id,
      };
      // addLoading(true);
      setUpdateLoading(true);

      console.log(obj.audioUrl);
      console.log(obj.imageUrl);
      console.log(obj.name);
      console.log(obj.title);
      console.log(obj.userId);

      const name2 = Cookies.get("username");
      const token = Cookies.get(name2);
      const url = "https://localhost:5002/newAudio";

      // alert(token);
      await axios
        .post(url, obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          alert("Audio Added Successfully");
          AllAudios();
          navigate("/artist");
        })
        .catch((error) => {
          alert(error.response.data.message);
          console.error("Yükləmə xətası:", error);
        })
        .finally(() => {
          // addLoading(false);
          setUpdateLoading(false);
        });
    } else if (showEditForm) {
      // Update existing song
      // const updatedSongs = audios.map((song) => {
      //   if (song.id === formData.id) {
      //     return {
      //       ...song,
      //       title: formData.title,
      //       releaseDate: formData.releaseDate,
      //       coverArt: coverArtPreview || song.coverArt,
      //       audioFile: formData.audioFile || song.audioFile,
      //     };
      //   }
      //   return song;
      // });

      // setAudios(updatedSongs);
      setUpdateLoading(true);
      var obj = {
        id: formData.id,
        name: formData.name,
        title: formData.title,
        imageUrl: formData.coverArt,
        audioUrl: formData.audioFile,
        userId: artist.id,
      };

      console.log(obj.audioUrl);
      console.log(obj.imageUrl);
      console.log(obj.name);
      console.log(obj.title);
      console.log(obj.userId);

      const name2 = Cookies.get("username");
      const token = Cookies.get(name2);
      const url = "https://localhost:5002/updateAudio";

      // alert(token);
      await axios
        .put(url, obj, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        })
        .then((response) => {
          // alert("Audio Updated Successfully");
          // navigate("/artist");
          navigate(0);
        })
        .catch((error) => {
          // alert(error.response.data.message);
          console.error("Yükləmə xətası:", error);
        })
        .finally(() => {
          setUpdateLoading(false);
        });
    }

    closeForm();
  };

  // Delete a song
  const deleteSong = async (songId) => {
    const name = Cookies.get("username");
    const token = Cookies.get(name);

    try {
      setLoading(true);
      const url = generalUrl + `deleteAudio/${songId}`;
      const response = await axios.delete(url, {
        headers: { Authorization: `Bearer ${token}` },
      });
      console.log(response.data);

      const updatedSongs = audios.filter((song) => song.id !== songId);
      setAudios(updatedSongs);

      if (currentSongId === songId) {
        setIsPlaying(false);
        setCurrentSongId(null);
      }
    } catch (error) {
      alert(error.response?.data?.message || "Failed to delete audio");
    } finally {
      setLoading(false);
    }
  };

  // Trigger file input click
  const triggerFileInput = (inputRef) => {
    inputRef.current.click();
    console.log(inputRef);
  };

  // // Simulate playback progress
  useEffect(() => {
    let interval;

    if (isPlaying) {
      interval = setInterval(() => {
        if (currentTime < duration) {
          setCurrentTime((prev) => {
            const newTime = prev + 1;
            if (newTime >= duration) {
              setIsPlaying(false);
              return 0;
            }
            return newTime;
          });
        } else {
          setIsPlaying(false);
          setCurrentTime(0);
        }
      }, 1000);
    }

    return () => clearInterval(interval);
  }, [isPlaying, currentTime, duration]);

  const navigate = useNavigate();

  return (
    <div className="artist-page">
      {/* Sidebar */}

      {/* Main content */}
      <main className="main-content3">
        <nav className="navbar">
          <div className="logo-container">
            <h1 className="logo" onClick={() => navigate("/")}>
              Spotify
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
          {/* Stats section */}
          <section className="stats-section">
            <div className="stat-card">
              <div className="stat-value">{audios.length}</div>
              <div className="stat-label">Songs</div>
            </div>
          </section>

          {/* Songs section */}
          <section className="songs-section">
            <div className="section-header">
              <h2>Your Songs</h2>
              <button className="add-song-button" onClick={openAddForm}>
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="none"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                >
                  <line x1="12" y1="5" x2="12" y2="19"></line>
                  <line x1="5" y1="12" x2="19" y2="12"></line>
                </svg>
                Add New Song
              </button>
            </div>

            {audios.length === 0 ? (
              <div className="no-songs">
                <p>You haven't uploaded any songs yet.</p>
                <button className="add-first-song-button" onClick={openAddForm}>
                  Upload Your First Song
                </button>
              </div>
            ) : (
              <div className="songs-table-container">
                <table className="songs-table">
                  <thead>
                    <tr>
                      <th style={{ width: "50px" }}>#</th>
                      <th style={{ width: "90%" }}>Title</th>
                      <th style={{ width: "10%" }}>Actions</th>
                    </tr>
                  </thead>
                  {loading ? (
                    <div>
                      <img src="/loading.gif" alt="Loading..." />
                    </div>
                  ) : (
                    <tbody>
                      {audios.map((song, index) => (
                        <tr
                          key={song.id}
                          className={
                            currentSongId === song.id ? "active-song" : ""
                          }
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
                              <span className="song-title">
                                {artist.name} - {song.name}
                              </span>
                            </div>
                          </td>
                          <td>
                            <div className="song-actions">
                              <button
                                className="action-button edit"
                                onClick={() => openEditForm(song)}
                                title="Edit song"
                              >
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
                                  <path d="M11 4H4a2 2 0 0 0-2 2v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2v-7"></path>
                                  <path d="M18.5 2.5a2.121 2.121 0 0 1 3 3L12 15l-4 1 1-4 9.5-9.5z"></path>
                                </svg>
                              </button>
                              <button
                                className="action-button delete"
                                onClick={() => deleteSong(song.id)}
                                title="Delete song"
                              >
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
                                  <polyline points="3 6 5 6 21 6"></polyline>
                                  <path d="M19 6v14a2 2 0 0 1-2 2H7a2 2 0 0 1-2-2V6m3 0V4a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2"></path>
                                  <line x1="10" y1="11" x2="10" y2="17"></line>
                                  <line x1="14" y1="11" x2="14" y2="17"></line>
                                </svg>
                              </button>
                            </div>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  )}
                </table>
              </div>
            )}
          </section>
        </div>
      </main>

      {/* Player bar */}
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
              {/* <p className="track-artist">{artist.artistName}</p> */}
            </div>
          </div>{" "}
          <audio
            controls
            ref={audioRef}
            src={audios.find((song) => song.id == currentSongId).audioUrl}
            // onPlay={setIsPlaying(true)}
            // onPause={setIsPlaying(false)}
            onLoadedMetadata={handleMetadata}
          />
          {/* <AudioPlayer
            autoPlay
            src={audios.find((song) => song.Id == currentSongId).audioUrl}
            onPlay={(e) => console.log("onPlay")}
          /> */}
        </footer>
      )}

      {/* Add/Edit Song Modal */}
      {(showAddForm || showEditForm) &&
        (updateLoading ? (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <img src="/loading.gif" alt="loading" />
              </div>
            </div>
          </div>
        ) : (
          <div className="modal-overlay">
            <div className="modal-content">
              <div className="modal-header">
                <h2>{showAddForm ? "Add New Song" : "Edit Song"}</h2>
                <button className="close-button" onClick={closeForm}>
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    width="24"
                    height="24"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth="2"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  >
                    <line x1="18" y1="6" x2="6" y2="18"></line>
                    <line x1="6" y1="6" x2="18" y2="18"></line>
                  </svg>
                </button>
              </div>

              <form onSubmit={handleSubmit} className="song-form">
                <div className="form-group">
                  <label htmlFor="title">Song Title</label>
                  <input
                    type="text"
                    id="title"
                    name="title"
                    value={formData.title}
                    onChange={handleInputChange}
                    placeholder="Enter song title"
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name">Name</label>
                  <input
                    type="text"
                    id="name"
                    name="name"
                    value={formData.name}
                    placeholder="Enter song name"
                    onChange={handleInputChange}
                    required
                  />
                </div>

                <div className="form-group">
                  <label>Cover Art</label>
                  <div className="file-upload-container">
                    <div
                      className="cover-art-preview"
                      onClick={() => triggerFileInput(coverArtInputRef)}
                      style={{
                        backgroundImage: coverArtPreview
                          ? `url(${coverArtPreview})`
                          : "none",
                      }}
                    >
                      {!coverArtPreview && (
                        <div className="upload-placeholder">
                          <svg
                            xmlns="http://www.w3.org/2000/svg"
                            width="32"
                            height="32"
                            viewBox="0 0 24 24"
                            fill="none"
                            stroke="currentColor"
                            strokeWidth="2"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                          >
                            <rect
                              x="3"
                              y="3"
                              width="18"
                              height="18"
                              rx="2"
                              ry="2"
                            ></rect>
                            <circle cx="8.5" cy="8.5" r="1.5"></circle>
                            <polyline points="21 15 16 10 5 21"></polyline>
                          </svg>
                          <span>Click to upload cover art</span>
                        </div>
                      )}
                    </div>
                    <input
                      type="file"
                      ref={coverArtInputRef}
                      name="coverArt"
                      // value={formData.coverArt}
                      onChange={handleFileChange}
                      accept="image/*"
                      className="file-input"
                    />
                  </div>
                </div>

                <div className="form-group">
                  <label>Audio File</label>
                  <div className="audio-upload-container">
                    <button
                      type="button"
                      className="audio-upload-button"
                      onClick={() => triggerFileInput(audioFileInputRef)}
                    >
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        width="20"
                        height="20"
                        viewBox="0 0 24 24"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                        <polyline points="17 8 12 3 7 8"></polyline>
                        <line x1="12" y1="3" x2="12" y2="15"></line>
                      </svg>
                      {audioFileName
                        ? "Change audio file"
                        : "Upload audio file"}
                    </button>
                    {audioLoad && (
                      <div>
                        <img
                          style={{ width: "70px" }}
                          src="loading.gif"
                          alt="Loading"
                        />
                      </div>
                    )}
                    {audioFileName && (
                      <div className="file-name">
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
                          <path d="M12 18c0-5.3-8-5.3-8-10a4 4 0 0 1 8 0v1a4 4 0 0 1-8 0"></path>
                          <line x1="8" y1="22" x2="8" y2="18"></line>
                          <line x1="12" y1="22" x2="12" y2="18"></line>
                        </svg>
                        {/* {audioFileName} */}
                        <audio
                          controls
                          src={audioFileName}
                          className="audio-preview"
                        ></audio>
                      </div>
                    )}
                    <input
                      type="file"
                      ref={audioFileInputRef}
                      name="audioFile"
                      onChange={handleFileChange}
                      accept="audio/*"
                      className="file-input"
                    />
                  </div>
                </div>

                <div className="form-actions">
                  <button
                    type="button"
                    className="cancel-button"
                    onClick={closeForm}
                  >
                    Cancel
                  </button>
                  <button type="submit" className="submit-button">
                    {showAddForm ? "Add Song" : "Update Song"}
                  </button>
                </div>
              </form>
            </div>
          </div>
        ))}
    </div>
  );
}
