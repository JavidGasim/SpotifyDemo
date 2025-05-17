import axios from "axios";
import Cookies from "js-cookie";
import React, { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";

export default function AllArtists() {
  const navigate = useNavigate();
  var generalUrl = "https://localhost:5002/";
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
        const artists = response.data.users.filter(
          (user) => user.roles[0] == "artist"
        );

        setAllArtists(artists);
        console.log(artists);
      })
      .catch((error) => {
        console.log(error);
        console.log(error.response);
        alert(error.response?.data?.message);
      });
  };

  useEffect(() => {
    getAllArtists();
  }, []);

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
        <div className="content-wrapper">
          <section className="content-section">
            <div className="section-header3">
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

              <h2>All Artists</h2>
            </div>
            <div className="track-table-container">
              <table className="track-table">
                <thead>
                  <tr>
                    <th className="track-number">#</th>
                    <th className="track-title">Cover</th>
                    <th className="track-album">Singer Name</th>
                    <th className="track-album">Singer Surname</th>
                    <th className="track-album">Singer Username</th>
                  </tr>
                </thead>
                <tbody>
                  {allArtists.map((artist, index) => (
                    <tr
                      key={artist.id}
                      onClick={() => navigate(`/selectedArtist/${artist.id}`)}
                    >
                      <td style={{ padding: "0", verticalAlign: "top" }}>
                        <button className="play-button" style={{ margin: "0" }}>
                          {index + 1}
                        </button>
                      </td>
                      <td>
                        {" "}
                        <img
                          src={artist.imagePath || "/placeholder.svg"}
                          alt={artist.name}
                          className="track-cover"
                        />
                      </td>
                      <td className="track-title">
                        <span className="track-name">{artist.name}</span>
                      </td>
                      <td className="track-title">
                        <span className="track-name">{artist.surname}</span>
                      </td>
                      <td className="track-title">
                        <span className="track-name">{artist.userName}</span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </section>
        </div>
      </main>
    </div>
  );
}
