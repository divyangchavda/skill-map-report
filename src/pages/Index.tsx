import { useState, useEffect } from "react";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { DashboardHeader } from "@/components/dashboard/DashboardHeader";
import { UploadModal } from "@/components/dashboard/UploadModal";
import { ProcessingView } from "@/components/dashboard/ProcessingView";
import { SummaryPanel } from "@/components/dashboard/SummaryPanel";
import { SystemFeedbackPanel } from "@/components/dashboard/SystemFeedbackPanel";
import { ResumeViewer } from "@/components/dashboard/ResumeViewer";
import { 
  ActiveTab, 
  ActivePillar, 
  Resume, 
  Analysis, 
  PipelineStep, 
  Finding,
  Span 
} from "@/types/resume";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [activeTab, setActiveTab] = useState<ActiveTab>('summary');
  const [activePillar, setActivePillar] = useState<ActivePillar>('impact');
  const [uploadModalOpen, setUploadModalOpen] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [selectedField, setSelectedField] = useState<string | undefined>();
  const [highlightedSpans, setHighlightedSpans] = useState<Span[]>([]);
  const { toast } = useToast();

  // Mock data
  const uploadQuota = 5;
  const [currentResume] = useState<Resume>({
    id: "1",
    name: "Divyang Chavda Resume",
    uploadedAt: "August 10th 2025 at 6:03 PM",
    pages: 2,
    textContent: `Divyang Jitendrabhai Chavda
Passionate tech enthusiast with a strong background in software development, website development, and AI-powered tools. Skilled in developing robust web platforms and solving real-world problems using open-source and cloud technologies. Always eager to learn, experiment, and stay ahead in the evolving tech landscape.

📧 chavdadivyang7373@gmail.com  📱 +91 9687131427  📍 Pune  🐙 divyangchavda  💼 divyang-chavda-92241015b

WORK EXPERIENCE
Sumago Infotech Pvt. Ltd.                                                                Sep,2024 - March,2025
Software Engineer Trainee

• Focused on full-stack development using the MERN stack, including frontend interfaces with React.js and backend services with Node.js and Express.
• Gained hands-on experience in designing RESTful APIs, integrating MongoDB databases, and deploying applications on cloud platforms.
• Implemented features like user authentication, role-based access, and responsive UI components aligned with modern development standards.
• Followed Agile methodologies for planning and task management, ensuring consistent progress and code quality throughout the internship.

EDUCATION
Sri Balaji University, Pune.                                                           july,2023 - May,2025
Master of Computer Application(MCA) - 8.29 CGPA

Bhagwan Mahavir University, Surat.                                                     August ,2020 -June 2023
Bachelor of Computer Application(BCA) - 8.08 CGPA

Government High School, Surat.                                                         june ,2018 -May 2020
Higher Secondary Certificate (HSC) - 85.84%`
  });

  const [currentAnalysis] = useState<Analysis>({
    id: "1",
    resumeId: "1",
    overallScore: 68,
    pillars: [
      { id: "1", type: 'impact', score: 28, max: 40, status: 'good' },
      { id: "2", type: 'presentation', score: 23, max: 30, status: 'good' },
      { id: "3", type: 'competencies', score: 17, max: 30, status: 'track' }
    ],
    findings: [
      {
        id: "1",
        pillar: 'impact',
        fieldKey: 'actionOriented',
        status: 'good',
        messages: ['You have done a good job of using action-oriented language in your resume'],
        spans: [
          { id: 'action-1', page: 1, text: 'Focused on', charStart: 580, charEnd: 590 },
          { id: 'action-2', page: 1, text: 'Gained hands-on', charStart: 750, charEnd: 765 },
          { id: 'action-3', page: 1, text: 'Implemented', charStart: 890, charEnd: 901 },
          { id: 'action-4', page: 1, text: 'Followed', charStart: 1050, charEnd: 1058 }
        ]
      },
      {
        id: "2",
        pillar: 'impact',
        fieldKey: 'specifics',
        status: 'track',
        messages: ['Add more specific details and metrics to strengthen your impact'],
        spans: [
          { id: 'specific-1', page: 1, text: 'MERN stack', charStart: 620, charEnd: 630 },
          { id: 'specific-2', page: 1, text: '8.29 CGPA', charStart: 1380, charEnd: 1389 }
        ]
      },
      {
        id: "3",
        pillar: 'presentation',
        fieldKey: 'numberOfPages',
        status: 'good',
        messages: ['Your resume meets the standard guidelines for the number of pages.'],
        spans: []
      },
      {
        id: "4",
        pillar: 'presentation',
        fieldKey: 'overallFormat',
        status: 'needs',
        messages: ['Improve overall formatting for better readability'],
        spans: []
      },
      {
        id: "5",
        pillar: 'competencies',
        fieldKey: 'analytical',
        status: 'good',
        messages: ['You are doing a great job reflecting your analytical skills!'],
        spans: [
          { id: 'analytical-1', page: 1, text: 'solving real-world problems', charStart: 180, charEnd: 205 },
          { id: 'analytical-2', page: 1, text: 'designing RESTful APIs', charStart: 780, charEnd: 802 }
        ]
      },
      {
        id: "6",
        pillar: 'competencies',
        fieldKey: 'communication',
        status: 'track',
        messages: ['Add more examples showcasing communication skills'],
        spans: []
      }
    ]
  });

  const [processingSteps] = useState<PipelineStep[]>([
    { key: 'initializing', label: 'Initializing', status: 'done' },
    { key: 'processing', label: 'Processing', status: 'done' },
    { key: 'identifyingContent', label: 'Identifying content', status: 'done' },
    { key: 'benchmarking', label: 'Benchmarking', status: 'done' },
    { key: 'identifyingSections', label: 'Identifying sections', status: 'done' },
    { key: 'identifyingBullets', label: 'Identifying bullets', status: 'active' },
    { key: 'identifyingPastExperiences', label: 'Identifying past experiences', status: 'todo' },
    { key: 'analyzingBullets', label: 'Analyzing bullets', status: 'todo' },
    { key: 'analyzingImpact', label: 'Analyzing impact', status: 'todo' },
    { key: 'benchmarkingSkills', label: 'Benchmarking skills', status: 'todo' },
    { key: 'calculatingScores', label: 'Calculating scores', status: 'todo' },
    { key: 'almostDone', label: 'Almost done', status: 'todo' }
  ]);

  const existingResumes = [
    {
      id: "1",
      name: "Divyang Chavda Resume.pdf",
      uploadedAt: "August 9, 2025",
      module: "Resume"
    }
  ];

  const insights = [
    { icon: "chart", text: "Resumes are observed to secure, on average, a score of 74 on the VMock platform" },
    { icon: "trend", text: "16 is the surge in score observed for users once they incorporate VMock feedback" },
    { icon: "skill", text: "Analytical skill is the highest reflected skill in resumes of VMock users" }
  ];

  const handleUpload = (file: File) => {
    setUploadModalOpen(false);
    setIsProcessing(true);
    
    toast({
      title: "Resume uploaded successfully",
      description: `Processing ${file.name}...`,
    });

    // Simulate processing
    setTimeout(() => {
      setIsProcessing(false);
      setActiveTab('summary');
      toast({
        title: "Analysis complete!",
        description: "Your resume has been analyzed successfully.",
      });
    }, 3000);
  };

  const handleFieldClick = (finding: Finding) => {
    setSelectedField(finding.fieldKey);
    setHighlightedSpans(finding.spans);
  };

  const handlePillarClick = (pillar: ActivePillar) => {
    setActiveTab('system');
    setActivePillar(pillar);
  };

  if (isProcessing) {
    return (
      <div className="min-h-screen bg-background">
        <DashboardHeader 
          onUploadClick={() => setUploadModalOpen(true)} 
          uploadQuota={uploadQuota}
        />
        <ProcessingView 
          steps={processingSteps}
          resumeName={currentResume.name}
          uploadedAt={currentResume.uploadedAt}
        />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background flex flex-col overflow-hidden">
      <DashboardHeader 
        onUploadClick={() => setUploadModalOpen(true)} 
        uploadQuota={uploadQuota}
      />
      
      <div className="flex-1 flex overflow-hidden">
        {/* Left Panel */}
        <div className="w-1/2 border-r border-border flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border">
            <h2 className="text-lg font-semibold">Resume Module</h2>
          </div>
          
          <Tabs value={activeTab} onValueChange={(value) => setActiveTab(value as ActiveTab)} className="flex-1 flex flex-col">
            <TabsList className="grid w-full grid-cols-3 bg-muted/30 m-4">
              <TabsTrigger value="summary">Summary</TabsTrigger>
              <TabsTrigger value="system">System Feedback</TabsTrigger>
              <TabsTrigger value="bullet">Bullet Level Feedback</TabsTrigger>
            </TabsList>

            <div className="flex-1 overflow-auto">
              <TabsContent value="summary" className="mt-0">
                <SummaryPanel 
                  overallScore={currentAnalysis.overallScore}
                  pillars={currentAnalysis.pillars}
                  insights={insights}
                  onPillarClick={handlePillarClick}
                />
              </TabsContent>

              <TabsContent value="system" className="mt-0 p-4">
                <SystemFeedbackPanel
                  findings={currentAnalysis.findings}
                  activePillar={activePillar}
                  onPillarChange={setActivePillar}
                  onFieldClick={handleFieldClick}
                  selectedField={selectedField}
                />
              </TabsContent>

              <TabsContent value="bullet" className="mt-0 p-4">
                <div className="text-center text-muted-foreground py-8">
                  Bullet Level Feedback coming soon...
                </div>
              </TabsContent>
            </div>
          </Tabs>
        </div>

        {/* Right Panel - Resume Viewer */}
        <div className="w-1/2 flex flex-col overflow-hidden">
          <div className="p-4 border-b border-border">
            <div className="flex justify-between items-center">
              <h3 className="font-semibold">{currentResume.name}</h3>
              <span className="text-sm text-muted-foreground">
                Pages used: {currentResume.pages}
              </span>
            </div>
          </div>
          
          <div className="flex-1 p-4 overflow-hidden">
            <ResumeViewer 
              content={currentResume.textContent}
              highlightedSpans={highlightedSpans}
              className="h-full"
            />
          </div>
        </div>
      </div>

      {/* Community Insights Sidebar */}
      <div className="absolute right-4 top-20 w-80 bg-card border border-border rounded-lg p-4 shadow-lg">
        <h4 className="font-semibold mb-3">Community Insights</h4>
        <div className="space-y-3 text-sm">
          {insights.map((insight, index) => (
            <div key={index} className="flex gap-3">
              <div className="w-6 h-6 rounded bg-blue-50 flex items-center justify-center flex-shrink-0">
                <div className="w-3 h-3 bg-vmock-blue rounded"></div>
              </div>
              <div className="text-muted-foreground">{insight.text}</div>
            </div>
          ))}
        </div>
      </div>

      <UploadModal
        open={uploadModalOpen}
        onClose={() => setUploadModalOpen(false)}
        onUpload={handleUpload}
        uploadQuota={uploadQuota}
        existingResumes={existingResumes}
      />
    </div>
  );
};

export default Index;