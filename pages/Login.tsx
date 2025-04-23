import React, { FormEvent, useState } from "react";
import Navbar from "../components/navbars/Navbar";
import { useAuth } from "@context/AuthContext";
import LoadingIcon from "@components/LoadingIcon";

const Login = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const { login, user, logout, loading } = useAuth();
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
    <div className="h-screen">
      <Navbar fixed={false} />
      {loading && <LoadingIcon className="mx-auto mt-32 text-3xl" />}
      {!loading && (
        <div className="mt-32 flex flex-col items-center justify-center">
          {(user === null || user === undefined) && (
            <div className="card flex w-11/12 flex-col items-center p-8 md:w-96">
              <form
                className="my-4 flex w-72 flex-col items-center gap-2"
                onSubmit={handleSubmit}
              >
                <input
                  className={`input-hover ${
                    !isCorrectLogin ? "!border-2 !border-red-500" : ""
                  }`}
                  type="text"
                  placeholder="Username"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                />
                <input
                  className={`input-hover ${
                    !isCorrectLogin ? "!border-2 !border-red-500" : ""
                  }`}
                  type="password"
                  placeholder="Password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                />
                {!isCorrectLogin && (
                  <div className="text-center text-red-500">
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
            <div className="card flex w-11/12 flex-col items-center p-8 md:w-96">
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
      )}
    </div>
  );
};

export default Login;
