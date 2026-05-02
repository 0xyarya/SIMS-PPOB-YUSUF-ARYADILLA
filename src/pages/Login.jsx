import { useEffect, useState } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import {
  AiOutlineLock,
  AiOutlineEye,
  AiOutlineEyeInvisible,
  AiOutlineMail,
} from "react-icons/ai";
import gb_page from "../assets/img/Illustrasi_Login.png";
import logo from "../assets/img/Logo.png";
import "../App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useDispatch, useSelector } from "react-redux";

import { loginSlice } from "../redux/slices/auth";
import { clearMessage } from "../redux/slices/message";

const Login = () => {
  const navigate = useNavigate();

  const { isLoggedIn } = useSelector((state) => state.auth);

  const dispatch = useDispatch();

  useEffect(() => {
    if (isLoggedIn) {
      navigate("/home");
    }
    dispatch(clearMessage());
  }, [dispatch, isLoggedIn, navigate]);

  const sectionStyle = {
    backgroundImage: `url(${gb_page})`,
  };

  const [isOpenEye, setIsOpenEye] = useState(false);

  function openEye(toogleEye) {
    setIsOpenEye(!toogleEye);
  }

  const [data, setData] = useState({ email: "", password: "" });

  function handleInput(e) {
    setData({ ...data, [e.target.name]: e.target.value });
  }

  const handleSubmit = (e) => {
    e.preventDefault();

    dispatch(loginSlice(data))
      .unwrap()
      .then(() => {
        toast.success("Login berhasil", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        setTimeout(() => {
          navigate("/home");
        }, 1500);
      })
      .catch((error) => {
        toast.error("Username atau password salah", {
          position: "top-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "colored",
        });
        console.log(error);
      });
  };

  return (
    <>
      <ToastContainer
        position="top-right"
        autoClose={5000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="colored"
      />
      <div className="w-full h-screen justify-center bg-white text-gray-800">
        <div className="grid grid-cols-2 h-screen">
          <div className="w-full grid place-content-center">
            <div className="m-5 justify-center">
              <div className="flex justify-center">
                <img src={logo} className="h-8 pe-2 pt-1" />
                <h2 className="text-2xl font-bold font-sans">SIMS PPOB</h2>
              </div>
              <div className="w-2/3 text-center mx-auto mt-8 text-3xl font-bold font-sans block">
                Masuk atau buat akun untuk memulai
              </div>

              <div className="mt-8 sm:mx-auto sm:w-full sm:max-w-sm">
                <form className="space-y-6" onSubmit={handleSubmit}>
                  <div>
                    <div className="mt-0">
                      <AiOutlineMail className="icon_input" />
                      <input
                        value={data.email}
                        onChange={(e) => handleInput(e)}
                        id="email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="masukkan email anda"
                        required
                        className="px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400  sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <div className="mt-0">
                      <AiOutlineLock className="icon_input float-left" />
                      <div
                        className="cursor-pointer"
                        onClick={() => openEye(isOpenEye)}
                      >
                        {!isOpenEye ? (
                          <AiOutlineEyeInvisible className="icon_input_eye float-right" />
                        ) : (
                          <AiOutlineEye className="icon_input_eye float-right" />
                        )}
                      </div>
                      <input
                        value={data.password}
                        onChange={(e) => handleInput(e)}
                        id="password"
                        name="password"
                        type={!isOpenEye ? "password" : "text"}
                        autoComplete="current-password"
                        placeholder="masukkan password anda"
                        required
                        className="px-2 block w-full rounded border-0 py-1.5 text-gray-700 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 sm:text-sm sm:leading-6 bg-white"
                      />
                    </div>
                  </div>

                  <div>
                    <button
                      type="submit"
                      className="flex w-full justify-center rounded bg-red-600 px-3 py-2 text-sm font-semibold leading-6 text-white shadow-sm hover:bg-red-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-red-600"
                    >
                      Masuk
                    </button>
                  </div>
                </form>

                <p className="mt-10 text-center text-sm text-gray-500">
                  Belum punya akun?{" "}
                  <NavLink
                    to="/register"
                    className="font-semibold leading-6 text-red-600 hover:text-red-500"
                  >
                    Registrasi disini.
                  </NavLink>
                </p>
              </div>
            </div>
          </div>
          <div className="w-full max-h-screen" style={sectionStyle}></div>
        </div>
      </div>
    </>
  );
};

export default Login;
