import { NavLink, useNavigate, useLocation } from "react-router-dom";
import "./NewHeader.css";
import React, { useState, useEffect, useRef } from "react";
import KeyboardArrowDownIcon from "@mui/icons-material/KeyboardArrowDown";
import HomeIcon from "@mui/icons-material/Home";
const HeaderNew = () => {
  const navigate = useNavigate();
  const location = useLocation();

  function useComponentVisible(initialIsVisible) {
    const [isComponentVisible, setIsComponentVisible] = useState(initialIsVisible);
    const ref = useRef(null);

    const handleHideDropdown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setIsComponentVisible(false);
      }
    };

    const handleClickOutside = (event) => {
      if (ref.current && !ref.current.contains(event.target)) {
        setIsComponentVisible(false);
      }
    };

    useEffect(() => {
      document.addEventListener("keydown", handleHideDropdown, true);
      document.addEventListener("click", handleClickOutside, true);
      setIsComponentVisible(false);

      return () => {
        document.removeEventListener("keydown", handleHideDropdown, true);
        document.removeEventListener("click", handleClickOutside, true);
      };
    }, []);

    return { ref, isComponentVisible, setIsComponentVisible };
  }

  const { ref, isComponentVisible, setIsComponentVisible } = useComponentVisible(false);
  function pageTitle() {
    switch (location.pathname) {
      case "/":
        return "Home";

      case "/control":
        return "Farm";

      case "/fans":
        return "Fans";

      default:
        break;
    }
  }

  return (
    <>
      <div className="header-container">
        <div className="bg-inherit flex gap-4 m-4">
          <div className="m-1 hover:cursor-pointer">
            <HomeIcon
              onClick={() => {
                navigate("/");
              }}
              sx={{ color: "white" }}
            />
          </div>
          <div
            className="h-fit hover:cursor-pointer "
            ref={ref}>
            {isComponentVisible && (
              <div className="relative left-18 flex flex-grow justify-around justify-items-stretch m-2 bg-black px-20px rounded-md w-[260px] h-[150px] xs:w-[200px]  ">
                <ul className=" my-auto mr-4    h-fit flex-grow">
                  <li className="border-2 bg-gray-800 p-1 border-black flex-grow">
                    <NavLink
                      to="/"
                      className={({ isActive }) =>
                        isActive ? "text-blue-500    py-2  no-underline rounded-xl" : " hover:bg-blue-400 no-underline text-white flex-grow py-1 "
                      }
                      end>
                      Home
                    </NavLink>
                  </li>
                  <li className="border-2 bg-gray-800 p-1 border-black flex-grow">
                    <NavLink
                      to="/control"
                      className={({ isActive }) =>
                        isActive
                          ? "text-blue-500  no-underline  py-2   rounded-xl"
                          : "hover:bg-blue-400 no-underline rounded-xl px-4 text-white flex-grow py-1 "
                      }>
                      Poultry farm
                    </NavLink>
                  </li>
                  <li className="border-2 bg-gray-800 p-1 border-black flex-grow">
                    <NavLink
                      to="/Poultryfarm"
                      className={({ isActive }) =>
                        isActive
                          ? " text-blue-500 decoration:none font-semibold  py-2 no-underline   rounded-xl"
                          : "no-underline text-white flex-grow py-1 "
                      }>
                      Living Room
                    </NavLink>
                  </li>
                </ul>
              </div>
            )}
            {
              //!Default menu title
            }
            {!isComponentVisible && (
              <p
                className="text-2xl font-semibold text-white"
                onClick={() => setIsComponentVisible(true)}>
                {pageTitle()}
                <KeyboardArrowDownIcon />
              </p>
            )}
          </div>
        </div>
      </div>
    </>
  );
};

export default HeaderNew;
