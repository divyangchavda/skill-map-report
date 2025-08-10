import { useState } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { Finding, ActivePillar } from "@/types/resume";
import { CheckCircle, Clock, AlertTriangle, ChevronRight } from "lucide-react";
import { cn } from "@/lib/utils";

interface SystemFeedbackPanelProps {
  findings: Finding[];
  activePillar: ActivePillar;
  onPillarChange: (pillar: ActivePillar) => void;
  onFieldClick: (finding: Finding) => void;
  selectedField?: string;
}

export function SystemFeedbackPanel({ 
  findings, 
  activePillar, 
  onPillarChange, 
  onFieldClick,
  selectedField 
}: SystemFeedbackPanelProps) {
  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'good': return <CheckCircle className="w-4 h-4 text-status-good" />;
      case 'track': return <Clock className="w-4 h-4 text-status-track" />;
      case 'needs': return <AlertTriangle className="w-4 h-4 text-status-needs" />;
      default: return null;
    }
  };

  const getStatusText = (status: string) => {
    switch (status) {
      case 'good': return 'Good Job!';
      case 'track': return 'On Track!';
      case 'needs': return 'Needs Work!';
      default: return '';
    }
  };

  const getStatusBadgeClass = (status: string) => {
    switch (status) {
      case 'good': return 'bg-status-good-bg text-status-good border-status-good/20';
      case 'track': return 'bg-status-track-bg text-status-track border-status-track/20';
      case 'needs': return 'bg-status-needs-bg text-status-needs border-status-needs/20';
      default: return '';
    }
  };

  const pillarFindings = findings.filter(f => f.pillar === activePillar);
  
  const pillarScores = {
    impact: findings.filter(f => f.pillar === 'impact'),
    presentation: findings.filter(f => f.pillar === 'presentation'),
    competencies: findings.filter(f => f.pillar === 'competencies')
  };

  const getPillarScore = (pillar: ActivePillar) => {
    const pillarF = pillarScores[pillar];
    const total = pillarF.length * 10; // Assuming max 10 per field
    const current = pillarF.reduce((acc, f) => {
      switch (f.status) {
        case 'good': return acc + 10;
        case 'track': return acc + 7;
        case 'needs': return acc + 3;
        default: return acc;
      }
    }, 0);
    return { current, total };
  };

  const formatFieldName = (fieldKey: string) => {
    return fieldKey.replace(/([A-Z])/g, ' $1').replace(/^./, str => str.toUpperCase());
  };

  return (
    <div className="flex flex-col h-full">
      <Tabs value={activePillar} onValueChange={(value) => onPillarChange(value as ActivePillar)} className="h-full">
        <TabsList className="grid w-full grid-cols-3 bg-muted/30">
          <TabsTrigger value="impact" className="data-[state=active]:bg-card">
            Impact ({getPillarScore('impact').current}/{getPillarScore('impact').total})
          </TabsTrigger>
          <TabsTrigger value="presentation" className="data-[state=active]:bg-card">
            Presentation ({getPillarScore('presentation').current}/{getPillarScore('presentation').total})
          </TabsTrigger>
          <TabsTrigger value="competencies" className="data-[state=active]:bg-card">
            Competencies ({getPillarScore('competencies').current}/{getPillarScore('competencies').total})
          </TabsTrigger>
        </TabsList>

        <TabsContent value="impact" className="flex-1 mt-4">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Focuses on the quality of content and its impact on recruiters.
            </div>
            {pillarFindings.map((finding) => (
              <Card 
                key={finding.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedField === finding.fieldKey && "ring-2 ring-vmock-blue"
                )}
                onClick={() => onFieldClick(finding)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(finding.status)}
                      <div>
                        <div className="font-medium">{formatFieldName(finding.fieldKey)}</div>
                        <div className="text-sm text-muted-foreground">
                          {finding.messages[0]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadgeClass(finding.status)}>
                        {getStatusText(finding.status)}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="presentation" className="flex-1 mt-4">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Focuses on whether your resume is in sync with format requirements.
            </div>
            {pillarFindings.map((finding) => (
              <Card 
                key={finding.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedField === finding.fieldKey && "ring-2 ring-vmock-blue"
                )}
                onClick={() => onFieldClick(finding)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(finding.status)}
                      <div>
                        <div className="font-medium">{formatFieldName(finding.fieldKey)}</div>
                        <div className="text-sm text-muted-foreground">
                          {finding.messages[0]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadgeClass(finding.status)}>
                        {getStatusText(finding.status)}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>

        <TabsContent value="competencies" className="flex-1 mt-4">
          <div className="space-y-3">
            <div className="text-sm text-muted-foreground">
              Assesses how well you have reflected your 5 core competencies.
            </div>
            {pillarFindings.map((finding) => (
              <Card 
                key={finding.id}
                className={cn(
                  "cursor-pointer transition-all hover:shadow-md",
                  selectedField === finding.fieldKey && "ring-2 ring-vmock-blue"
                )}
                onClick={() => onFieldClick(finding)}
              >
                <CardContent className="p-4">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      {getStatusIcon(finding.status)}
                      <div>
                        <div className="font-medium">{formatFieldName(finding.fieldKey)}</div>
                        <div className="text-sm text-muted-foreground">
                          {finding.messages[0]}
                        </div>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getStatusBadgeClass(finding.status)}>
                        {getStatusText(finding.status)}
                      </Badge>
                      <ChevronRight className="w-4 h-4 text-muted-foreground" />
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </TabsContent>
      </Tabs>
    </div>
  );
}