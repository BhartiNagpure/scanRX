"use client"

import Navbar from "./layout/Navbar";
import Banner from "./components/Banner";
import About from "./components/About";
import Team from "./components/Team";
import Steps from "./components/Steps";
import Footer from "./layout/Footer";


export default function Home() {

  return (
    <div>
      <Navbar />
      <Banner />
      <About />
      <Steps />
      <Team />
      <Footer />

    </div>
  );
}
