import React from "react";
import Slider from "../../components/Slider/Slider";
import About from "../../components/About/About";
import Trending from "../../components/Trending/Trending";
import Culturals from "../../components/Culturals/Culturals";
import BuyCoffee from "../../components/BuyCoffee/BuyCoffee";

const Home = () => {
  return (
    <div className="home">
      <div className="container">
        <Slider />
        <About />
        <Trending />
        <Culturals/>
        <BuyCoffee />
      </div>
    </div>
  );
};

export default Home;