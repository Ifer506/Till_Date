import { useState } from "react";
import React from "react";
import logo from "../assets/till_date2.png";
// import { useAuth } from "../utils/authContext";

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
  //   const [showPassword, setShowPassword] = useState(false);
  //   const toggleShowPassword = () => {
  //     setShowPassword(!showPassword);
  //   };
  //   const [credentials, setCredentials] = useState({
  //     email: "",
  //     password: "",
  //   });
  //   const navigate = useNavigate();
  //   // const dispatch = useDispatch()
  //   const auth = useAuth();

    const handleSubmit = async (e) => {
      concole.log(setEmail,setPassword)
    };
      // e.preventDefault();

  //     try {
  //       if (!email || !password) {
  //         message.error("Fields cannot be left empty");
  //       } else {
  //         const user = {
  //           email: email,
  //           password: password,
  //         };
  //         auth.setEmail(user.email);

  //         const response = await axios.post("/auth/login", user);
  //         console.log(response);
  //         if (response.data.success) {
  //           message.success(response.data.message);
  //           localStorage.setItem("token", response.data.token);
  //           navigate("/home");
  //         } else {
  //           console.log("Else");

  //           message.error(response.data.message);
  //         }
  //       }
  //     } catch (error) {
  //       message.error("Unable to Login");
  //     }
  //   };

  return (
    <div class=" bg-gradient-to-br from-teal-950 via-teal-700 to-slate-900
">
      <div class="h-screen flex items-center justify-center ">
        <div class="flex items-center w-full max-w-md  px-6 mx-auto lg:w-2/6 p-8 rounded-2xl ring ring-teal-900 shadow-lg/30 shadow-black-500/30 ">
          <div class="flex-1">
            <div class="text-center">
              <div class="flex justify-center mx-auto ">
                <img
                  class="w-auto h-10 sm:h-30"
                  // src="./assets/till_date2.png"
                  img
                  src={logo}
                  alt="till_data logo"
                />
              </div>

              <p class="mt-3 text-gray-500 dark:text-gray-300">
                Sign in to access your account
              </p>
            </div>

            <div class="mt-8">
              <form>
                <div>
                  <label
                    for="email"
                    class="block mb-2 text-sm text-gray-600 dark:text-gray-200"
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
                    class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div class="mt-6">
                  <div class="flex justify-between mb-2">
                    <label
                      for="password"
                      class="text-sm text-gray-600 dark:text-gray-200"
                    >
                      Password
                    </label>
                    <a
                      href="#"
                      class="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline"
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
                    class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>

                <div class="mt-6">
                  <button type = "submit"
                    onClick = {handleSubmit}
                    class="w-full px-4 py-2 tracking-wide text-white transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                    Sign in
                    
                  </button>
                </div>
              </form>

              <p class="mt-6 text-sm text-center text-gray-400">
                Don&#x27;t have an account yet?{" "}
                <a
                  href="#"
                  class="text-blue-500 focus:outline-none focus:underline hover:underline"
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
