import "./Home.css";

function Home() {
  return (
    <div className="home-container">
      <div className="home-content">
        <h1 className="home-title">Welcome to Blink</h1>
        <p className="home-subtitle">
          Manage your mobile plans seamlessly — switch, customize, or renew with a single click.
        </p>
        <button className="home-btn">Explore Plans</button>
      </div>
    </div>
  );
}

export default Home;
