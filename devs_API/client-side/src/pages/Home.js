import Devs from "../components/fetchData";

const Home = () => {
  return (
    <div className="home">
      <h1 className="title">Programuotojai API</h1>
      <div id="homepage">
        <h2>Surask programuotoją šalia savęs!</h2>
        <div id="devs">
          <Devs />
        </div>
      </div>
    </div>
  );
};

export default Home;
