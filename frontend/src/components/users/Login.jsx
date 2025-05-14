import React, { useState } from "react";
import logo from "../../assets/till_date_circle.png";
import { Toaster, toast } from 'sonner';
// import { Toaster, toast } from "react-hot-toast";
import { useNavigate } from "react-router-dom";
import { loginUser } from "../../services/authServices";

import { useAuth } from "../../utils/authContext";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  //   const [showPassword, setShowPassword] = useState(false);
  //   const toggleShowPassword = () => {
  //     setShowPassword(!showPassword);
  //   };
  const [credentials, setCredentials] = useState({
    email: "",
    password: "",
  });
  const navigate = useNavigate();
  // const dispatch = useDispatch()
  const auth = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    // Prevent page reload

    console.log(email, password);

    try {
      if (!email || !password) {
        // message.error("Fields cannot be left empty");
        toast.error("Fields cannot be left empty", {duration: 1550});
      } else {
        const user = {
          email: email,
          password: password,
        };
        auth.setEmail(user.email);

        // const response = await axios.post("/user/login", user);
        const response = await loginUser(user);
        console.log(response);

        if (response.data.success) {
          toast.success(response.data.message || "Login successful!", {duration: 1550});
          console.log("login successful");

          localStorage.setItem("token", response.data.token);
          navigate("/home");
        } else {
          console.log("failed");
          toast.error(response.data.toast || "Login failed!", {duration: 1550});

          // toast.success(response.data.toast);
        }
      }
    } catch (error) {
      toast.error("Unable to Login", {duration: 1550});
    }
  };

  return (
    <div
      className=" bg-gradient-to-br from-teal-950 via-teal-700 to-slate-900"    >
      <div className="h-screen flex items-center justify-center ">
        <div className="flex items-center w-full max-w-md  px-6 mx-auto lg:w-2/6 p-8 rounded-2xl ring ring-teal-900 shadow-lg/30 shadow-black-500/30 ">
          <div className="flex-1">
            <div className="text-center">
              <div className="flex justify-center mx-auto  ">
                <img
                  className="w-auto h-10 sm:h-30 rounded-full bg-conic-180"
                  // src="./assets/till_date2.png"
                  src={logo}
                  alt="till_data logo"
                />
              </div>

              <p className="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div className="mt-8">
              <form>
                <div>
                  <label
                    htmlFor="email"
                    className="block mb-2 text-sm text-gray-600 dark:text-gray-200"
                  >
                    Email Address
                  </label>
                  <input
                    type="email"
                    name="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    placeholder="example@example.com"
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <div className="flex justify-between mb-2">
                    <label
                      htmlFor="password"
                      className="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
                    >
                      Forgot password?
                    </a>
                  </div>

                  <input
                    type="password"
                    name="password"
                    id="password"
                    placeholder="Your Password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div className="mt-6">
                  <Toaster />
                  <button
                    type="submit"
                    onClick={handleSubmit}
                    // onClick={handleLogin}
                    className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50"
                  >
                    Sign in
                  </button>
                </div>
              </form>

              <p className="mt-6 text-sm text-center text-gray-400">
                Dont have an account yet?{" "}
                <a
                  href="#"
                  className="text-blue-500 focus:outline-none focus:underline hover:underline"
                >
                  Sign up
                </a>
                .
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
