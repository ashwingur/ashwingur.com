import React, { useEffect, useState } from "react";
import Navbar from "../components/Navbar";
import axios from "axios";
import { useAuth } from "../components/AuthContext";
import { useRouter } from "next/navigation";

const Admin = () => {
  const { user, role } = useAuth();
  const router = useRouter();
  const [msg, setMsg] = useState("");

  useEffect(() => {
    if (role !== "admin") {
      router.replace("/");
    }
  }, [role, router]);

  const api = axios.create({
    baseURL: process.env.NEXT_PUBLIC_ASHWINGUR_API,
    withCredentials: true,
  });

  useEffect(() => {
    const adminTest = async () => {
      try {
        const response = await api.get("admin_test");
        setMsg(JSON.stringify(response.data));
      } catch (error) {
        setMsg(
          "Error fetching admin test, or maybe you SHOULDNT BE SEEING THIS PAGE"
        );
      }
    };
    adminTest();
  }, [api]);
  return (
    <div>
      <Navbar fixed={false} />
      <h2 className="text-center mt-4">Admin</h2>
      <p className="text-center">Super secret admin dashboard</p>
      <p className="text-center">{msg}</p>
    </div>
  );
};

export default Admin;
