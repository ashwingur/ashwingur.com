// components/FileUpload.tsx
import React, { useRef, useState } from "react";
import { FilePond, registerPlugin } from "react-filepond";
import "filepond/dist/filepond.min.css";
import FilePondPluginImagePreview from "filepond-plugin-image-preview";
import "filepond-plugin-image-preview/dist/filepond-plugin-image-preview.css";
import FilePondPluginFileValidateSize from "filepond-plugin-file-validate-size";
import FilePondPluginFileRename from "filepond-plugin-file-rename";
import { useMutation } from "react-query";
import { FilePondFile } from "filepond";
import { AiOutlineLoading } from "react-icons/ai";
import clsx from "clsx";
import { FaTrash } from "react-icons/fa6";

registerPlugin(
  FilePondPluginImagePreview,
  FilePondPluginFileValidateSize,
  FilePondPluginFileRename
);

const FileUpload: React.FC = () => {
  const [files, setFiles] = useState<(string | Blob | File)[]>([]);
  const [format, setFormat] = useState<string>("png");
  const [downloadLink, setDownloadLink] = useState<string | null>(null);
  const [downloadName, setDownloadName] = useState<string>("");
  const pondRef = useRef<FilePond>(null);

  const convertFiles = async (files: (string | Blob | File)[]) => {
    const formData = new FormData();
    files.forEach((fileItem) => {
      formData.append("files", fileItem);
    });
    formData.append("format", format);

    const response = await fetch(
      process.env.NEXT_PUBLIC_ASHWINGUR_API + "/filetools/convert",
      {
        method: "POST",
        body: formData,
        credentials: "include",
      }
    );

    if (!response.ok) {
      throw new Error("Network response was not ok");
    }

    return response.blob();
  };

  const { mutate, isLoading, isError, data } = useMutation<
    Blob,
    Error,
    (string | Blob | File)[]
  >(convertFiles, {
    onSuccess: (data, variables) => {
      const downloadUrl = URL.createObjectURL(data);
      setDownloadLink(downloadUrl);

      if (variables.length === 1 && variables[0] instanceof File) {
        const originalFileName = variables[0].name;
        const fileNameWithoutExtension = originalFileName.substring(
          0,
          originalFileName.lastIndexOf(".")
        );
        setDownloadName(`${fileNameWithoutExtension}.${format}`);
      } else {
        setDownloadName("converted.zip");
      }
    },
    onError: (error) => {
      // Handle error
      console.error(error);
    },
  });

  const handleConvert = () => {
    mutate(files);
  };

  const handleClearFiles = () => {
    if (pondRef.current) {
      pondRef.current.removeFiles();
    }
  };

  return (
    <div className="flex flex-col justify-center px-4">
      <FilePond
        ref={pondRef}
        files={files.map((file: any) => ({
          source: file,
          options: {
            type: "local",
          },
        }))}
        onupdatefiles={(fileItems: FilePondFile[]) => {
          setFiles(fileItems.map((fileItem) => fileItem.file as File));
        }}
        allowMultiple={true}
        maxFiles={10}
        maxFileSize="10MB"
        allowReorder={true}
        name="files"
        labelIdle='Drag & Drop your files or <span class="filepond--label-action">Browse</span>'
      />
      <div className="flex flex-col items-center gap-4 mt-2">
        {files.length > 0 && (
          <button
            onClick={handleClearFiles}
            className={clsx(
              "btn-secondary w-16 flex items-center justify-center h-10"
            )}
          >
            <FaTrash />
          </button>
        )}
        <div className="">
          <label htmlFor="format">Convert to:</label>
          <select
            id="format"
            value={format}
            onChange={(e) => setFormat(e.target.value)}
            className="ml-2 px-2 py-1 rounded-lg shadow-sm bg-background-muted"
          >
            <option value="png">PNG</option>
            <option value="jpg">JPG</option>
            <option value="webp">WEBP</option>
            <option value="pdf">PDF</option>
          </select>
        </div>
        <button
          onClick={handleConvert}
          disabled={isLoading || files.length === 0}
          className={clsx("btn w-32 flex items-center justify-center h-10")}
        >
          {isLoading ? (
            <AiOutlineLoading className="animate-spin text-xl" />
          ) : (
            "Convert"
          )}
        </button>
        {isError && <p>Error occurred</p>}
        {downloadLink && !isError && !isLoading && (
          <a
            className="btn w-32 h-10 block"
            href={downloadLink}
            download={downloadName}
          >
            Download
          </a>
        )}
      </div>
    </div>
  );
};

export default FileUpload;
