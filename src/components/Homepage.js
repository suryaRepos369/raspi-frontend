import React from "react";
import bgi from "../components/Assets/sHbg.jpg";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
import HeaderNew from "./headerNew";

const Home = () => {
  let navigate = useNavigate();
  function viewHandler() {
    navigate("/control");
  }
  return <div></div>;
};

export default Home;
