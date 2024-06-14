import FileUpload from "@components/filetools/FileUpload";
import Navbar from "@components/navbars/Navbar";
import { useAuth } from "@context/AuthContext";
import React from "react";

const FileTools = () => {
  const { user, loading } = useAuth();

  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <div className="flex flex-col items-center pt-24 pb-8 mx-4">
        <h1>File Tools</h1>
        {user === null && !loading && (
          <p className="bg-red-600 p-1 rounded-lg text-white mt-4">
            You are not logged in, conversion is disabled.
          </p>
        )}
        <div className="w-full md:w-4/5 lg:w-1/2 mt-4">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default FileTools;
