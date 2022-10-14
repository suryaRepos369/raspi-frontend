import React from "react";
import bgi from "../components/Assets/sHbg.jpg";
import Header from "./Header";
import { useNavigate } from "react-router-dom";
const Home = () => {
  let navigate = useNavigate();
  function viewHandler() {
    navigate("/control");
  }
  return (
    <div>
      <Header></Header>
      {/* main body */}

      <div className="row flex-row gap-2 justify-items-center relative">
        <div className="col-8">
          <div
            className="flex"
            style={{ backgroundImage: { bgi } }}>
            <img
              src={bgi}
              alt=""
              className="max-h-[300px] min-w-full"
            />
          </div>
        </div>
        <div className="col-12 ">
          <span>
            <button
              onClick={viewHandler}
              className="rounded-xl bg-pink-500 px-8 p-2 m-auto mt-4 ">
              View
            </button>
          </span>
        </div>
      </div>
    </div>
  );
};

export default Home;
