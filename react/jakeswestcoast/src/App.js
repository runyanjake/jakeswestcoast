// Import necessary libraries
import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';

// Home page component
function Home() {
  return (
    <div className="home">
      <div className="home-content">
        <h1>Jake&apos;s West Coast</h1>
        <p>My Mountaineering Diary</p>
      </div>
      <img 
        src="https://i.giphy.com/media/v1.Y2lkPTc5MGI3NjExdXpzcjE2bzh4bGd1MDBmNjVvajk2aHc5eXJocmoyb3hydHA5ZXoydyZlcD12MV9pbnRlcm5hbF9naWZfYnlfaWQmY3Q9Zw/F86jaFeIpE55nvF8M5/giphy.gif" 
        alt="Jakeswestcoast"
        className="background-video"
      />
    </div>
  );
}

// About page component
function About() {
  return (
    <div className="page">
      <h1>About</h1>
      <p>Welcome to my mountaineering diary. Follow my adventures across the West Coast mountains!</p>
    </div>
  );
}

// Projects page component
function Projects() {
  return (
    <div className="page">
      <h1>Projects</h1>
      <p>Here you can find my climbing routes, expeditions, and other mountaineering projects.</p>
    </div>
  );
}

// Main App component
function App() {
  return (
    <Router>
      <nav>
        <ul>
          <li><Link to="/">Home</Link></li>
          <li><Link to="/about">About</Link></li>
          <li><Link to="/projects">Projects</Link></li>
        </ul>
      </nav>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/about" element={<About />} />
        <Route path="/projects" element={<Projects />} />
      </Routes>
    </Router>
  );
}

export default App;
