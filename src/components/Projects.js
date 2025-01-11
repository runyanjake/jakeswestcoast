import './Projects.css';
import React from 'react';

function Projects() {
    const videos = [
        {
            title: 'The Bay Tour',
            url: 'https://www.youtube.com/watch?v=xhDQMUUZdio',
            description: 'A full loop of the bay area, starting in the South Bay and continuing counterclockwise over the 150 mile stretch.',
        },
        {
            title: 'America\'s Most Beautiful Bike Ride',
            url: 'https://www.youtube.com/watch?v=O4eEIqxIGCs',
            description: 'Footage from the 2024 America\'s Most Beautiful Bike Ride in Lake Tahoe. 80 miles of beautiful scenery and lake views.',
        },
        {
            title: 'Alpine Dam',
            url: 'https://www.youtube.com/watch?v=_z7g9PyfrK8',
            description: 'A relaxed group ride into Marin county to Alpine Dam. Lots of climbing from city to dam to the ridgeline.',
        },
    ];

    return (
        <div className="page">
            <h1>Projects</h1>
            <p>Some of the larger projects we've done over the history of my channel.</p>
            <div className="video-cards">
                {videos.map((video, index) => (
                    <div className="video-card" key={index}>
                        <h2>{video.title}</h2>
                        <iframe
                            width="560"
                            height="315"
                            src={`https://www.youtube.com/embed/${video.url.split('v=')[1]}`}
                            title={video.description}
                            frameBorder="0"
                            allowFullScreen
                        ></iframe>
                        <p>{video.description}</p>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default Projects;