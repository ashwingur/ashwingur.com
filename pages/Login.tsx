import React from "react";
import Navbar from "../components/Navbar";

const Login = () => {
  return (
    <>
      <Navbar fixed={true} />
      <h1 className="mt-20">{process.env.NEXT_PUBLIC_ASHWINGUR_API}</h1>
    </>
  );
};

export default Login;
