import React from "react";
import Header from "./Header";
import bulb from "./Assets/icons8-light-100.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";

import "react-toastify/dist/ReactToastify.css";

const Controlpage = () => {
  var [bulb1State, setBulb1state] = React.useState(false);
  var [bulb2State, setBulb2state] = React.useState(false);

  function status() {
    try {
      let a = axios.get("http://192.168.43.232:3030/lightStatus").then((res) => {
        ////  console.log(res.data);
        let ans = res.data.filter((i) => {
          if (i.pin === 4) return i;
        });

        console.log("ans:", ans[0]);
        if (ans[0].state) setBulb1state(true);
        else setBulb1state(false);
      });
      toast.promise(a, {
        pending: "Getting current status",
        success: "updated👌",
        error: "Oopss ,...Network Error 🤯",
      });
    } catch (error) {
      console.log(error);
    }
  }
  let update = () => {
    try {
      axios.get("http://192.168.43.232:3030/lightStatus").then((res) => {
        ////  console.log(res.data);
        let ans = res.data.filter((i) => {
          if (i.pin === 4) return i;
        });

        //console.log("ans:", ans[0]);
        if (ans[0].state) setBulb1state(true);
        else setBulb1state(false);
      });
    } catch (error) {
      console.log(error);
    }
  };

  React.useEffect(() => {
    status();
  }, []);

  setInterval(() => {
    update();
  }, 2000);

  function bulbOn() {
    console.log("turndd on");
    try {
      let a = axios.get("http://192.168.43.232:3030/check", { params: { state: 1 } }).then((res) => {});
      toast.promise(a, {
        pending: "Getting current status",
        success: "Turned On",
        error: "Oopss ,...Network Error 🤯",
      });
    } catch (error) {
      console.log(error);
    }
  }
  function bulbOff() {
    console.log("turndd off");
    try {
      let a = axios.get("http://192.168.43.232:3030/check", { params: { state: 0 } }).then((res) => {});
      toast.promise(a, {
        pending: "Getting current status",
        success: "Turned Off",
        error: "Oopss ,...Network Error 🤯",
      });
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div>
      <ToastContainer autoClose={500} />
      <Header></Header>
      {/* <div className="bg-gradient-to-l from-yellow-300 to-yellow-400"> */}
      <div className="flex flex-col m-2 ml-0 justify-start">
        <div>
          {" "}
          <span className=" font-semi-bold text-xl p-0 ">Hello,</span>
        </div>
        <span className="font-bold p-0">Surya</span>
      </div>
      {/* </div> */}
      <div className=" container-fluid">
        <div className="row d-flex">
          <div className="shadow-md  d-flex flex-grow col-lg-5 col-12 ">
            <div className="card h-fit flex-grow bg-white border-2 border-blue-700 m-2 p-1">
              <div className="card-body p-0  h-fit">
                <p className="card-title font-monospace text-xl  my-4 p-2 bg-gray-900 text-yellow-400 font-semibold rounded-xl">
                  Poultry farm Light control board
                </h5>

                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2021/3/PL/WY/NT/122114398/automatic-poultry-farm-500x500.png"
                  alt=""
                  className="h-[100px] w-full "
                />
                <div className="card-text min-h-[400px]m-2 bg-white">
                  <h3 className="mt-1 lead py-1">Both farm lights are displayed</h3>
                  <div className="flex gap-8 mt-8 flex-wrap justify-center flex-grow">
                    {/* Farm 1 control */}
                    <div className="bg-black flex-grow-1 my-4 rounded-3xl  h-72 w-44 ">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span className=" text-white font-semibold">Farm 1</span>
                      <div className="flex flex-col h-[260px] justify-evenly flex-wrap-0 p-0 m-0">
                        <div
                          className={
                            bulb1State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow bg-gradient-to-r from-yellow-400 to-yellow-900"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  bg-gradient-to-r from-gray-700 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                          />
                          <button
                            onClick={() => {
                              setBulb1state((prev) => !prev);
                              if (!bulb1State) bulbOn();
                              if (bulb1State) bulbOff();
                            }}
                            className="bg-white text-sm m-4 rounded-sm px-2 h-fit">
                            <p className="text-sm font-extrabold"> {bulb1State ? "Off" : "On"}</p>
                          </button>
                        </div>
                      </div>{" "}
                    </div>

                    {/* Farm 2 control */}

                    <div className="bg-indigo-600 flex-grow-0 border-2 border-black  h-72 w-44">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span className=" text-white font-semibold">Farm 2</span>
                      <div className="flex flex-col h-[260px] justify-evenly flex-wrap-0 p-0 m-0">
                        <div
                          className={
                            bulb2State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  bg-gradient-to-r from-gray-700 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[100px] my-auto mx-auto"
                          />
                          <button
                            onClick={() => {
                              setBulb2state((prev) => !prev);
                            }}
                            className="bg-white text-sm m-4 rounded-sm px-2 h-fit">
                            <p className="text-sm font-extrabold"> {bulb2State ? "Off" : "On"}</p>
                          </button>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
              </div>
            </div>
          </div>
          <div className="shadow-md col-lg-4 col-12 ">
            <div className="card h-[300px]">
              <div className="card-body border-1 border-black p-0">
                <h5 className="card-title bg-orange-300 flex-grow m-0 p-0 rounded-sm border-1 py-2 border-black ">fan</h5>
                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="shadow-md h-[200px] w-full bg-blue-200 p-2 m-2">shadow</div>
    </div>
  );
};

export default Controlpage;
