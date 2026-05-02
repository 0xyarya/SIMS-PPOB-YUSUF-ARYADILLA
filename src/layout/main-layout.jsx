/* eslint-disable react/prop-types */
import { useLocation } from "react-router-dom";
import Topbar from "../components/Topbar";
import Headers from "../components/Header";
import logo from "../assets/img/Logo.png";

const Main_layout = ({ children }) => {
  const location = useLocation();
  return (
    <>
      {location.pathname == "/login" || location.pathname == "/register" ? (
        <>
          <main>{children}</main>
        </>
      ) : (
        <>
          <div className="w-full h-auto justify-center bg-white text-gray-800 px-10 mb-5">
            <Topbar />
            {location.pathname != "/akun" && <Headers />}
            <main className="bg-white">{children}</main>

            <footer className="mx-32 mt-10">
              <br />
              <hr />
              <div className="h-20 pt-5">
                <img
                  src={logo}
                  className="inline h-5 pb-0.5 mr-2 saturate-50"
                />
                SIMS PPOB &copy;{" "}
                <a
                  href="https://yusufarya.my.id"
                  target="blank"
                  className="text-blue-900"
                >
                  Yusuf Aryadilla
                </a>
              </div>
            </footer>
          </div>
        </>
      )}
    </>
  );
};

export default Main_layout;
