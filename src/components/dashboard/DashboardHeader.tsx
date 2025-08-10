import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Upload } from "lucide-react";

interface DashboardHeaderProps {
  onUploadClick: () => void;
  uploadQuota: number;
}

export function DashboardHeader({ onUploadClick, uploadQuota }: DashboardHeaderProps) {
  return (
    <header className="h-14 border-b border-border bg-card flex items-center justify-between px-6">
      <div className="flex items-center gap-4">
        <div className="flex items-center gap-2">
          <div className="w-8 h-8 rounded-full bg-vmock-blue text-white flex items-center justify-center font-bold text-sm">
            VM
          </div>
          <span className="font-semibold text-foreground">Student Dashboard</span>
        </div>
      </div>

      <nav className="flex items-center gap-8">
        <a href="#" className="text-primary font-medium border-b-2 border-primary pb-1">
          Resume
        </a>
        <a href="#" className="text-muted-foreground hover:text-foreground">
          Network Feedback
        </a>
      </nav>

      <div className="flex items-center gap-4">
        <Button 
          onClick={onUploadClick}
          className="bg-vmock-blue hover:bg-vmock-blue/90 text-white"
          disabled={uploadQuota === 0}
        >
          <Upload className="w-4 h-4 mr-2" />
          Upload Resume ({uploadQuota} left)
        </Button>
        
        <div className="flex items-center gap-2">
          <span className="text-sm text-muted-foreground">DC</span>
          <Avatar>
            <AvatarFallback>DC</AvatarFallback>
          </Avatar>
          <span className="text-sm font-medium">Divyang Chavda</span>
        </div>
      </div>
    </header>
  );
}