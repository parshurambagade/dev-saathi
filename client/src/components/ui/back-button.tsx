import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

interface BackButtonProps {
  to?: string;
  label?: string;
  className?: string;
}

const BackButton = ({
  to = "/",
  label = "Back",
  className = "mb-0",
}: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(to)}
      className={`hover:bg-secondary/80 text-muted-foreground hover:text-foreground transition-all duration-300 group cursor-pointer ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-0 group-hover:translate-x-[-2px] transition-transform duration-300 " />
      <span>{label}</span>
    </Button>
  );
};

export default BackButton;
