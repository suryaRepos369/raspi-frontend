import React from "react";
import bulb from "./Assets/icons8-light-100.png";
import io from "socket.io-client";
import { PropagateLoader } from "react-spinners";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";
import IconButton from "@mui/material/IconButton";
import CancelIcon from "@mui/icons-material/Cancel";
import Divider from "@mui/material/Divider";
import motor from "./Assets/motor.png";
var socket = io({
  reconnection: false,
});

//socket=io.connect('')
socket = io.connect("http://192.168.43.232:3030", {
  reconnection: true,
  reconnectionDelay: 2000,
  reconnectionAttempts: 5,
});

const Controlpage = () => {
  var [bulb1State, setBulb1state] = React.useState(false);
  var [bulb2State, setBulb2state] = React.useState(false);
  var [bulb3State, setBulb3state] = React.useState(false);
  var [bulb4State, setBulb4state] = React.useState(false);
  var [error, setError] = React.useState(true);
  var [light, setLight] = React.useState(false);
  var [bulb5State, setBulb5state] = React.useState(false);
  var [bulb6State, setBulb6state] = React.useState(false);
  var [bulb7State, setBulb7state] = React.useState(false);
  var [bulb8State, setBulb8state] = React.useState(false);
  var [net, setNet] = React.useState(false);

  //!bulb controller
  const bulbController = (data) => {
    console.log("data for bulb controller:", data);

    console.log("setting bulb state");
    if (data.pin === 1) {
      if (data.status === 1) {
        setBulb1state(true);
      } else {
        setBulb1state(false);
      }
    }
    if (data.pin === 2) {
      if (data.status === 1) {
        setBulb2state(true);
      } else {
        setBulb2state(false);
      }
    }
    if (data.pin === 3) {
      if (data.status === 1) {
        setBulb3state(true);
      } else {
        setBulb3state(false);
      }
    }
    if (data.pin === 4) {
      if (data.status === 1) {
        setBulb4state(true);
      } else {
        setBulb4state(false);
      }
    }
    if (data.pin === 5) {
      if (data.status === 1) {
        setBulb5state(true);
      } else {
        setBulb5state(false);
      }
    }
  };

  React.useEffect(() => {
    socket.on("connect", () => {
      setNet(true);
    });

    socket.on("disconnect", () => {
      setNet(false);
      console.log("Connection Failed");
    });

    socket.on("connect_failed", function () {
      console.log("Connection Failed");
    });

    socket.on("status", (data) => {
      console.log("initial data", data);
      bulbController(data);
    });

    socket.on("receivePinData", (data) => {
      console.log("Received data ", data);
      if (data.pin === 4 && data.status === 1) setBulb1state(true);
    });

    return () => {
      socket.off("connect");
      socket.off("disconnect");
      socket.off("receivePinData");
      socket.off("status");
      socket.off("connect_failed");
    };
  }, []);

  async function bulbOn(pin) {
    try {
      const pinData = {
        pin,
        status: 1,
        time: new Date(Date.now()).toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }),
      };
      // joinRoom();
      if (socket.connected) {
        await socket.emit("sendPinData", pinData);
        console.log("sent ", pinData);
        if (pin === 1) setBulb1state(true);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }
  }
  async function bulbOff(pin) {
    try {
      const pinData = {
        pin,
        status: 0,
        time: new Date(Date.now()).toLocaleString("en-GB", { timeZone: "Asia/Kolkata" }),
      };
      // joinRoom();
      if (socket.connected) {
        await socket.emit("sendPinData", pinData);
        console.log("sent ", pinData);
        if (pin === 1) setBulb1state(false);
      } else {
        setError(true);
      }
    } catch (e) {
      console.log(e);
    }
  }
  var error3 = false;
  var lightRef = React.useRef();

  return (
    <div className="bg-[#0d1327]">
      <Divider style={{ background: "black" }} />
      {!net ? (
        <div className=" text-white  top-4 mt-4 border-2 p-2 text-sm border-orange-600  rounded-2xl lead">
          Waiting for Server ...
          <PropagateLoader
            className="my-2 mb-2 py-2"
            color="#e34b12"
            size={9}
            speedMultiplier={1}
          />
        </div>
      ) : null}

      <div className={net ? "bg-inherit" : "bg-red-400 opacity-10"}>
        <div className="row justify-content-md-centers ">
          <div
            className="my-4 h-fit col-10 hover:opacity-100 opacity-100  ease-in duration-200   
                 flex container-fluid 
                 rounded-xl  ">
            <Box
              sx={{ flexGrow: 1 }}
              className="mb-5">
              <Grid
                container
                spacing={4}>
                {!light && (
                  <Grid
                    onClick={() => {
                      setLight((prev) => !prev);
                      // lightRef.current.focus();
                    }}
                    id="lightGrid"
                    className="m-auto mt-4 bg-inherit hover:cursor-pointer h-[220px] lg:h-[300px]"
                    xs={6}
                    md={5}
                    lg={3}>
                    <div className="bg-gradient-to-bl from-gray-200 to-orange-400 h-fit m-2 p-2 rounded-xl w-full mx-auto">
                      <img
                        className="h-[150px] lg:h-[230px] w-full rounded-xl"
                        src="https://media.istockphoto.com/vectors/light-bulb-with-rays-lighting-electric-lamp-creative-idea-solution-vector-id1149246206?k=20&m=1149246206&s=612x612&w=0&h=yz2GuTngOnZAHYq4wDsAwq0mp20OWlIUSSdmyIU3sRM="
                        alt=""
                      />
                      <p
                        className="text-orange-600 border-[1px]
                       border-black lead flex-grow rounded-lg 
                       m-1 p-1 py-2 bg-gray-100 text-xs font-semibold">
                        Lights
                      </p>
                    </div>
                  </Grid>
                )}
                {light && (
                  <div className="row flex  shadow-md w-full gap-3  justify-center bg-gradient-to-tr from-[#e69941] to-[#d5e796] rounded-xl mt-2 m-1 p-0 ">
                    <div
                      className="  flex  h-fit sticky top-2 hover:cursor-pointer hover:bg-red-300 rounded-xl"
                      onClick={() => {
                        setLight(false);
                      }}>
                      <IconButton
                        aria-label="delete"
                        size="large">
                        <CancelIcon
                          sx={{ color: "red" }}
                          fontSize="large"
                        />
                      </IconButton>
                      <p className="lead mt-3 text-black">Close</p>
                    </div>
                    <div className="text-sm m-0 p-0 text-yellow-900">***Dark color inside box indicates light is off </div>

                    {/* Farm 1 control */}
                    <div className="col-lg-4 ml-4m-lg-auto hover:scale-105 ease-in-out duration-200   col-5 shadow-lg bg-gradient-to-tl from-blue-100 p-4 px-2 to-[#fffcf5] flex-grow-0 rounded-3xl  h-fit  ">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span
                        className=" text-black font-semibold px-3 md:px-8 lead 
                       bg-gradient-to-tr from-[#F7F8F8] to-gray-300  rounded-lg  ">
                        Farm 1
                      </span>
                      <div
                        className="flex flex-col  justify-evenly flex-wrap-0 p-0 my-2 m-0"
                        ref={lightRef}>
                        {/*  BUlb 1 */}
                        <div
                          onClick={() => {
                            setBulb1state((prev) => !prev);
                            if (!bulb1State) bulbOn(1);
                            if (bulb1State) bulbOff(1);
                          }}
                          className={
                            bulb1State
                              ? "hover:cursor-pointer flex  m-0 p-0 border-2 border-black  flex-grow rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "hover:cursor-pointer flex  m-0 p-0 border-2 border-black flex-grow  rounded-sm bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto "
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb1State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 h-[20px] min-w-[20px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 h-[20px] min-w-[20px]"
                              }
                              onClick={() => {
                                setBulb1state((prev) => !prev);
                                if (!bulb1State) bulbOn(1);
                                if (bulb1State) bulbOff(1);
                              }}>
                              <p className="text-sm font-extrabold"> {bulb1State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                        {/* BUlb 2 */}
                        <div
                          className={
                            bulb2State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-sm bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb2state((prev) => !prev);
                              if (!bulb2State) bulbOn(2);
                              if (bulb2State) bulbOff(2);
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb2State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 h-[20px] min-w-[20px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 h-[20px] min-w-[20px]"
                              }
                              onClick={() => {
                                setBulb2state((prev) => !prev);
                                if (!bulb2State) bulbOn(2);
                                if (bulb2State) bulbOff(2);
                              }}>
                              <p className="text-sm font-extrabold"> {bulb2State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                        {/* BUlb 3 */}
                        <div
                          className={
                            bulb3State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-sm bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb3state((prev) => !prev);
                              if (!bulb3State) bulbOn(3);
                              if (bulb3State) bulbOff(3);
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error3}
                              className={
                                bulb3State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 h-[20px] min-w-[20px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 h-[20px] min-w-[20px]"
                              }
                              onClick={() => {
                                setBulb3state((prev) => !prev);
                                if (!bulb3State) bulbOn(3);
                                if (bulb3State) bulbOff(3);
                              }}>
                              <p className="text-sm font-extrabold"> {bulb2State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                      </div>{" "}
                    </div>

                    {/* Farm 2 control */}
                    <div className="col-lg-4 ml-4m-lg-auto hover:scale-105 ease-in-out duration-200   col-5 shadow-lg bg-gradient-to-tl from-blue-100 p-4 px-2 to-[#fbedf8] flex-grow-0 rounded-3xl  h-fit  ">
                      {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
                      <span
                        className=" text-black font-semibold px-3 md:px-8 lead 
                       bg-gradient-to-tr from-[#F7F8F8] to-gray-300  rounded-lg  ">
                        Farm 2
                      </span>
                      <div
                        className="flex flex-col  justify-evenly flex-wrap-0 p-0 my-2 m-0"
                        ref={lightRef}>
                        {/*  BUlb 5 */}
                        <div
                          className={
                            bulb5State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-sm bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb5state((prev) => !prev);
                              if (!bulb5State) bulbOn(5);
                              if (bulb5State) bulbOff(5);
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb5State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 h-[20px] min-w-[20px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 h-[20px] min-w-[20px]"
                              }
                              onClick={() => {
                                setBulb5state((prev) => !prev);
                                if (!bulb5State) bulbOn(5);
                                if (bulb5State) bulbOff(5);
                              }}>
                              <p className="text-sm font-extrabold"> {bulb5State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                        {/* BUlb 6 */}
                        <div
                          className={
                            bulb6State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-sm bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb6state((prev) => !prev);
                              if (!bulb6State) bulbOn(6);
                              if (bulb6State) bulbOff(6);
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb6State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 h-[20px] min-w-[20px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 h-[20px] min-w-[20px]"
                              }
                              onClick={() => {
                                setBulb6state((prev) => !prev);
                                if (!bulb6State) bulbOn(6);
                                if (bulb6State) bulbOff(6);
                              }}>
                              <p className="text-sm font-extrabold"> {bulb6State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                        {/* BUlb 7 */}
                        <div
                          className={
                            bulb7State
                              ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-sm bg-gradient-to-r from-yellow-400 to-yellow-600"
                              : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-sm bg-gradient-to-r from-gray-600 to-black"
                          }>
                          <img
                            src={bulb}
                            alt=""
                            className="h-[90px] my-auto mx-auto"
                            onClick={() => {
                              setBulb7state((prev) => !prev);
                              if (!bulb7State) bulbOn(7);
                              if (bulb7State) bulbOff(7);
                            }}
                          />
                          <div className="m-0 p-0 h-fit bg-white rounded-xl ">
                            <button
                              disabled={error}
                              className={
                                bulb7State
                                  ? "bg-red-500 text-sm m-1 rounded-xl px-2 h-[20px] min-w-[20px]"
                                  : "bg-green-500 text-sm m-1 rounded-3xl px-2 h-[20px] min-w-[20px]"
                              }
                              onClick={() => {
                                setBulb7state((prev) => !prev);
                                if (!bulb7State) bulbOn(7);
                                if (bulb7State) bulbOff(7);
                              }}>
                              <p className="text-sm font-extrabold"> {bulb7State ? "Off" : "On"}</p>
                            </button>
                          </div>
                        </div>{" "}
                      </div>{" "}
                    </div>

                    {
                      //!statistics
                    }
                    <div className="col-12">
                      {" "}
                      <h4>statics</h4>
                      <div>
                        <h6>Total bulbs</h6>
                      </div>
                    </div>
                  </div>
                )}
                {1 && (
                  <Grid
                    onClick={() => {
                      // setLight((prev) => !prev);
                      // lightRef.current.focus();
                    }}
                    id="lightGrid"
                    className="m-auto mt-4 bg-inherit hover:cursor-pointer h-[220px] lg:h-[300px]"
                    xs={6}
                    md={5}
                    lg={3}>
                    <div className="bg-gradient-to-bl from-gray-200 to-green-100 h-fit m-2 p-2 rounded-xl w-full mx-auto">
                      <img
                        className="h-[150px] lg:h-[230px] w-full rounded-xl"
                        src={motor}
                        alt=""
                      />
                      <p
                        className="text-yellow-900 border-[1px]
                       border-black lead flex-grow rounded-lg m-1 p-1 py-2 bg-gray-100 text-xs font-semibold">
                        Motor
                      </p>
                    </div>
                  </Grid>
                )}
                {1 && (
                  <Grid
                    onClick={() => {
                      // setLight((prev) => !prev);
                      // lightRef.current.focus();
                    }}
                    id="lightGrid"
                    className="m-auto mt-4 bg-inherit hover:cursor-pointer h-[220px] lg:h-[300px]"
                    xs={6}
                    md={5}
                    lg={3}>
                    <div className="bg-gradient-to-bl from-gray-200 to-blue-100 h-fit m-2 p-2 rounded-xl w-full mx-auto">
                      <img
                        className="h-[150px] lg:h-[230px] w-full rounded-xl"
                        src="https://i.pinimg.com/originals/e9/f4/12/e9f41265dd2625e77d3fa1938356c1fd.jpg"
                        alt=""
                      />
                      <p
                        className="text-blue-600 border-[1px]
                       border-black text-lg flex-grow rounded-lg m-1 p-1 py-1
                        bg-blue-100  font-semibold">
                        Water tank
                      </p>
                    </div>
                  </Grid>
                )}
                {1 && (
                  <Grid
                    onClick={() => {
                      /// setLight((prev) => !prev);
                      // lightRef.current.focus();
                    }}
                    id="lightGrid"
                    className="m-auto mt-4 bg-inherit hover:cursor-pointer h-[220px] lg:h-[300px]"
                    xs={6}
                    md={5}
                    lg={3}>
                    <div className="bg-gradient-to-bl from-gray-200 to-green-200 h-fit m-2 p-2 rounded-xl w-full mx-auto">
                      <img
                        className="h-[150px] lg:h-[230px] w-full rounded-xl"
                        src=""
                        alt="Image not found"
                      />
                      <p className="text-orange-600 border-[1px] border-black lead flex-grow rounded-lg m-1 p-1 py-2 bg-gray-100 text-xs font-semibold">
                        Power
                      </p>
                    </div>
                  </Grid>
                )}
              </Grid>
            </Box>
          </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Controlpage;
