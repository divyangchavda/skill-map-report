export interface Resume {
  id: string;
  name: string;
  uploadedAt: string;
  pages: number;
  fileUrl?: string;
  textContent: string;
}

export interface Span {
  id: string;
  page: number;
  blockId?: string;
  charStart?: number;
  charEnd?: number;
  text: string;
}

export type FieldStatus = 'good' | 'track' | 'needs';

export interface Finding {
  id: string;
  pillar: 'impact' | 'presentation' | 'competencies';
  fieldKey: string;
  status: FieldStatus;
  scoreDelta?: number;
  messages: string[];
  spans: Span[];
}

export interface Pillar {
  id: string;
  type: 'impact' | 'presentation' | 'competencies';
  score: number;
  max: number;
  status: FieldStatus;
}

export interface Analysis {
  id: string;
  resumeId: string;
  overallScore: number;
  pillars: Pillar[];
  findings: Finding[];
}

export interface PipelineStep {
  key: string;
  label: string;
  status: 'done' | 'active' | 'todo';
}

export interface UploadQuota {
  remaining: number;
}

export interface InsightItem {
  icon: string;
  text: string;
}

export type ActiveTab = 'summary' | 'system' | 'bullet';
export type ActivePillar = 'impact' | 'presentation' | 'competencies';