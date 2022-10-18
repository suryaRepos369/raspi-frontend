import React from "react";
import WidgetsTwoToneIcon from "@mui/icons-material/WidgetsTwoTone";
import StarBorderPurple500TwoToneIcon from "@mui/icons-material/StarBorderPurple500TwoTone";
import ListTwoToneIcon from "@mui/icons-material/ListTwoTone";
const Footer = () => {
  return (
    <>
      <div className="bg-inherit  text-white flex lg:relative  lg:justify-center  flex-grow bg-gray-900 px-6 py-2 m-2 rounded-xl fixed bottom-0  gap-28 ml-8">
        <div>
          {" "}
          <ListTwoToneIcon />
          <p className="text-xs">Menu</p>
        </div>
        <div>
          {" "}
          <WidgetsTwoToneIcon />
          <p className="text-xs">Devices</p>
        </div>
        <div>
          {" "}
          <StarBorderPurple500TwoToneIcon />
          <p className="text-xs">Favourites</p>
        </div>
      </div>
    </>
  );
};

export default Footer;
