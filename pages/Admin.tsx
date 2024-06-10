import React, { useEffect, useState } from "react";
import Navbar from "../components/navbars/Navbar";
import { useAuth } from "@context/AuthContext";
import { useRouter } from "next/navigation";
import { TailSpin } from "react-loading-icons";
import AllUserDetails from "../components/AllUserDetails";

const Admin = () => {
  const { user, role, loading } = useAuth();
  const router = useRouter();

  useEffect(() => {
    if (!loading && role !== "admin") {
      router.replace("/");
    }
  }, [loading, role, router]);

  if (loading || role !== "admin") {
    return (
      <div className="min-h-screen">
        <Navbar fixed={false} />
        <div className="flex flex-col items-center justify-center mt-8">
          <TailSpin />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <div className="flex flex-col items-center pt-24 pb-8">
        <h1 className="text-center mb-4">Admin</h1>
        <AllUserDetails />
      </div>
    </div>
  );
};

export default Admin;
