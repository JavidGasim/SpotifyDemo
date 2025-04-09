import { useEffect, useState } from "react";
import "../Login/Login.css";
import Navbar from "../MusicAnimation/Navbar";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import Cookies from "js-cookie";

export default function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);

  const [data, setData] = useState({
    userName: "",
    password: "",
  });

  useEffect(() => {
    setData({ userName: username, password });
  }, [username, password]);

  const navigate = useNavigate();
  var generalUrl = "https://localhost:5002/";

  async function LoginUser() {
    var url = generalUrl + "login";
    var obj = {
      userName: data.userName,
      password: data.password,
    };

    // alert(data.userName);
    // alert(data.password);

    await axios
      .post(url, obj)
      .then((response) => {
        // alert("Login is Successfully");
        Cookies.set(data.userName, response.data.token, response.data.role, {
          expires: 30,
        });
        Cookies.set("username", data.userName, { expires: 30 });
        Cookies.set("role", response.data.role, { expires: 30 });
        console.log(response.data.role);

        // var username = Cookies.get("username");
        // var token = Cookies.get(username);
        // alert(username,token)
        // CurrentUser();
        if (response.data.role == "artist") {
          navigate("/artist");
        } else if (response.data.role == "listener") {
          navigate("/listener");
        }
      })
      .catch((error) => {
        alert("Not found User!");
      });
  }

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Sign in attempt with:", { username, password });
    LoginUser();
  };

  return (
    <main className="main-container">
      <Navbar />
      <div className="form-container">
        <div className="form-card">
          <div className="form-header">
            <h1 className="form-title">Sign In</h1>
            <p className="form-subtitle">Welcome back to Melodify</p>
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
                  aria-label={showPassword ? "Hide password" : "Show password"}
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

            <div className="form-options">
              <div className="remember-me">
                <input
                  type="checkbox"
                  id="remember"
                  className="remember-checkbox"
                />
                <label htmlFor="remember" className="remember-label">
                  Remember me
                </label>
              </div>
              <a href="#" className="forgot-password">
                Forgot password?
              </a>
            </div>

            <button type="submit" className="submit-button">
              Sign In
            </button>
          </form>

          <div className="form-footer">
            <p className="switch-text">
              Don't have an account?{" "}
              <button
                className="switch-link"
                onClick={() => navigate("/register")}
              >
                Sign Up
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
  );
}
