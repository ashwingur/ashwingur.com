import FileUpload from "@components/filetools/FileUpload";
import Navbar from "@components/navbars/Navbar";
import React from "react";

const FileTools = () => {
  return (
    <div className="min-h-screen">
      <Navbar fixed={true} />
      <div className="flex flex-col items-center pt-24">
        <h1>File Tools</h1>
        <div className="w-full md:w-4/5 lg:w-1/2 mt-4">
          <FileUpload />
        </div>
      </div>
    </div>
  );
};

export default FileTools;
