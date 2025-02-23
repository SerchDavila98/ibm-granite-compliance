
import { useState } from "react";
import { ShieldCheck, Zap, RefreshCw } from "lucide-react";
import FileSelector from "@/components/FileSelector";
import FeatureCard from "@/components/FeatureCard";
import RiskAnalysis from "@/components/RiskAnalysis";
import ComplianceChat from "@/components/ComplianceChat";

type FileType = "nda" | "contract" | "policy";

const Index = () => {
  const [selectedFile, setSelectedFile] = useState<FileType | null>(null);

  return (
    <div className="min-h-screen bg-gradient-to-b from-neutral-50 to-white px-4 py-12">
      <div className="max-w-6xl mx-auto space-y-16">
        {/* Hero Section */}
        <div className="text-center space-y-6 animate-fade-up">
          <div className="inline-block px-4 py-1.5 bg-neutral-900 text-white text-sm font-medium rounded-full mb-4">
            Powered by Advanced AI
          </div>
          <h1 className="text-4xl md:text-5xl font-semibold text-neutral-900 max-w-3xl mx-auto">
            Intelligent Contract Compliance Made Simple
          </h1>
          <p className="text-neutral-600 text-lg max-w-2xl mx-auto">
            Focus on perfecting AI where it matters most—contract auditing and compliance.
            Let our intelligent system handle the complexity while you stay in control.
          </p>
        </div>

        {/* File Selection */}
        <div className="animate-fade-up" style={{ animationDelay: "0.2s" }}>
          <h2 className="text-2xl font-semibold text-neutral-900 mb-6 text-center">
            Select a Document to Analyze
          </h2>
          <FileSelector onFileSelect={setSelectedFile} />
        </div>

        {selectedFile && (
          <>
            {/* Risk Analysis */}
            <div className="animate-fade-up" style={{ animationDelay: "0.3s" }}>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Risk Analysis
              </h2>
              <RiskAnalysis fileType={selectedFile} />
            </div>

            {/* Chat Interface */}
            <div className="animate-fade-up" style={{ animationDelay: "0.4s" }}>
              <h2 className="text-2xl font-semibold text-neutral-900 mb-6">
                Ask Questions
              </h2>
              <ComplianceChat fileType={selectedFile} />
            </div>
          </>
        )}

        {/* Features Section */}
        <div className="grid md:grid-cols-3 gap-6">
          <FeatureCard
            icon={<ShieldCheck size={24} />}
            title="Structured Legal Accuracy"
            description="Powered by Granite for precise, structured analysis of legal documents with unmatched accuracy."
          />
          <FeatureCard
            icon={<RefreshCw size={24} />}
            title="Cross-checking RAG"
            description="Ensures reliable results through RAG technology, significantly reducing AI hallucinations."
          />
          <FeatureCard
            icon={<Zap size={24} />}
            title="Customized Training"
            description="Adapts to your specific compliance needs through customized AI retraining processes."
          />
        </div>

        {/* CTA Section */}
        <div className="text-center">
          <button className="px-8 py-4 bg-neutral-900 text-white rounded-lg font-medium hover:bg-neutral-800 transition-colors">
            Start Your Compliance Check
          </button>
        </div>
      </div>
    </div>
  );
};

export default Index;
