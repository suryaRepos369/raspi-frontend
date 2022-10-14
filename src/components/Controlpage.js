import React from "react";
import Header from "./Header";
import bulb from "./Assets/icons8-light-100.png";
const Controlpage = () => {
  var [bulb1State, setBulb1state] = React.useState(false);
  var [bulb2State, setBulb2state] = React.useState(false);
  return (
    <div>
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
            <div className="card  flex-grow bg-gray-300">
              <div className="card-body border-2  border-black p-0">
                <h5 className="card-title bg-gray-900 flex-grow m-0 p-0 rounded-sm border-1 py-4 lead border-black text-white ">
                  Poultry farm Light control board
                </h5>

                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2021/3/PL/WY/NT/122114398/automatic-poultry-farm-500x500.png"
                  alt=""
                  className="h-[100px] w-full "
                />
                <div class="card-text min-h-[350px]m-2 bg-white">
                  <h3 className="mt-1 lead py-1">Lights</h3>
                  <div className="flex gap-8 mt-8 flex-wrap">
                    {/* Farm 1 control */}

                    <div className="bg-indigo-600 flex-grow-0 border-2 border-black  h-72 w-40">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span className=" text-white font-semibold">Farm 1</span>
                      <div className="flex flex-col h-[240px] justify-evenly flex-wrap-0 p-0 m-0">
                        <div
                          className={
                            bulb1State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  bg-gradient-to-r from-gray-700 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[60px]"
                          />
                          <button
                            onClick={() => {
                              setBulb1state((prev) => !prev);
                            }}
                            className="bg-white text-sm m-4 rounded-sm px-4 p-0">
                            {bulb1State ? "on" : "off"}
                          </button>
                        </div>
                        <div
                          className={
                            bulb1State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  bg-gradient-to-r from-gray-700 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[60px]"
                          />
                          <button
                            onClick={() => {
                              setBulb1state((prev) => !prev);
                            }}
                            className="bg-white text-sm m-4 rounded-sm px-4 p-0">
                            {bulb1State ? "on" : "off"}
                          </button>
                        </div>
                      </div>{" "}
                    </div>

                    {/* Farm 2 control */}
                    <div className="bg-indigo-600 flex-grow-0 border-2 border-black  h-72 w-40">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span className=" text-white font-semibold">Farm 1</span>
                      <div className="flex flex-col h-[240px] justify-evenly flex-wrap-0 p-0 m-0">
                        <div
                          className={
                            bulb2State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  bg-gradient-to-r from-gray-700 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[60px]"
                          />
                          <button
                            onClick={() => {
                              setBulb2state((prev) => !prev);
                            }}
                            className="bg-white text-sm m-4 rounded-sm px-4 p-0">
                            {bulb2State ? "on" : "off"}
                          </button>
                        </div>
                        <div
                          className={
                            bulb2State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  bg-gradient-to-r from-gray-700 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[60px]"
                          />
                          <button
                            onClick={() => {
                              setBulb2state((prev) => !prev);
                            }}
                            className="bg-white text-sm m-4 rounded-sm px-4 p-0">
                            {bulb2State ? "on" : "off"}
                          </button>
                        </div>
                      </div>{" "}
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          <div className="shadow-md col-lg-4 col-12">
            <div className="card h-[300px]">
              <div className="card-body border-1 border-black p-0">
                <h5 className="card-title bg-pink-500 flex-grow m-0 p-0 rounded-sm border-1 py-2 border-black ">socket</h5>
                {/* <p class="card-text">Some quick example text to build on the card title and make up the bulk of the card's content.</p> */}
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
