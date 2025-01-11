import React from 'react';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import './App.css';
import Home from './components/Home';
import About from './components/About';
import Projects from './components/Projects';
import instagramIcon from './static/instagram-icon.png';
import githubIcon from './static/github-icon.png';
import youtubeIcon from './static/youtube-icon.png';

function App() {
    return (
        <Router>
            <div className="App">
                <nav className="navbar">
                    <div className="nav-links">
                        <Link to="/">Home</Link>
                        <Link to="/projects">Projects</Link>
                        <Link to="/about">About</Link>
                    </div>
                    <div className="social-icons">
                        <a href="https://www.instagram.com/jakeswestcoast" target="_blank" rel="noopener noreferrer" title="Instagram">
                            <img src={instagramIcon} alt="Instagram" />
                        </a>
                        <a href="https://github.com/runyanjake/jakeswestcoast" target="_blank" rel="noopener noreferrer" title="GitHub">
                            <img src={githubIcon} alt="GitHub" />
                        </a>
                        <a href="https://www.youtube.com/@jakeswestcoast" target="_blank" rel="noopener noreferrer" title="YouTube">
                            <img src={youtubeIcon} alt="YouTube" />
                        </a>
                    </div>
                </nav>
                <Routes>
                    <Route path="/" element={<Home />} />
                    <Route path="/about" element={<About />} />
                    <Route path="/projects" element={<Projects />} />
                </Routes>
            </div>
        </Router>
    );
}

export default App;
