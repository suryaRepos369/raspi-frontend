import React from "react";
import Header from "./Header";
import bulb from "./Assets/icons8-light-100.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import ReactDOM from "react-dom";

import "react-toastify/dist/ReactToastify.css";

const Controlpage = () => {
  var [bulb1State, setBulb1state] = React.useState(false);
  var [bulb2State, setBulb2state] = React.useState(false);
  var [bulb3State, setBulb3state] = React.useState(false);
  var [bulb4State, setBulb4state] = React.useState(false);
  // var [bulb5State, setBulb5state] = React.useState(false);
  var [error, setError] = React.useState(false);

  async function status() {
    try {
      let a = await axios.get("http://192.168.43.232:3030/lightStatus").then((res) => {
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
      setError(true);
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
    //status();
  }, []);
  if (!error) {
    setInterval(() => {
      //  update();
    }, 2000);
  }

  function bulbOn() {
    console.log("turndd on");
    // try {
    //   let a = axios.get("http://192.168.43.232:3030/check", { params: { state: 1 } }).then((res) => {});
    //   toast.promise(a, {
    //     pending: "Getting current status",
    //     success: "Turned On",
    //     error: "Oopss ,...Network Error 🤯",
    //   });
    // } catch (error) {
    //   console.log(error);
    // }
  }
  function bulbOff() {
    console.log("turndd off");
    // try {
    //   let a = axios.get("http://192.168.43.232:3030/check", { params: { state: 0 } }).then((res) => {});
    //   toast.promise(a, {
    //     pending: "Getting current status",
    //     success: "Turned Off",
    //     error: "Oopss ,...Network Error 🤯",
    //   });
    // } catch (error) {
    //   setError(true);
    //   console.log("error occured");
    // }
  }

  const farmRef = React.useRef(null);
  function focusDiv() {
    farmRef.current.focus();
    console.log("first");
  }

  return (
    <div>
      <ToastContainer autoClose={500} />
      <Header className="sticky top-0"></Header>

      {/* <div className="bg-gradient-to-l from-yellow-300 to-yellow-400"> */}

      {/* Errror Div */}
      {error ? (
        <div className="border-4 border-red-500">
          {alert("Network error")}
          Error...! All the buttons are disabled until network connection is back
        </div>
      ) : null}
      {/* </div> */}
      <div className=" container-fluid">
        <div className="row d-flex">
          <div className="shadow-md  d-flex flex-grow col-lg-5 col-12 ">
            <div className="card h-fit flex-grow bg-white border-2 border-blue-700 m-2 p-1">
              <div className="card-body p-0  h-fit">
                <p className="card-title font-monospace text-xl  my-4 p-2 bg-gray-900 text-yellow-400 font-semibold rounded-xl">
                  Poultry farm Light control board
                </p>

                <img
                  src="https://5.imimg.com/data5/SELLER/Default/2021/3/PL/WY/NT/122114398/automatic-poultry-farm-500x500.png"
                  alt=""
                  className="h-[100px] w-5/6 m-auto rounded-xl "
                />

                <div className="card-text min-h-[500px]m-2 rounded-lg my-1 bg-white">
                  <div className="flex gap-8 mt-8 flex-wrap justify-center flex-grow">
                    {/* Farm 1 control */}
                    <div className="bg-black flex-grow-1 rounded-3xl  h-fit w-44 ">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span className=" text-white font-semibold border-[1px] px-8 border-white rounded-lg bg-orange-500  ">Farm 1</span>
                      <div className="flex flex-col  justify-evenly flex-wrap-0 p-0 my-2">
                        {/*  BUlb 1 */}
                        <div
                          className={
                            bulb1State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb1state((prev) => !prev);
                              if (!bulb1State) bulbOn();
                              if (bulb1State) bulbOff();
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb1State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                                  : "bg-green-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                              }
                              onClick={() => {
                                setBulb1state((prev) => !prev);
                                if (!bulb1State) bulbOn();
                                if (bulb1State) bulbOff();
                              }}>
                              <p className="text-sm font-extrabold"> {bulb1State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>
                        {/* BUlb 2 */}
                        <div
                          className={
                            bulb2State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb2state((prev) => !prev);
                              if (!bulb2State) bulbOn();
                              if (bulb2State) bulbOff();
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb2State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
                              }
                              onClick={() => {
                                setBulb2state((prev) => !prev);
                                if (!bulb2State) bulbOn();
                                if (bulb2State) bulbOff();
                              }}>
                              <p className="text-sm font-extrabold"> {bulb2State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                        {/* BUlb 3 */}
                        <div
                          className={
                            bulb3State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb3state((prev) => !prev);
                              if (!bulb3State) bulbOn();
                              if (bulb3State) bulbOff();
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb3State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                                  : "bg-green-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                              }
                              onClick={() => {
                                setBulb3state((prev) => !prev);
                                if (!bulb3State) bulbOn();
                                if (bulb3State) bulbOff();
                              }}>
                              <p className="text-sm font-extrabold"> {bulb3State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>
                      </div>{" "}
                    </div>

                    {/* Farm 2 control */}

                    <div className="bg-black flex-grow-1  rounded-3xl    min-h-[72px] h-fit w-44 ">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span className=" text-white font-semibold border-[1px] px-8 border-white rounded-lg bg-orange-600  ">Farm 2</span>

                      <div className="my-2">
                        {/* BUlb 4 */}
                        <div
                          className={
                            bulb4State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb4state((prev) => !prev);
                              if (!bulb4State) bulbOn();
                              if (bulb4State) bulbOff();
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb4State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
                              }
                              onClick={() => {
                                setBulb4state((prev) => !prev);
                                if (!bulb4State) bulbOn();
                                if (bulb4State) bulbOff();
                              }}>
                              <p className="text-sm font-extrabold"> {bulb4State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                        {/* BUlb 4 */}
                        <div
                          className={
                            bulb4State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb4state((prev) => !prev);
                              if (!bulb4State) bulbOn();
                              if (bulb4State) bulbOff();
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb4State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
                              }
                              onClick={() => {
                                setBulb4state((prev) => !prev);
                                if (!bulb4State) bulbOn();
                                if (bulb4State) bulbOff();
                              }}>
                              <p className="text-sm font-extrabold"> {bulb4State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                        {/* BUlb 4 */}
                        <div
                          className={
                            bulb4State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb4state((prev) => !prev);
                              if (!bulb4State) bulbOn();
                              if (bulb4State) bulbOff();
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb4State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
                              }
                              onClick={() => {
                                setBulb4state((prev) => !prev);
                                if (!bulb4State) bulbOn();
                                if (bulb4State) bulbOff();
                              }}>
                              <p className="text-sm font-extrabold"> {bulb4State ? "Off" : "On"}</p>
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
    </div>
  );
};

export default Controlpage;

// <div className="bg-black flex-grow-0 rounded-md  h-72 w-44">
// {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
// <span className=" text-white font-semibold border-[1px] px-8 border-white">Farm 2</span>
// <div className="flex flex-col h-[260px] justify-evenly flex-wrap-0 p-0 m-0">
//   <div
//     className={
//       bulb2State
//         ? "flex  m-0 p-0 border-2 border-black  flex-grow bg-gradient-to-r from-yellow-400 to-yellow-600"
//         : "flex  m-0 p-0 border-2 border-black flex-grow  bg-gradient-to-r from-gray-700 to-black"
//     }>
//     <img
//       src={bulb}
//       alt=""
//       className="h-[100px] my-auto mx-auto"
//     />
//     <button
//       onClick={() => {
//         setBulb2state((prev) => !prev);
//       }}
//       className="bg-white text-sm m-4 rounded-sm px-2 h-fit">
//       <p className="text-sm font-extrabold"> {bulb2State ? "Off" : "On"}</p>
//     </button>
//   </div>
// </div>{" "}
// </div>
