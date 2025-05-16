import { useRef, useState, useEffect } from "react";
import Navbar from "../MusicAnimation/Navbar";
import "../Register/Register.css";
import { useNavigate } from "react-router-dom";
import axios from "axios";

export default function Register() {
  const [username, setUsername] = useState("");
  const [name, setName] = useState("");
  const [surname, setSurname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [profileImage, setProfileImage] = useState(null);
  const [imagePreview, setImagePreview] = useState(null);
  const [imageUrl, setImageUrl] = useState("");
  const [previewUrl, setPreviewUrl] = useState("");
  const fileInputRef = useRef(null);
  const [role, setRole] = useState("");
  const [loading, setLoading] = useState(false);

  const [data, setData] = useState({
    userName: "",
    name: "",
    surName: "",
    email: "",
    password: "",
  });

  useEffect(() => {
    setData({ userName: username, name, surName: surname, email, password });
  }, [username, name, surname, email, password]);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Handle sign up logic here
    console.log("Sign up attempt with:", {
      username,
      name,
      surname,
      profileImage,
      email,
      password,
      role,
    });
    console.log("Sign up attempt with:", {
      data,
      name,
      surname,
      profileImage,
      email,
      password,
      role,
    });
    // if (validateForm()) {
    var message = "";
    var url = generalUrl + `existUser?name=${data.userName}`;
    await axios
      .post(url)
      .then((response) => {
        console.log(response.data.message);
      })
      .catch((error) => {
        if (error.response) {
          console.log("Status:", error.response.data.status);
          console.log("Message:", error.response.data.message);
          console.log("Errors:", error.response.data.error);
          message = error.response.data.message;
        } else {
          console.log("An unexpected error occurred.");
        }
      });
    if (message == "") {
      RegisterUser();
    } else {
      alert(message);
    }
    // }
  };

  const handleRoleChange = (selectedRole) => {
    setRole(selectedRole);
    console.log(selectedRole);
  };

  const handleImageChange = async (e) => {
    const file = e.target.files[0];
    if (!file) {
      return;
    }
    // Validate file type
    // if (!file.type.match("image.*")) {
    //   alert("Please select an image file");
    //   return;
    // }

    // // Validate file size (max 5MB)
    // if (file.size > 5 * 1024 * 1024) {
    //   alert("Image size should be less than 5MB");
    //   return;
    // }

    // setProfileImage(file);

    // // Create image preview
    // const reader = new FileReader();
    // reader.onloadend = () => {
    //   setImagePreview(reader.result);
    // };
    // reader.readAsDataURL(file);
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

    const formData = new FormData();
    formData.append("file", file);

    try {
      const response = await axios.post(
        "https://localhost:5002/idNewImage",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      setImageUrl(response.data.imageUrl);
      console.log("Şəkil yükləndi:", response.data.imageUrl);
    } catch (error) {
      console.error("Yükləmə xətası:", error);
    }
  };

  var generalUrl = "https://localhost:5002/";

  function RegisterUser() {
    setLoading(true);
    var url = generalUrl + "register";
    var obj = {
      userName: data.userName,
      name: data.name,
      surname: data.surName,
      email: data.email,
      password: data.password,
      imagePath: imageUrl,
      role: role,
    };

    axios
      .post(url, obj)
      .then((response) => {
        console.log(response.data.message);
        navigate("/login");
      })
      .catch((error) => {
        if (error.response) {
          console.log("Status:", error.response.data.status);
          console.log("Message:", error.response.data.message);
          console.log("Errors:", error.response.data.error);
        } else {
          console.log("An unexpected error occurred.");
        }
      })
      .finally(() => setLoading(false));
  }

  const triggerFileInput = () => {
    fileInputRef.current.click();
  };

  return (
    <>
      {loading ? (
        <div className="loading-container">
          <img src="/loading.gif" alt="loading" />
        </div>
      ) : (
        <main className="main-container">
          <Navbar />
          <div className="form-container">
            <div className="form-card">
              <div className="form-header">
                <h1 className="form-title">Sign Up</h1>
                <p className="form-subtitle">
                  Join Melodify and start your musical journey
                </p>
              </div>

              <div className="profile-image-upload">
                <div
                  className="image-preview"
                  onClick={triggerFileInput}
                  style={{
                    backgroundImage: imageUrl ? `url(${imageUrl})` : "none",
                  }}
                >
                  {!imageUrl && (
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
                        <path d="M20 21v-2a4 4 0 0 0-4-4H8a4 4 0 0 0-4 4v2"></path>
                        <circle cx="12" cy="7" r="4"></circle>
                      </svg>
                    </div>
                  )}
                  <div className="image-overlay">
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
                      <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"></path>
                      <polyline points="17 8 12 3 7 8"></polyline>
                      <line x1="12" y1="3" x2="12" y2="15"></line>
                    </svg>
                  </div>
                </div>
                <input
                  type="file"
                  ref={fileInputRef}
                  onChange={handleImageChange}
                  accept="image/*"
                  className="file-input"
                />
                <p className="upload-text">
                  {imageUrl
                    ? "Change profile picture"
                    : "Upload profile picture"}
                </p>
              </div>

              <form className="auth-form" onSubmit={handleSubmit}>
                <div className="form-group">
                  <label htmlFor="username" className="form-label">
                    Username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="form-input"
                    placeholder="username"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="name" className="form-label">
                    Name
                  </label>
                  <input
                    type="text"
                    id="name"
                    className="form-input"
                    placeholder="name"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="surname" className="form-label">
                    Surname
                  </label>
                  <input
                    type="text"
                    id="surname"
                    className="form-input"
                    placeholder="surname"
                    value={surname}
                    onChange={(e) => setSurname(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="email" className="form-label">
                    Email
                  </label>
                  <input
                    type="email"
                    id="email"
                    className="form-input"
                    placeholder="your@email.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                  />
                </div>

                <div className="form-group">
                  <label htmlFor="password" className="form-label">
                    Password
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showPassword ? "text" : "password"}
                      id="password"
                      className="form-input password-input"
                      placeholder="••••••••"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-button"
                      onClick={() => setShowPassword(!showPassword)}
                      aria-label={
                        showPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showPassword ? (
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
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label htmlFor="confirm-password" className="form-label">
                    Confirm Password
                  </label>
                  <div className="password-input-container">
                    <input
                      type={showConfirmPassword ? "text" : "password"}
                      id="confirm-password"
                      className="form-input password-input"
                      placeholder="••••••••"
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    <button
                      type="button"
                      className="password-toggle-button"
                      onClick={() =>
                        setShowConfirmPassword(!showConfirmPassword)
                      }
                      aria-label={
                        showConfirmPassword ? "Hide password" : "Show password"
                      }
                    >
                      {showConfirmPassword ? (
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
                          <path d="M17.94 17.94A10.07 10.07 0 0 1 12 20c-7 0-11-8-11-8a18.45 18.45 0 0 1 5.06-5.94M9.9 4.24A9.12 9.12 0 0 1 12 4c7 0 11 8 11 8a18.5 18.5 0 0 1-2.16 3.19m-6.72-1.07a3 3 0 1 1-4.24-4.24"></path>
                          <line x1="1" y1="1" x2="23" y2="23"></line>
                        </svg>
                      ) : (
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
                          <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
                          <circle cx="12" cy="12" r="3"></circle>
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                <div className="form-group">
                  <label className="form-label">Select Your Role</label>
                  <div className="roles-container">
                    <div className="role-radio">
                      <input
                        type="radio"
                        id="role-listener"
                        className="role-input"
                        checked={role === "listener"}
                        onChange={() => handleRoleChange("listener")}
                        name="role"
                      />
                      <label htmlFor="role-listener" className="role-label">
                        <span className="role-radio-custom"></span>
                        <span className="role-text">Listener</span>
                      </label>
                    </div>

                    <div className="role-radio">
                      <input
                        type="radio"
                        id="role-artist"
                        className="role-input"
                        checked={role === "artist"}
                        onChange={() => handleRoleChange("artist")}
                        name="role"
                      />
                      <label htmlFor="role-artist" className="role-label">
                        <span className="role-radio-custom"></span>
                        <span className="role-text">Artist</span>
                      </label>
                    </div>
                    <div className="role-radio">
                      <input
                        type="radio"
                        id="role-admin"
                        className="role-input"
                        checked={role === "admin"}
                        onChange={() => handleRoleChange("admin")}
                        name="role"
                      />
                      <label htmlFor="role-admin" className="role-label">
                        <span className="role-radio-custom"></span>
                        <span className="role-text">Admin</span>
                      </label>
                    </div>
                  </div>
                </div>

                <div className="terms-checkbox">
                  <input
                    type="checkbox"
                    id="terms"
                    className="terms-input"
                    required
                  />
                  <label htmlFor="terms" className="terms-label">
                    I agree to the{" "}
                    <a href="#" className="terms-link">
                      Terms of Service
                    </a>{" "}
                    and{" "}
                    <a href="#" className="terms-link">
                      Privacy Policy
                    </a>
                  </label>
                </div>

                <button type="submit" className="submit-button">
                  Create Account
                </button>
              </form>

              <div className="form-footer">
                <p className="switch-text">
                  Already have an account?{" "}
                  <button
                    className="switch-link"
                    onClick={() => navigate("/login")}
                  >
                    Sign In
                  </button>
                </p>
              </div>
            </div>

            <div className="decoration-element">
              <div className="music-note-1"></div>
              <div className="music-note-2"></div>
              <div className="music-note-3"></div>
            </div>
          </div>
        </main>
      )}
    </>
  );
}
