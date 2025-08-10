import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Pillar, InsightItem } from "@/types/resume";
import { TrendingUp, Users, FileText, BarChart3 } from "lucide-react";

interface SummaryPanelProps {
  overallScore: number;
  pillars: Pillar[];
  insights: InsightItem[];
  onPillarClick: (pillar: 'impact' | 'presentation' | 'competencies') => void;
}

export function SummaryPanel({ overallScore, pillars, insights, onPillarClick }: SummaryPanelProps) {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'good': return 'text-status-good';
      case 'track': return 'text-status-track';
      case 'needs': return 'text-status-needs';
      default: return 'text-muted-foreground';
    }
  };

  const getStatusBg = (status: string) => {
    switch (status) {
      case 'good': return 'bg-status-good-bg';
      case 'track': return 'bg-status-track-bg';
      case 'needs': return 'bg-status-needs-bg';
      default: return 'bg-muted';
    }
  };

  return (
    <div className="space-y-6 p-6">
      {/* Score Section */}
      <div className="flex items-start justify-between">
        <div className="space-y-2">
          <h2 className="text-2xl font-bold">Your Score</h2>
          <div className="flex items-center gap-4">
            <div className="relative w-32 h-32">
              {/* Score Circle */}
              <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 120 120">
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="#f1f5f9"
                  strokeWidth="8"
                />
                <circle
                  cx="60"
                  cy="60"
                  r="54"
                  fill="none"
                  stroke="url(#gradient)"
                  strokeWidth="8"
                  strokeLinecap="round"
                  strokeDasharray={`${(overallScore / 100) * 339.292} 339.292`}
                />
                <defs>
                  <linearGradient id="gradient" x1="0%" y1="0%" x2="100%" y2="100%">
                    <stop offset="0%" stopColor="hsl(var(--vmock-orange))" />
                    <stop offset="100%" stopColor="hsl(var(--vmock-blue))" />
                  </linearGradient>
                </defs>
              </svg>
              <div className="absolute inset-0 flex items-center justify-center">
                <span className="text-3xl font-bold text-vmock-orange">{overallScore}</span>
              </div>
            </div>
          </div>
        </div>

        <div className="space-y-2">
          <div className="text-lg font-semibold text-vmock-green">You are on track!</div>
          <div className="text-sm text-muted-foreground">
            You need only <span className="font-semibold">8 points</span> to reach the{' '}
            <span className="text-vmock-green font-semibold">Green Zone</span>
          </div>
        </div>
      </div>

      {/* Progress Indicator */}
      <div className="space-y-2">
        <div className="flex justify-between text-sm font-medium">
          <span>Needs Work</span>
          <span>On Track</span>
          <span>Good Job</span>
        </div>
        <div className="relative h-6 bg-gradient-to-r from-status-needs via-status-track to-status-good rounded-full">
          <div 
            className="absolute top-1/2 w-4 h-4 bg-white border-2 border-vmock-orange rounded-full transform -translate-y-1/2 shadow-sm"
            style={{ left: `${overallScore}%` }}
          />
        </div>
      </div>

      {/* VMock Badge */}
      <div className="flex items-center gap-2 text-sm text-muted-foreground">
        <div className="w-6 h-6 rounded-full bg-vmock-blue text-white flex items-center justify-center text-xs font-bold">
          VM
        </div>
        <span>Benchmarked against millions of Resumes</span>
      </div>

      {/* Pillar Cards */}
      <div className="grid grid-cols-3 gap-4">
        {pillars.map((pillar) => (
          <Card 
            key={pillar.id} 
            className="cursor-pointer hover:shadow-md transition-shadow"
            onClick={() => onPillarClick(pillar.type)}
          >
            <CardContent className="p-4 text-center space-y-2">
              <div className={cn("text-2xl font-bold", getStatusColor(pillar.status))}>
                {pillar.score}
                <span className="text-sm text-muted-foreground">/{pillar.max}</span>
              </div>
              <div className="font-medium capitalize">{pillar.type}</div>
            </CardContent>
          </Card>
        ))}
      </div>

      {/* Action Steps */}
      <div className="space-y-4">
        <h3 className="font-semibold text-vmock-blue">Steps to Improve Your Score</h3>
        <div className="space-y-3">
          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <TrendingUp className="w-5 h-5 text-vmock-blue" />
            <div className="flex-1">
              <div className="font-medium">Showcase more competencies</div>
              <div className="text-sm text-muted-foreground">
                Include more experiences as per your target function to showcase soft skills.
              </div>
            </div>
            <div className="bg-vmock-blue text-white text-xs px-2 py-1 rounded font-medium">+13</div>
          </div>

          <div className="flex items-center gap-3 p-3 bg-blue-50 rounded-lg">
            <FileText className="w-5 h-5 text-vmock-blue" />
            <div className="flex-1">
              <div className="font-medium">Remove overused and filler words</div>
              <div className="text-sm text-muted-foreground">
                Avoid repetition and the use of filler words in your resume.
              </div>
            </div>
            <div className="bg-vmock-blue text-white text-xs px-2 py-1 rounded font-medium">+7</div>
          </div>
        </div>
      </div>

      <Button className="w-full bg-vmock-blue hover:bg-vmock-blue/90">
        View Detailed Feedback
      </Button>
    </div>
  );
}

function cn(...classes: (string | undefined)[]) {
  return classes.filter(Boolean).join(' ');
}