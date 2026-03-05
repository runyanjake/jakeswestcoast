import './Projects.css';
import VideoCard from './VideoCard';
import videos from '../data/videos';

function Projects() {
    return (
        <div className="projects-page">
            <div className="projects-header">
                <h1>Projects</h1>
                <p>Some of the larger projects we've done over the history of my channel.</p>
            </div>
            <div className="video-cards">
                {videos.map((video) => (
                    <VideoCard
                        key={video.url}
                        title={video.title}
                        url={video.url}
                        description={video.description}
                    />
                ))}
            </div>
        </div>
    );
}

export default Projects;
