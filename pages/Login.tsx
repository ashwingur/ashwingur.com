import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../components/AuthContext";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, logout } = useAuth();
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
  };

  const handleLogout = async () => {
    await logout();
  };

  // const api = axios.create({
  //   baseURL: process.env.NEXT_PUBLIC_ASHWINGUR_API,
  //   withCredentials: true,
  // });
  // const userPress = async () => {
  //   try {
  //     const response = await api.get("user_test");
  //     console.log(response.data);
  //   } catch (error) {}
  // };
  // const adminPress = async () => {
  //   try {
  //     const response = await api.get("admin_test");
  //     console.log(response.data);
  //   } catch (error) {}
  // };

  return (
    <div>
      <Navbar fixed={true} />
      <div className="flex flex-col items-center justify-center">
        {(user === null || user === undefined) && (
          <div className="flex flex-col mt-20 p-8 items-center bg-stone-100 dark:bg-slate-800 rounded-lg">
            <h1 className="text-center">Login</h1>
            <form
              className="flex flex-col items-center my-4 w-72 gap-2"
              onSubmit={handleSubmit}
            >
              <input
                className="p-2 rounded-lg"
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className="p-2 rounded-lg"
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                className="bg-blue-200 dark:bg-[#2e1065] py-2 px-8 mt-4 rounded-md hover:bg-blue-400 dark:hover:bg-violet-800 transition-all"
                type="submit"
              >
                Login
              </button>
            </form>
          </div>
        )}
        {user && (
          <div className="flex flex-col mt-20 p-8 items-center bg-stone-100 dark:bg-slate-800 rounded-lg">
            <h1 className="text-center">Logout</h1>
            <div className="mt-4">Username: {user}</div>
            <button
              className="bg-blue-200 dark:bg-[#2e1065] py-2 px-8 mt-4 rounded-md hover:bg-blue-400 dark:hover:bg-violet-800 transition-all"
              onClick={() => {
                handleLogout();
              }}
            >
              Logout
            </button>
          </div>
        )}
      </div>
      {/* <div className="flex flex-col items-center mt-7">
        <button onClick={userPress}>User</button>
        <button onClick={adminPress}>Admin</button>
      </div> */}
    </div>
  );
};

export default Login;
function aysnc() {
  throw new Error("Function not implemented.");
}
