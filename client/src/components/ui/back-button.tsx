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
  label = "Back to Feed",
  className = "mb-4",
}: BackButtonProps) => {
  const navigate = useNavigate();

  return (
    <Button
      variant="ghost"
      onClick={() => navigate(to)}
      className={`hover:bg-gray-200 transition-colors duration-200 ${className}`}
    >
      <ArrowLeft className="w-4 h-4 mr-2" />
      {label}
    </Button>
  );
};

export default BackButton;
