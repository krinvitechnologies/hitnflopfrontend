// "use client"

import "./home.css";
import { Navbar } from "../../components/navbar/Navbar";
import BannerWrapper from "../../components/banner/BannerWrapper";
import Banner from "../../components/banner/Banner";
// import About from "../../components/about/About";
// import Footer from "../../components/footer/Footer";
// import Contact from "../../components/contact/Contact";
// import TeamMembers from "../../components/teamMembers/TeamMembers.jsx";
// import Gallery from "../../components/gallery/Gallery.jsx";
// import OurMission from "../../components/ourMission/OurMission.jsx";

const Page = () => {

  return (
    <div className="home">
      <Navbar />
      <Banner />
      {/* <BannerWrapper /> */}
      {/* 
      <Gallery />
      <About />
      <OurMission />
      <TeamMembers />
      <Contact />
      <Footer /> */}
    </div>
  );
};

export default Page