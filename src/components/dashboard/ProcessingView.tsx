import { CheckCircle, Circle } from "lucide-react";
import { PipelineStep } from "@/types/resume";
import { cn } from "@/lib/utils";

interface ProcessingViewProps {
  steps: PipelineStep[];
  resumeName: string;
  uploadedAt: string;
}

export function ProcessingView({ steps, resumeName, uploadedAt }: ProcessingViewProps) {
  return (
    <div className="p-6 space-y-8">
      {/* Hero Section */}
      <div className="bg-gradient-to-r from-vmock-blue to-purple-600 rounded-xl p-8 text-white relative overflow-hidden">
        <div className="relative z-10">
          <h2 className="text-2xl font-bold mb-2">SMART Benchmarking</h2>
          <p className="text-white/90 text-lg max-w-2xl">
            Benchmarks your profile against millions of others to deliver the most accurate 
            feedback tailored to your experiences.
          </p>
        </div>
        
        {/* Background Icons */}
        <div className="absolute right-8 top-1/2 -translate-y-1/2 flex gap-4 opacity-20">
          <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 bg-white rounded-sm"></div>
          </div>
          <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center">
            <div className="w-8 h-8 border-2 border-white rounded-full"></div>
          </div>
          <div className="w-16 h-16 border-2 border-white rounded-lg flex items-center justify-center">
            <div className="w-8 h-6 border-2 border-white"></div>
          </div>
        </div>
        
        {/* Progress Dots */}
        <div className="flex gap-2 mt-6">
          <div className="w-3 h-3 bg-white rounded-full"></div>
          <div className="w-3 h-3 bg-white/50 rounded-full"></div>
          <div className="w-3 h-3 bg-white/30 rounded-full"></div>
        </div>
      </div>

      {/* Resume Info */}
      <div className="space-y-2">
        <h3 className="text-xl font-semibold">{resumeName}</h3>
        <p className="text-muted-foreground">Uploaded - {uploadedAt}</p>
        
        {/* Progress Bar */}
        <div className="w-full bg-muted rounded-full h-2 mt-4">
          <div 
            className="bg-vmock-blue h-2 rounded-full transition-all duration-500"
            style={{ width: '60%' }}
          ></div>
        </div>
      </div>

      {/* Behind the Scenes */}
      <div className="space-y-4">
        <h4 className="text-lg font-semibold">Behind the scenes</h4>
        
        <div className="grid grid-cols-3 gap-4">
          {steps.map((step) => (
            <div key={step.key} className="flex items-center gap-3">
              {step.status === 'done' ? (
                <CheckCircle className="w-6 h-6 text-vmock-green flex-shrink-0" />
              ) : step.status === 'active' ? (
                <div className="w-6 h-6 rounded-full bg-vmock-blue flex items-center justify-center flex-shrink-0">
                  <div className="w-2 h-2 bg-white rounded-full"></div>
                </div>
              ) : (
                <Circle className="w-6 h-6 text-vmock-gray flex-shrink-0" />
              )}
              <span className={cn(
                "text-sm font-medium",
                step.status === 'done' ? "text-vmock-green" :
                step.status === 'active' ? "text-vmock-blue" :
                "text-muted-foreground"
              )}>
                {step.label}
              </span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}