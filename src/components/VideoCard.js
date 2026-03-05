import './VideoCard.css';

function VideoCard({ title, url, description }) {
    const videoId = url.split('v=')[1];

    return (
        <div className="video-card">
            <iframe
                src={`https://www.youtube.com/embed/${videoId}`}
                title={title}
                frameBorder="0"
                allowFullScreen
            ></iframe>
            <div className="video-card-info">
                <h2>{title}</h2>
                <p>{description}</p>
            </div>
        </div>
    );
}

export default VideoCard;
