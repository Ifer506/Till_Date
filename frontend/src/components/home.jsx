import React from "react";
import Navbar from "../layouts/navbar"
import Sidebar from "../layouts/sidebar";

const Home = () => {
  return (
    <section>
      <Navbar/>
      <Sidebar/>
      <h1>Hello You Have landed to home page</h1>
    </section>
  );
};

export default Home;
