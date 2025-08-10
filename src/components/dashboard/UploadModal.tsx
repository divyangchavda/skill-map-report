import { useState } from "react";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Search, Upload, X } from "lucide-react";
import { cn } from "@/lib/utils";

interface UploadModalProps {
  open: boolean;
  onClose: () => void;
  onUpload: (file: File) => void;
  uploadQuota: number;
  existingResumes: Array<{
    id: string;
    name: string;
    uploadedAt: string;
    module: string;
  }>;
}

export function UploadModal({ 
  open, 
  onClose, 
  onUpload, 
  uploadQuota,
  existingResumes 
}: UploadModalProps) {
  const [dragActive, setDragActive] = useState(false);
  const [searchQuery, setSearchQuery] = useState("");

  const handleDrag = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (e.type === "dragenter" || e.type === "dragover") {
      setDragActive(true);
    } else if (e.type === "dragleave") {
      setDragActive(false);
    }
  };

  const handleDrop = (e: React.DragEvent) => {
    e.preventDefault();
    e.stopPropagation();
    setDragActive(false);

    const files = e.dataTransfer.files;
    if (files && files[0]) {
      onUpload(files[0]);
    }
  };

  const handleFileInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      onUpload(e.target.files[0]);
    }
  };

  const filteredResumes = existingResumes.filter(resume =>
    resume.name.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <Dialog open={open} onOpenChange={onClose}>
      <DialogContent className="max-w-3xl max-h-[80vh] overflow-hidden">
        <DialogHeader>
          <DialogTitle className="text-xl font-semibold text-vmock-blue">
            Upload new resume to Resume Module
          </DialogTitle>
        </DialogHeader>

        <div className="space-y-6">
          {/* Drop Zone */}
          <div
            className={cn(
              "border-2 border-dashed rounded-lg p-12 text-center transition-colors",
              dragActive 
                ? "border-vmock-blue bg-vmock-blue/5" 
                : "border-border bg-muted/20"
            )}
            onDragEnter={handleDrag}
            onDragLeave={handleDrag}
            onDragOver={handleDrag}
            onDrop={handleDrop}
          >
            <div className="space-y-4">
              <div className="text-2xl font-medium text-muted-foreground">
                Drop your PDF file here
              </div>
              <div className="text-muted-foreground">or</div>
              <div>
                <label htmlFor="file-upload">
                  <Button className="bg-vmock-blue hover:bg-vmock-blue/90">
                    <Upload className="w-4 h-4 mr-2" />
                    Choose a File
                  </Button>
                </label>
                <input
                  id="file-upload"
                  type="file"
                  accept=".pdf"
                  onChange={handleFileInput}
                  className="hidden"
                />
              </div>
              <div className="border border-dashed border-vmock-gray rounded px-3 py-2 text-sm">
                <span className="font-bold text-2xl">{uploadQuota}</span> Upload left
              </div>
            </div>
          </div>

          {/* Recommendation */}
          <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 flex items-start gap-3">
            <div className="w-5 h-5 rounded-full bg-vmock-blue flex items-center justify-center flex-shrink-0 mt-0.5">
              <span className="text-white text-xs font-bold">i</span>
            </div>
            <p className="text-sm text-blue-700">
              We recommend you to incorporate maximum feedback in your resume before every re-upload
            </p>
          </div>

          {/* Existing Resumes */}
          <div className="space-y-4">
            <h3 className="text-lg font-medium text-vmock-blue">
              You can also select from already uploaded resumes
            </h3>
            
            <div className="relative">
              <Search className="w-4 h-4 absolute left-3 top-3 text-muted-foreground" />
              <Input
                placeholder="Search by keyword"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-10"
              />
            </div>

            <div className="border rounded-lg overflow-hidden">
              <div className="bg-muted/50 px-6 py-3 border-b grid grid-cols-3 text-sm font-medium text-muted-foreground">
                <span>Resume Name</span>
                <span>Uploaded on</span>
                <span>Module</span>
              </div>
              
              <div className="max-h-40 overflow-y-auto">
                {filteredResumes.map((resume) => (
                  <div 
                    key={resume.id}
                    className="px-6 py-3 border-b border-border hover:bg-muted/30 cursor-pointer grid grid-cols-3 text-sm"
                  >
                    <span className="font-medium">{resume.name}</span>
                    <span className="text-vmock-orange">{resume.uploadedAt}</span>
                    <span>{resume.module}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
