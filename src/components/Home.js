import './Home.css';

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

  export default Home;