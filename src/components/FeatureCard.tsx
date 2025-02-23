
import { ReactNode } from "react";

interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
}

const FeatureCard = ({ icon, title, description }: FeatureCardProps) => {
  return (
    <div className="p-6 rounded-xl backdrop-blur-sm bg-white/50 shadow-sm border border-neutral-200 hover:shadow-md transition-shadow animate-fade-up">
      <div className="flex items-center space-x-4 mb-4">
        <div className="text-neutral-700">{icon}</div>
        <h3 className="text-lg font-semibold text-neutral-800">{title}</h3>
      </div>
      <p className="text-neutral-600 leading-relaxed">{description}</p>
    </div>
  );
};

export default FeatureCard;
