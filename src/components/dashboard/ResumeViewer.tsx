import { useEffect, useRef } from "react";
import { Span } from "@/types/resume";
import { cn } from "@/lib/utils";

interface ResumeViewerProps {
  content: string;
  highlightedSpans: Span[];
  className?: string;
}

export function ResumeViewer({ content, highlightedSpans, className }: ResumeViewerProps) {
  const containerRef = useRef<HTMLDivElement>(null);

  const renderContentWithHighlights = () => {
    if (highlightedSpans.length === 0) {
      return content.split('\n').map((line, index) => (
        <div key={index} className="leading-relaxed">
          {line || '\u00A0'}
        </div>
      ));
    }

    const lines = content.split('\n');
    return lines.map((line, lineIndex) => {
      const relevantSpans = highlightedSpans.filter(span => {
        const lineStart = lines.slice(0, lineIndex).join('\n').length + lineIndex;
        const lineEnd = lineStart + line.length;
        return span.charStart !== undefined && span.charEnd !== undefined &&
               span.charStart < lineEnd && span.charEnd > lineStart;
      });

      if (relevantSpans.length === 0) {
        return (
          <div key={lineIndex} className="leading-relaxed">
            {line || '\u00A0'}
          </div>
        );
      }

      // Create highlighted version of the line
      let highlightedLine = line;
      const lineStart = lines.slice(0, lineIndex).join('\n').length + lineIndex;

      // Sort spans by position
      relevantSpans.sort((a, b) => (a.charStart || 0) - (b.charStart || 0));

      let offset = 0;
      relevantSpans.forEach((span) => {
        if (span.charStart === undefined || span.charEnd === undefined) return;
        
        const relativeStart = Math.max(0, span.charStart - lineStart);
        const relativeEnd = Math.min(line.length, span.charEnd - lineStart);
        
        if (relativeStart < relativeEnd) {
          const before = highlightedLine.slice(0, relativeStart + offset);
          const highlighted = highlightedLine.slice(relativeStart + offset, relativeEnd + offset);
          const after = highlightedLine.slice(relativeEnd + offset);
          
          const highlightClass = span.id.includes('good') ? 'bg-status-good-bg text-status-good' :
                                 span.id.includes('track') ? 'bg-status-track-bg text-status-track' :
                                 'bg-status-needs-bg text-status-needs';
          
          highlightedLine = `${before}<mark class="${highlightClass} px-1 rounded">${highlighted}</mark>${after}`;
          offset += `<mark class="${highlightClass} px-1 rounded"></mark>`.length - highlighted.length;
        }
      });

      return (
        <div 
          key={lineIndex} 
          className="leading-relaxed"
          dangerouslySetInnerHTML={{ __html: highlightedLine }}
        />
      );
    });
  };

  return (
    <div 
      ref={containerRef}
      className={cn(
        "bg-white border border-border rounded-lg p-6 overflow-auto text-sm font-mono leading-relaxed",
        className
      )}
      style={{ fontFamily: 'system-ui, -apple-system, sans-serif' }}
    >
      <div className="space-y-1">
        {renderContentWithHighlights()}
      </div>
    </div>
  );
}