// "use client"

import "./home.css";
import Navbar from "../../components/navbar/Navbar";
import BannerWrapper from "../../components/banner/BannerWrapper";
import Banner from "../../components/banner/Banner";
import About from "../../components/about/About";
import Footer from "../../components/footer/Footer";
import Contact from "../../components/contact/Contact";
import Faq from "../../components/faq/Faq";
// import TeamMembers from "../../components/teamMembers/TeamMembers.jsx";
// import Gallery from "../../components/gallery/Gallery.jsx";
// import OurMission from "../../components/ourMission/OurMission.jsx";

const Page = () => {

  return (
    <div className="home">
      <Navbar />
      <Banner />
      {/* <BannerWrapper /> */}
      <About />
      <Faq />
      <Contact />
      <Footer />
      {/* 
      <Gallery />
      <OurMission />
      <TeamMembers />
      */}
    </div>
  );
};

export default Page