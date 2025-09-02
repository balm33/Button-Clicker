import React, { useEffect, useState } from "react";
import { auth } from "./firebase";
import {
  onAuthStateChanged,
  signOut,
  signInWithEmailAndPassword,
  createUserWithEmailAndPassword,
} from "firebase/auth";

const App = () => {
  // state to track the current page
  const [currentPage, setCurrentPage] = useState("home");
  // state to track user authentication status
  const [isAuth, setIsAuth] = useState(false);

  // listen to firebase auth state
  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setIsAuth(!!user);
    });
    return () => unsubscribe();
  }, []);

  // main layout and rendering logic
  return (
    <div className="app-container">
      <Navbar
        currentPage={currentPage}
        setCurrentPage={setCurrentPage}
        isAuth={isAuth}
        setIsAuth={setIsAuth}
      />
      <main className="main-content-container">
        <div className="content-card">
          {currentPage === "home" && <HomePage isAuth={isAuth} />}
          {currentPage === "login" && (
            <LoginPage setCurrentPage={setCurrentPage} setIsAuth={setIsAuth} />
          )}
          {currentPage === "register" && (
            <RegisterPage setCurrentPage={setCurrentPage} />
          )}
        </div>
      </main>
    </div>
  );
};

const Navbar = ({ setCurrentPage, isAuth }) => {
  const handleLogout = async () => {
    await signOut(auth);
    setCurrentPage("login");
  };

  return (
    <nav className="navbar">
      <div className="navbar-container">
        <h1 className="navbar-heading">Button Clicker</h1>
        <ul className="nav-links">
          <li>
            <a href="#" onClick={() => setCurrentPage("home")}>
              Home
            </a>
          </li>

          <li>
            {isAuth ? (
              <a href="#" onClick={handleLogout}>
                Logout
              </a>
            ) : (
              <a href="#" onClick={() => setCurrentPage("login")}>
                Login
              </a>
            )}
          </li>
        </ul>
      </div>
    </nav>
  );
};

const HomePage = ({ isAuth }) => {
  const [clickCount, setClickCount] = useState(0);

  return (
    <div className="home-page-container">
      <h2 className="page-title">Click the Button!</h2>
      {isAuth ? (
        <>
          <div className="click-counter">
            <p className="click-display">Clicks: {clickCount}</p>
            <button
              onClick={() => setClickCount(clickCount + 1)}
              className="click-button"
            >
              Click Me!
            </button>
          </div>
        </>
      ) : (
        <p className="page-message">Please log in to click the button.</p>
      )}
    </div>
  );
};

const LoginPage = ({ setCurrentPage, setIsAuth }) => {
  const handleLogin = async (e) => {
    e.preventDefault();
    // handle authentication logic
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await signInWithEmailAndPassword(auth, email, password);
      setCurrentPage("home");
    } catch (error) {
      alert(error.message);
    }

    setIsAuth(true);
  };

  return (
    <div className="login-page-container">
      <h2 className="page-title">Log In</h2>
      <form onSubmit={handleLogin} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit" className="login-button">
          Log In
        </button>
      </form>
      <a href="#" onClick={() => setCurrentPage("register")}>
        Register
      </a>
    </div>
  );
};

const RegisterPage = ({ setCurrentPage }) => {
  const handleRegister = async (e) => {
    e.preventDefault();
    const email = e.target.email.value;
    const password = e.target.password.value;

    try {
      await createUserWithEmailAndPassword(auth, email, password);
      setCurrentPage("home");
    } catch (error) {
      alert(error.message);
    }
  };

  return (
    <div className="login-page-container">
      <h2 className="page-title">Register</h2>
      <form onSubmit={handleRegister} className="login-form">
        <input
          type="email"
          name="email"
          placeholder="Email"
          className="form-input"
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          className="form-input"
          required
        />
        <button type="submit" className="login-button">
          Sign Up
        </button>
      </form>
      <p>
        Already have an account?{" "}
        <a href="#" onClick={() => setCurrentPage("login")}>
          Log In
        </a>
      </p>
    </div>
  );
};

export default App;
