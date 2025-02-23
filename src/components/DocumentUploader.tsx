
import { useState } from "react";
import { Upload, Check } from "lucide-react";

const DocumentUploader = () => {
  const [isDragging, setIsDragging] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);

  const handleDragOver = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(true);
  };

  const handleDragLeave = () => {
    setIsDragging(false);
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    setIsDragging(false);
    // Simulate upload
    setTimeout(() => {
      setIsUploaded(true);
    }, 1000);
  };

  const handleClick = () => {
    // Simulate upload
    setTimeout(() => {
      setIsUploaded(true);
    }, 1000);
  };

  return (
    <div
      className={`p-8 rounded-xl border-2 border-dashed transition-colors ${
        isDragging
          ? "border-success-DEFAULT bg-success-light"
          : "border-neutral-300 hover:border-neutral-400"
      } ${
        isUploaded ? "bg-success-light border-success-DEFAULT" : "bg-white/50"
      } backdrop-blur-sm`}
      onDragOver={handleDragOver}
      onDragLeave={handleDragLeave}
      onDrop={handleDrop}
    >
      <div className="text-center">
        {isUploaded ? (
          <div className="flex flex-col items-center space-y-2">
            <div className="w-12 h-12 rounded-full bg-success-DEFAULT flex items-center justify-center">
              <Check className="text-white" size={24} />
            </div>
            <p className="text-success-dark font-medium">Document uploaded successfully</p>
          </div>
        ) : (
          <>
            <Upload
              className="mx-auto text-neutral-400 mb-4"
              size={32}
            />
            <p className="text-neutral-600 mb-2">
              Drag and drop your documents here, or{" "}
              <button
                onClick={handleClick}
                className="text-neutral-900 font-medium hover:text-neutral-700 transition-colors"
              >
                click to upload
              </button>
            </p>
            <p className="text-neutral-400 text-sm">
              Supports PDF, DOCX, and TXT files
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default DocumentUploader;
