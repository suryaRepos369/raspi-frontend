import React from "react";
import Header from "./Header";
import bulb from "./Assets/icons8-light-100.png";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import HeaderNew from "./headerNew";
const socket = io.connect("http://192.168.43.16:3030");
console.log(socket);

const Controlpage = () => {
  var [bulb1State, setBulb1state] = React.useState(false);
  var [bulb2State, setBulb2state] = React.useState(false);
  var [bulb3State, setBulb3state] = React.useState(false);
  var [bulb4State, setBulb4state] = React.useState(false);
  // var [bulb5State, setBulb5state] = React.useState(false);
  var [error, setError] = React.useState(false);

  //!bulb controller
  const bulbController = (data) => {
    console.log("data for bulb controller:", data);

    console.log("setting bulb state");
    if (data.pin === 4) {
      if (data.status === 1) {
        setBulb1state(true);
      } else {
        setBulb1state(false);
      }
    }
  };

  React.useEffect(() => {
    socket.on("status", (data) => {
      console.log("initial data", data);
      bulbController(data);
    });
    socket.on("receivePinData", (data) => {
      console.log("Received data ", data);
      if (data.pin === 4 && data.status === 1) setBulb1state(true);
    });
  }, [socket]);

  async function joinRoom() {
    socket.emit("join_room", 4);
  }

  async function bulbOn(pin) {
    try {
      const pinData = {
        pin: 4,
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
        pin: 4,
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

  return (
    <div>
      <ToastContainer autoClose={500} />
      {/* <Header className="sticky top-0"></Header> */}
      <HeaderNew></HeaderNew>

      {/* <div className="bg-gradient-to-l from-yellow-300 to-yellow-400"> */}

      {/* Errror Div */}
      {error ? (
        <div className="border-4 border-red-500 bg-red-300 my-4">
          {}
          Error...! All the buttons are disabled until network connection is back
        </div>
      ) : null}
      {/* </div> */}
      <div className=" row m-6  lg:w-3/4 lg:m-auto lg:my-8 flex container-fluid bg-gradient-to-tr from-black to-blue-400 rounded-xl ">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}>
            <Grid
              xs={12}
              md={8}
              lg={4}>
              <Item>xs=4</Item>
            </Grid>
            <Grid xs={4}>
              <Item>xs=4</Item>
            </Grid>
              </Box>
            </div>
          </div>
          <div class="col col-lg-6">
            <div className="  m-6  min-h-[250px] lg:my-8 lg:m-auto flex container-fluid bg-gradient-to-tr from-black to-gray-400  rounded-xl my-4">
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}>
                  <Grid
                    className="m-auto my-4 h-[150px]"
                    xs={12}
                    md={11}>
                    <div className="  bg-white h-[100px] rounded-xl w-3/5 mx-auto">
                      <img
                        className="h-[150px] w-full rounded-xl"
                        src="https://5.imimg.com/data5/CT/KM/MY-3160562/borewell-air-compressor-pump-500x500.jpg"
                        alt=""
                      />
                    </div>
                  </Grid>
            <Grid xs={8}>
              <Item>xs=8</Item>
            </Grid>
          </Grid>
        </Box>
      </div>
      <div className=" row  lg:w-3/4 my-8 m-auto flex container-fluid bg-gradient-to-tr from-indigo-400 to-yellow-100 m-2 rounded-xl my-4">
        <Box sx={{ flexGrow: 1 }}>
          <Grid
            container
            spacing={2}>
            <Grid
              className="m-auto my-4 h-[150px]"
              xs={12}
              md={11}>
              <div className="bg-gray-300 h-[100px] rounded-xl w-3/5 mx-auto"></div>

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
                              if (!bulb4State) bulbOn(4);
                              if (bulb4State) bulbOff(4);
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
                                if (!bulb4State) bulbOn(4);
                                if (bulb4State) bulbOff(4);
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
        <div className=" row m-6   lg:w-3/4 lg:my-8 lg:m-auto flex container-fluid bg-gradient-to-tr from-black to-gray-400  rounded-xl my-4">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}>
              <Grid
                className="m-auto my-4 h-[150px]"
                xs={12}
                md={11}>
                <div className="  bg-white h-[100px] rounded-xl w-3/5 mx-auto">
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
