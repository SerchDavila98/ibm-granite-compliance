import { useState } from "react";
import { File, FileCheck, Shield } from "lucide-react";

type FileType = "nda" | "contract" | "policy";

interface FileOption {
  id: FileType;
  name: string;
  description: string;
  icon: React.ReactNode;
}

const fileOptions: FileOption[] = [
  {
    id: "nda",
    name: "Mutual Non-Disclosure Agreement",
    description: "Standard 5-page NDA with confidentiality terms, last updated June 2023",
    icon: <Shield size={24} />,
  },
  {
    id: "contract",
    name: "Enterprise Service Agreement", 
    description: "Master services agreement for cloud infrastructure and consulting, 15 pages",
    icon: <File size={24} />,
  },
  {
    id: "policy",
    name: "Data Protection & Privacy Policy",
    description: "GDPR & CCPA compliant privacy policy, updated Q3 2023",
    icon: <FileCheck size={24} />,
  },
];

interface FileSelectorProps {
  onFileSelect: (fileType: FileType) => void;
}

const FileSelector = ({ onFileSelect }: FileSelectorProps) => {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  const handleSelect = (fileType: FileType) => {
    setSelectedFile(fileType);
    onFileSelect(fileType);
  };

  return (
    <div className="grid md:grid-cols-3 gap-4">
      {fileOptions.map((file) => (
        <button
          key={file.id}
          onClick={() => handleSelect(file.id)}
          className={`p-6 rounded-xl border transition-all ${
            selectedFile === file.id
              ? "border-success-DEFAULT bg-success-light"
              : "border-neutral-200 hover:border-neutral-300 bg-white/50"
          }`}
        >
          <div className="flex flex-col items-center text-center space-y-3">
            <div className={`${
              selectedFile === file.id ? "text-success-DEFAULT" : "text-neutral-600"
            }`}>
              {file.icon}
            </div>
            <h3 className="font-medium text-neutral-900">{file.name}</h3>
            <p className="text-sm text-neutral-600">{file.description}</p>
          </div>
        </button>
      ))}
    </div>
  );
};

export default FileSelector;
