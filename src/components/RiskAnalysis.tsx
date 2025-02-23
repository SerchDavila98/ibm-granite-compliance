
import { useState, useEffect } from "react";
import { AlertTriangle, MessageSquare, ThumbsUp, ThumbsDown } from "lucide-react";
import { useToast } from "@/hooks/use-toast";

type FileType = "nda" | "contract" | "policy";

interface Risk {
  id: string;
  severity: "high" | "medium" | "low";
  description: string;
  explanation: string;
  fix?: string;
}

const allRisksByFile: Record<FileType, Risk[]> = {
  nda: [
    {
      id: "nda-1",
      severity: "high",
      description: "Undefined confidentiality period",
      explanation: "The agreement lacks a specific timeframe for confidentiality obligations.",
      fix: "Added a standard 5-year confidentiality period with automatic renewal option.",
    },
    {
      id: "nda-2",
      severity: "high",
      description: "Missing data breach notification clause",
      explanation: "No provisions for handling and reporting data breaches.",
      fix: "Inserted comprehensive data breach notification requirements with 72-hour reporting timeline.",
    },
    {
      id: "nda-3",
      severity: "high",
      description: "Insufficient IP protection measures",
      explanation: "Intellectual property safeguards are not adequately defined.",
      fix: "Added detailed IP protection protocols and ownership clarifications.",
    },
    {
      id: "nda-4",
      severity: "medium",
      description: "Vague confidential information definition",
      explanation: "The scope of confidential information needs more specific boundaries.",
      fix: "Enhanced definition with specific categories and examples of confidential information.",
    },
    {
      id: "nda-5",
      severity: "medium",
      description: "Unclear return/destruction procedures",
      explanation: "Procedures for handling confidential materials post-termination are ambiguous.",
      fix: "Added detailed protocol for material return or destruction with verification requirements.",
    },
    {
      id: "nda-6",
      severity: "medium",
      description: "Missing third-party disclosure terms",
      explanation: "No clear guidelines for sharing information with third parties.",
      fix: "Implemented structured third-party disclosure framework with approval process.",
    },
    {
      id: "nda-7",
      severity: "medium",
      description: "Inadequate employee compliance measures",
      explanation: "Employee adherence to NDA terms isn't properly addressed.",
      fix: "Added employee training requirements and compliance monitoring procedures.",
    },
    {
      id: "nda-8",
      severity: "medium",
      description: "Weak survivorship clause",
      explanation: "Post-termination obligations are not clearly defined.",
      fix: "Strengthened survivorship clause with specific post-termination requirements.",
    },
    {
      id: "nda-9",
      severity: "low",
      description: "Missing contact information",
      explanation: "Key contact points for notices are not specified.",
      fix: "Added designated contact information for both parties.",
    },
    {
      id: "nda-10",
      severity: "low",
      description: "Unclear jurisdiction definition",
      explanation: "Governing law and jurisdiction are not explicitly stated.",
      fix: "Specified applicable law and jurisdiction for dispute resolution.",
    },
    {
      id: "nda-11",
      severity: "low",
      description: "Incomplete signature requirements",
      explanation: "Document execution requirements are not fully detailed.",
      fix: "Added clear signature and execution requirements including digital signatures.",
    },
    {
      id: "nda-12",
      severity: "high",
      description: "Missing trade secret identification",
      explanation: "No process for marking or identifying trade secrets.",
      fix: "Implemented clear trade secret marking and identification procedures.",
    },
    {
      id: "nda-13",
      severity: "medium",
      description: "Insufficient audit rights",
      explanation: "Limited ability to verify compliance with agreement terms.",
      fix: "Added comprehensive audit rights and procedures.",
    },
    {
      id: "nda-14",
      severity: "low",
      description: "Ambiguous notice period",
      explanation: "Timeline for required notices is not clearly defined.",
      fix: "Specified notice periods and acceptable delivery methods.",
    },
    {
      id: "nda-15",
      severity: "high",
      description: "Weak remedies clause",
      explanation: "Available remedies for breach are not comprehensively outlined.",
      fix: "Enhanced remedies clause with specific enforcement mechanisms.",
    },
  ],
  contract: [
    {
      id: "contract-1",
      severity: "high",
      description: "Inadequate liability cap",
      explanation: "The liability limitation is disproportionate to contract value.",
      fix: "Adjusted liability cap to standard 12-month fee equivalent.",
    },
    {
      id: "contract-2",
      severity: "high",
      description: "Missing service levels",
      explanation: "No defined performance metrics or standards.",
      fix: "Added comprehensive SLA with specific performance metrics.",
    },
    {
      id: "contract-3",
      severity: "high",
      description: "Weak termination rights",
      explanation: "Termination conditions are not clearly defined.",
      fix: "Added detailed termination triggers and procedures.",
    },
    {
      id: "contract-4",
      severity: "medium",
      description: "Unclear payment terms",
      explanation: "Payment schedule and conditions need clarification.",
      fix: "Specified payment timeline and late payment consequences.",
    },
    {
      id: "contract-5",
      severity: "medium",
      description: "Incomplete force majeure",
      explanation: "Force majeure events not comprehensively covered.",
      fix: "Updated force majeure clause with modern contingencies.",
    },
    {
      id: "contract-6",
      severity: "medium",
      description: "Missing change control",
      explanation: "No formal process for contract modifications.",
      fix: "Implemented structured change management procedures.",
    },
    {
      id: "contract-7",
      severity: "high",
      description: "Inadequate data protection",
      explanation: "Data handling requirements not sufficiently detailed.",
      fix: "Added comprehensive data protection and privacy measures.",
    },
    {
      id: "contract-8",
      severity: "medium",
      description: "Vague acceptance criteria",
      explanation: "Deliverable acceptance process needs clarification.",
      fix: "Defined clear acceptance criteria and testing procedures.",
    },
    {
      id: "contract-9",
      severity: "low",
      description: "Missing escalation procedure",
      explanation: "No clear path for dispute resolution.",
      fix: "Added structured escalation and resolution process.",
    },
    {
      id: "contract-10",
      severity: "low",
      description: "Unclear warranty terms",
      explanation: "Warranty coverage and duration not specified.",
      fix: "Added detailed warranty terms and conditions.",
    },
    {
      id: "contract-11",
      severity: "high",
      description: "Insufficient IP rights",
      explanation: "Intellectual property ownership not clearly defined.",
      fix: "Clarified IP ownership and usage rights.",
    },
    {
      id: "contract-12",
      severity: "medium",
      description: "Missing insurance requirements",
      explanation: "Required insurance coverage not specified.",
      fix: "Added detailed insurance requirements and limits.",
    },
    {
      id: "contract-13",
      severity: "low",
      description: "Incomplete notice provisions",
      explanation: "Notice requirements need more detail.",
      fix: "Enhanced notice provisions with specific requirements.",
    },
    {
      id: "contract-14",
      severity: "medium",
      description: "Weak confidentiality terms",
      explanation: "Confidentiality obligations need strengthening.",
      fix: "Enhanced confidentiality provisions and safeguards.",
    },
    {
      id: "contract-15",
      severity: "high",
      description: "Missing compliance requirements",
      explanation: "Regulatory compliance obligations not specified.",
      fix: "Added comprehensive compliance requirements.",
    },
  ],
  policy: [
    {
      id: "policy-1",
      severity: "high",
      description: "Outdated GDPR compliance",
      explanation: "Privacy policy lacks current GDPR requirements.",
      fix: "Updated with latest GDPR compliance measures and user rights.",
    },
    {
      id: "policy-2",
      severity: "high",
      description: "Missing CCPA provisions",
      explanation: "California privacy requirements not addressed.",
      fix: "Added CCPA-specific provisions and consumer rights.",
    },
    {
      id: "policy-3",
      severity: "high",
      description: "Incomplete data collection disclosure",
      explanation: "Data collection practices not fully transparent.",
      fix: "Enhanced data collection disclosure with specific details.",
    },
    {
      id: "policy-4",
      severity: "medium",
      description: "Vague cookie policy",
      explanation: "Cookie usage and purposes need clarification.",
      fix: "Added detailed cookie classification and purposes.",
    },
    {
      id: "policy-5",
      severity: "medium",
      description: "Unclear data retention",
      explanation: "Data retention periods not specified.",
      fix: "Added specific data retention timeframes and procedures.",
    },
    {
      id: "policy-6",
      severity: "medium",
      description: "Missing breach notification",
      explanation: "Data breach notification process not outlined.",
      fix: "Added comprehensive breach notification procedures.",
    },
    {
      id: "policy-7",
      severity: "high",
      description: "Insufficient consent mechanisms",
      explanation: "User consent collection needs improvement.",
      fix: "Implemented robust consent collection and management.",
    },
    {
      id: "policy-8",
      severity: "medium",
      description: "Weak cross-border transfer",
      explanation: "International data transfer safeguards inadequate.",
      fix: "Enhanced international data transfer provisions.",
    },
    {
      id: "policy-9",
      severity: "low",
      description: "Missing contact details",
      explanation: "Privacy contact information not provided.",
      fix: "Added complete privacy contact information.",
    },
    {
      id: "policy-10",
      severity: "low",
      description: "Unclear complaint procedure",
      explanation: "User complaint process needs clarification.",
      fix: "Added detailed complaint handling procedure.",
    },
    {
      id: "policy-11",
      severity: "high",
      description: "Incomplete child privacy",
      explanation: "Child data protection measures inadequate.",
      fix: "Enhanced child privacy protection measures.",
    },
    {
      id: "policy-12",
      severity: "medium",
      description: "Missing vendor management",
      explanation: "Third-party data handling not addressed.",
      fix: "Added vendor data handling requirements.",
    },
    {
      id: "policy-13",
      severity: "low",
      description: "Unclear policy updates",
      explanation: "Policy update notification process not defined.",
      fix: "Added clear policy update procedures.",
    },
    {
      id: "policy-14",
      severity: "medium",
      description: "Weak security measures",
      explanation: "Data security measures need enhancement.",
      fix: "Strengthened data security provisions.",
    },
    {
      id: "policy-15",
      severity: "high",
      description: "Missing rights exercise",
      explanation: "User rights exercise process unclear.",
      fix: "Added detailed user rights exercise procedures.",
    },
  ],
};

interface RiskAnalysisProps {
  fileType: FileType;
}

const RiskAnalysis = ({ fileType }: RiskAnalysisProps) => {
  const [fixedRisks, setFixedRisks] = useState<string[]>([]);
  const [feedback, setFeedback] = useState<Record<string, boolean>>({});
  const [analyzing, setAnalyzing] = useState(true);
  const [displayedRisks, setDisplayedRisks] = useState<Risk[]>([]);
  const { toast } = useToast();

  useEffect(() => {
    setAnalyzing(true);
    setFixedRisks([]);
    setFeedback({});
    
    // Randomly select 3 risks while ensuring at least one high severity
    const allRisks = [...allRisksByFile[fileType]];
    const highRisks = allRisks.filter(risk => risk.severity === "high");
    const otherRisks = allRisks.filter(risk => risk.severity !== "high");
    
    // Shuffle arrays
    const shuffleArray = (array: Risk[]) => {
      for (let i = array.length - 1; i > 0; i--) {
        const j = Math.floor(Math.random() * (i + 1));
        [array[i], array[j]] = [array[j], array[i]];
      }
      return array;
    };

    const shuffledHigh = shuffleArray(highRisks);
    const shuffledOther = shuffleArray(otherRisks);

    // Select risks
    const selected = [
      shuffledHigh[0], // Ensure at least one high severity
      ...shuffledOther.slice(0, 2)
    ];

    // Shuffle final selection
    const finalRisks = shuffleArray(selected);

    const timer = setTimeout(() => {
      setDisplayedRisks(finalRisks);
      setAnalyzing(false);
    }, 2500);

    return () => clearTimeout(timer);
  }, [fileType]);

  const handleFix = async (riskId: string) => {
    const risk = displayedRisks.find(r => r.id === riskId);
    
    toast({
      title: "Applying fix...",
      description: "Please wait while we update the document.",
    });

    await new Promise(resolve => setTimeout(resolve, 1500));
    
    setFixedRisks((prev) => [...prev, riskId]);
    
    toast({
      title: "Risk Fixed",
      description: risk?.fix || "The issue has been automatically resolved.",
    });
  };

  const handleFeedback = (riskId: string, isPositive: boolean) => {
    setFeedback((prev) => ({ ...prev, [riskId]: isPositive }));
    toast({
      title: "Feedback Recorded",
      description: "Thank you for your feedback!",
    });
  };

  if (analyzing) {
    return (
      <div className="space-y-6">
        {[1, 2, 3].map((i) => (
          <div key={i} className="p-6 rounded-xl border border-neutral-200 bg-white/50 animate-pulse">
            <div className="flex items-start justify-between">
              <div className="space-y-3 flex-1">
                <div className="h-6 bg-neutral-200 rounded w-2/3" />
                <div className="h-4 bg-neutral-200 rounded w-full" />
              </div>
              <div className="w-24 h-8 bg-neutral-200 rounded-lg ml-4" />
            </div>
          </div>
        ))}
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {displayedRisks.map((risk) => {
        const isFixed = fixedRisks.includes(risk.id);
        return (
          <div
            key={risk.id}
            className={`p-6 rounded-xl border ${
              isFixed
                ? "border-success-DEFAULT bg-success-light"
                : "border-neutral-200 bg-white/50"
            }`}
          >
            <div className="flex items-start justify-between">
              <div className="space-y-3">
                <div className="flex items-center space-x-2">
                  <AlertTriangle
                    size={20}
                    className={
                      risk.severity === "high"
                        ? "text-red-500"
                        : risk.severity === "medium"
                        ? "text-yellow-500"
                        : "text-blue-500"
                    }
                  />
                  <h3 className="font-medium text-neutral-900">
                    {risk.description}
                  </h3>
                </div>
                <p className="text-sm text-neutral-600">{risk.explanation}</p>
                {isFixed && (
                  <p className="text-sm text-success-dark">
                    ✓ Fixed: {risk.fix}
                  </p>
                )}
              </div>
              <div className="flex items-center space-x-2">
                {!isFixed && (
                  <button
                    onClick={() => handleFix(risk.id)}
                    className="px-4 py-2 bg-success-DEFAULT text-white rounded-lg text-sm hover:bg-success-dark transition-colors"
                  >
                    Fix Issue
                  </button>
                )}
                <div className="flex items-center space-x-1">
                  <button
                    onClick={() => handleFeedback(risk.id, true)}
                    className={`p-1.5 rounded-lg hover:bg-neutral-100 ${
                      feedback[risk.id] === true ? "text-success-DEFAULT" : ""
                    }`}
                  >
                    <ThumbsUp size={18} />
                  </button>
                  <button
                    onClick={() => handleFeedback(risk.id, false)}
                    className={`p-1.5 rounded-lg hover:bg-neutral-100 ${
                      feedback[risk.id] === false ? "text-red-500" : ""
                    }`}
                  >
                    <ThumbsDown size={18} />
                  </button>
                </div>
              </div>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default RiskAnalysis;
