import React, { FormEvent, useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import { useAuth } from "../components/AuthContext";
import axios from "axios";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, logout } = useAuth();
  const [isCorrectLogin, setIsCorrectLogin] = useState(true);
  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    await login(username, password);
    if (!user) {
      setIsCorrectLogin(false);
      setPassword("");
    }
  };

  const handleLogout = async () => {
    await logout();
  };

  return (
    <div>
      <Navbar fixed={true} />
      <div className="flex flex-col items-center justify-center mt-32">
        {(user === null || user === undefined) && (
          <div className="flex flex-col items-center p-8 card w-96">
            <form
              className="flex flex-col items-center my-4 w-72 gap-2"
              onSubmit={handleSubmit}
            >
              <input
                className={`p-2 rounded-lg bg-background-hover placeholder:text-muted ${
                  !isCorrectLogin ? "border-2 border-red-500" : ""
                }`}
                type="text"
                placeholder="Username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
              />
              <input
                className={`p-2 rounded-lg bg-background-hover placeholder:text-muted ${
                  !isCorrectLogin ? "border-2 border-red-500" : ""
                }`}
                type="password"
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              {!isCorrectLogin && (
                <div className="text-red-500">
                  Incorrect username or password
                </div>
              )}
              <button className="btn mt-4 w-32" type="submit">
                Login
              </button>
            </form>
          </div>
        )}
        {user && (
          <div className="flex flex-col items-center p-8 card w-96">
            <div className="mt-4 font-bold">Username: {user}</div>
            <button
              className="btn mt-4 w-32"
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
