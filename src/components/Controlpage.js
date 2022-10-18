import React from "react";
import bulb from "./Assets/icons8-light-100.png";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import io from "socket.io-client";
import HeaderNew from "./headerNew";

import Box from "@mui/material/Box";
import Grid from "@mui/material/Unstable_Grid2";

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

      {/* Errror Div */}
      {error ? (
        <div className="border-4 border-red-500 bg-red-300 my-4">
          {}
          Error...! All the buttons are disabled until network connection is back
        </div>
      ) : null}
      {/* </div> */}

      <div className="container">
        <div className="row justify-content-md-center">
          <div className=" col-lg-6 col-xs-12 ">
            <div className=" m-6 min-h-[250px] border-[1px] border-blue-800 lg:m-auto lg:my-8 flex container-fluid bg-gradient-to-tr from-white to-blue-400 rounded-xl ">
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}>
                  <Grid
                    className="m-auto h-[200px]"
                    xs={12}
                    md={11}>
                    <div className="bg-gray-300 h-[180px] rounded-xl w-4/5 mx-auto">
                      <img
                        className="h-[180px] w-full rounded-xl"
                        src="https://www.tfcelectric.com/blog/wp-content/uploads/2017/01/light-bulb-comparison.jpg"
                        alt=""
                      />
                    </div>
                  </Grid>
                  <p className="text-white lead flex-grow rounded-lg m-2 p-1 bg-gray-800 font-semibold">Farm light Control</p>
                </Grid>
              </Box>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12">
            <div className="  m-6  min-h-[250px]  border-[1px] border-gray-900 lg:my-8 lg:m-auto flex container-fluid bg-gradient-to-tr from-blue-200 to-gray-400  rounded-xl my-4">
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}>
                  <Grid
                    className="m-auto mt-2  h-[200px]"
                    xs={12}
                    md={11}>
                    <div className="  bg-white h-[180px] rounded-xl w-4/5 mx-auto">
                      <img
                        className="h-[180px] w-full rounded-xl"
                        src="https://5.imimg.com/data5/CT/KM/MY-3160562/borewell-air-compressor-pump-500x500.jpg"
                        alt=""
                      />
                    </div>
                  </Grid>
                  <p className="text-white lead flex-grow rounded-lg  p-1 bg-gray-800 font-semibold">Motor Control</p>
                </Grid>
              </Box>
            </div>
          </div>
          <div className="col-lg-6 col-xs-12 ">
            <div className="  m-1 mb-12 lg:m-auto    lg:my-8 flex container-fluid bg-gradient-to-tr from-blue-300 to-gray-700 rounded-xl my-4">
              <Box sx={{ flexGrow: 1 }}>
                <Grid
                  container
                  spacing={2}>
                  <Grid
                    className="m-auto my-4 h-[250px]"
                    xs={12}
                    md={11}>
                    <div className="bg-gray-300 h-[180px] rounded-xl w-4/5 mx-auto">
                      <img
                        className="h-[180px] w-full rounded-xl"
                        src="https://image.shutterstock.com/image-vector/water-tank-vector-on-white-260nw-1696216576.jpg"
                        alt=""
                      />
                    </div>

                    <p className="text-white rounded-lg m-2 flex-grow lead  p-1 bg-gray-600 font-semibold">Water tank Level</p>
                  </Grid>
                </Grid>
              </Box>
            </div>
          </div>
          <div className="m-20">End</div>
        </div>
      </div>

      {/* <div className="row flex-col">
        <div className=" col-5 m-6    lg:m-auto lg:my-8 flex container-fluid bg-gradient-to-tr from-black to-blue-400 rounded-xl ">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}>
              <Grid
                className="m-auto my-4 h-[150px]"
                xs={12}
                md={11}>
                <div className="bg-gray-300 h-[100px] rounded-xl w-3/5 mx-auto">
                  <img
                    className="h-[100px] w-full rounded-xl"
                    src="https://www.tfcelectric.com/blog/wp-content/uploads/2017/01/light-bulb-comparison.jpg"
                    alt=""
                  />
                </div>

                <p className="text-white rounded-lg m-2 p-1 bg-gray-600 font-semibold">Farm light Control</p>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className=" col-5 m-6  lg:m-auto  lg:my-8 flex container-fluid bg-gradient-to-tr from-blue-300 to-gray-700 rounded-xl my-4">
          <Box sx={{ flexGrow: 1 }}>
            <Grid
              container
              spacing={2}>
              <Grid
                className="m-auto my-4 h-[150px]"
                xs={12}
                md={11}>
                <div className="bg-gray-300 h-[100px] rounded-xl w-3/5 mx-auto">
                  <img
                    className="h-[105px] w-full rounded-xl"
                    src="https://image.shutterstock.com/image-vector/water-tank-vector-on-white-260nw-1696216576.jpg"
                    alt=""
                  />
                </div>

                <p className="text-white rounded-lg m-2 p-1 bg-gray-600 font-semibold">Water tank Level</p>
              </Grid>
            </Grid>
          </Box>
        </div>
        <div className="  m-6   lg:my-8 lg:m-auto flex container-fluid bg-gradient-to-tr from-black to-gray-400  rounded-xl my-4">
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
                    className="h-[105px] w-full rounded-xl"
                    src="https://5.imimg.com/data5/CT/KM/MY-3160562/borewell-air-compressor-pump-500x500.jpg"
                    alt=""
                  />
                </div>

                <p className="text-white rounded-lg m-2 p-1 bg-gray-600 font-semibold">Motor Control</p>
              </Grid>
            </Grid>
          </Box>
        </div>
      </div> */}
    </div>
  );
};

export default Controlpage;
// {
//   <div className="row d-flex">
//   <div className="shadow-md  d-flex flex-grow col-lg-5 col-12 ">
//     <div className="card h-fit flex-grow bg-inherit border-blue-700 m-2 p-1">
//       <div className="card-body p-0  h-fit">
//         <p className="card-title font-monospace text-xl  my-4 p-2 bg-gray-900 text-yellow-400 font-semibold rounded-xl">
//           Poultry farm Light control board
//         </p>

//         <img
//           src="https://5.imimg.com/data5/SELLER/Default/2021/3/PL/WY/NT/122114398/automatic-poultry-farm-500x500.png"
//           alt=""
//           className="h-[100px] w-5/6 m-auto rounded-xl "
//         />

//         <div className="card-text min-h-[500px]m-2 rounded-lg my-1 bg-inherit">
//           <div className="flex gap-8 mt-8 flex-wrap justify-center flex-grow">
//             {/* Farm 1 control */}
//             <div className="bg-black flex-grow-1 rounded-3xl  h-fit w-44 ">
//               {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
//               <span className=" text-white font-semibold border-[1px] px-8 border-white rounded-lg bg-orange-500  ">Farm 1</span>
//               <div className="flex flex-col  justify-evenly flex-wrap-0 p-0 my-2">
//                 {/*  BUlb 1 */}
//                 <div
//                   className={
//                     bulb1State
//                       ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
//                       : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
//                   }>
//                   <img
//                     src={bulb}
//                     alt=""
//                     className="h-[90px] my-auto mx-auto"
//                     onClick={() => {
//                       // setBulb1state((prev) => !prev);
//                       if (!bulb1State) bulbOn(1);
//                       if (bulb1State) bulbOff(1);
//                     }}
//                   />
//                   <div className="m-0 p-0 h-fit bg-white rounded-xl ">
//                     <button
//                       disabled={error}
//                       className={
//                         bulb1State
//                           ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                           : "bg-green-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                       }
//                       onClick={() => {
//                         // setBulb1state((prev) => !prev);
//                         if (!bulb1State) bulbOn(1);
//                         if (bulb1State) bulbOff(1);
//                       }}>
//                       <p className="text-sm font-extrabold"> {bulb1State ? "Off" : "On"}</p>
//                     </button>
//                   </div>
//                 </div>
//                 {/* BUlb 2 */}
//                 <div
//                   className={
//                     bulb2State
//                       ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
//                       : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
//                   }>
//                   <img
//                     src={bulb}
//                     alt=""
//                     className="h-[90px] my-auto mx-auto"
//                     onClick={() => {
//                       setBulb2state((prev) => !prev);
//                       if (!bulb2State) bulbOn(2);
//                       if (bulb2State) bulbOff(2);
//                     }}
//                   />
//                   <div className="m-0 p-0 h-fit bg-white rounded-xl ">
//                     <button
//                       disabled={error}
//                       className={
//                         bulb2State
//                           ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                           : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
//                       }
//                       onClick={() => {
//                         setBulb2state((prev) => !prev);
//                         if (!bulb2State) bulbOn(2);
//                         if (bulb2State) bulbOff(2);
//                       }}>
//                       <p className="text-sm font-extrabold"> {bulb2State ? "Off" : "On"}</p>
//                     </button>
//                   </div>
//                 </div>{" "}
//                 {/* BUlb 3 */}
//                 <div
//                   className={
//                     bulb3State
//                       ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
//                       : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
//                   }>
//                   <img
//                     src={bulb}
//                     alt=""
//                     className="h-[90px] my-auto mx-auto"
//                     onClick={() => {
//                       setBulb3state((prev) => !prev);
//                       if (!bulb3State) bulbOn(3);
//                       if (bulb3State) bulbOff(3);
//                     }}
//                   />
//                   <div className="m-0 p-0 h-fit bg-white rounded-xl ">
//                     <button
//                       disabled={error}
//                       className={
//                         bulb3State
//                           ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                           : "bg-green-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                       }
//                       onClick={() => {
//                         setBulb3state((prev) => !prev);
//                         if (!bulb3State) bulbOn(3);
//                         if (bulb3State) bulbOff(3);
//                       }}>
//                       <p className="text-sm font-extrabold"> {bulb3State ? "Off" : "On"}</p>
//                     </button>
//                   </div>
//                 </div>
//               </div>{" "}
//             </div>

//             {/* Farm 2 control */}

//             <div className="bg-black flex-grow-1  rounded-3xl    min-h-[72px] h-fit w-44 ">
//               {/* <p className="bg-gradient-to-r from-gray-400 to-black lead text-white">Farm 1</p> */}
//               <span className=" text-white font-semibold border-[1px] px-8 border-white rounded-lg bg-orange-600  ">Farm 2</span>

//               <div className="my-2">
//                 {/* BUlb 4 */}
//                 <div
//                   className={
//                     bulb4State
//                       ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
//                       : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
//                   }>
//                   <img
//                     src={bulb}
//                     alt=""
//                     className="h-[90px] my-auto mx-auto"
//                     onClick={() => {
//                       setBulb4state((prev) => !prev);
//                       if (!bulb4State) bulbOn(4);
//                       if (bulb4State) bulbOff(4);
//                     }}
//                   />
//                   <div className="m-0 p-0 h-fit bg-white rounded-xl ">
//                     <button
//                       disabled={error}
//                       className={
//                         bulb4State
//                           ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                           : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
//                       }
//                       onClick={() => {
//                         setBulb4state((prev) => !prev);
//                         if (!bulb4State) bulbOn(4);
//                         if (bulb4State) bulbOff(4);
//                       }}>
//                       <p className="text-sm font-extrabold"> {bulb4State ? "Off" : "On"}</p>
//                     </button>
//                   </div>
//                 </div>{" "}
//                 {/* BUlb 4 */}
//                 <div
//                   className={
//                     bulb4State
//                       ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
//                       : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
//                   }>
//                   <img
//                     src={bulb}
//                     alt=""
//                     className="h-[90px] my-auto mx-auto"
//                     onClick={() => {
//                       setBulb4state((prev) => !prev);
//                       if (!bulb4State) bulbOn();
//                       if (bulb4State) bulbOff();
//                     }}
//                   />
//                   <div className="m-0 p-0 h-fit bg-white rounded-xl ">
//                     <button
//                       disabled={error}
//                       className={
//                         bulb4State
//                           ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                           : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
//                       }
//                       onClick={() => {
//                         setBulb4state((prev) => !prev);
//                         if (!bulb4State) bulbOn();
//                         if (bulb4State) bulbOff();
//                       }}>
//                       <p className="text-sm font-extrabold"> {bulb4State ? "Off" : "On"}</p>
//                     </button>
//                   </div>
//                 </div>{" "}
//                 {/* BUlb 4 */}
//                 <div
//                   className={
//                     bulb4State
//                       ? "flex  m-0 p-0 border-2 border-black  flex-grow rounded-3xl bg-gradient-to-r from-yellow-400 to-yellow-600"
//                       : "flex  m-0 p-0 border-2 border-black flex-grow  rounded-3xl bg-gradient-to-r from-gray-600 to-black"
//                   }>
//                   <img
//                     src={bulb}
//                     alt=""
//                     className="h-[90px] my-auto mx-auto"
//                     onClick={() => {
//                       setBulb4state((prev) => !prev);
//                       if (!bulb4State) bulbOn();
//                       if (bulb4State) bulbOff();
//                     }}
//                   />
//                   <div className="m-0 p-0 h-fit bg-white rounded-xl ">
//                     <button
//                       disabled={error}
//                       className={
//                         bulb4State
//                           ? "bg-red-500 text-sm m-1 rounded-xl px-2 min-h-[30px] min-w-[40px]"
//                           : "bg-green-500 text-sm m-1 rounded-3xl px-2 min-h-[30px] min-w-[40px]"
//                       }
//                       onClick={() => {
//                         setBulb4state((prev) => !prev);
//                         if (!bulb4State) bulbOn();
//                         if (bulb4State) bulbOff();
//                       }}>
//                       <p className="text-sm font-extrabold"> {bulb4State ? "Off" : "On"}</p>
//                     </button>
//                   </div>
//                 </div>{" "}
//               </div>
//             </div>
//           </div>
//         </div>
//       </div>
//     </div>
//   </div>
// </div>
// }
