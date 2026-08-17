import { useState } from "react";
import toast from "react-hot-toast";
import API_BASE_URL from "../../config.js";

function useUploadProject() {
  const [selectedFile, setSelectedFile] = useState(null);
  const [uploadResult, setUploadResult] = useState(null);
  const [isUploading, setIsUploading] = useState(false);
  const [uploadError, setUploadError] = useState("");

  const handleUpload = async () => {
    if (!selectedFile) {
      setUploadError("Please select a ZIP file first.");
      toast.error("Please select a ZIP file first.");
      return;
    }

    setIsUploading(true);
    setUploadError("");
    setUploadResult(null);

    try {
      const formData = new FormData();
      formData.append("file", selectedFile);

        const response = await fetch(`${API_BASE_URL}/api/upload`,  {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed. Please try again.");
      }

      const data = await response.json();

      setUploadResult(data);
      toast.success("Project uploaded successfully.");
    } catch (error) {
      const message =
        error instanceof Error
          ? error.message
          : "Something went wrong. Please try again.";

      setUploadError(message);
      toast.error(message);
    } finally {
      setIsUploading(false);
    }
  };

  const handleRemoveFile = () => {
    setSelectedFile(null);
    setUploadResult(null);
    setUploadError("");

    toast("File removed");
  };

  return {
    selectedFile,
    setSelectedFile,
    uploadResult,
    handleUpload,
    handleRemoveFile,
    isUploading,
    uploadError,
  };
}

export default useUploadProject;