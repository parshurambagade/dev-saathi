import { Toaster as Sonner, type ToasterProps } from "sonner";

const Toaster = ({ ...props }: ToasterProps) => {
  return (
    <Sonner
      theme="dark"
      position="bottom-right"
      toastOptions={{
        classNames: {
          toast:
            "group toast !bg-[#1a1f2e] !text-[#f1f5f9] !border !border-[#334155] !shadow-lg !rounded-lg",
          description: "!text-[#94a3b8]",
          actionButton:
            "!bg-[#3b82f6] !text-white hover:!bg-[#2563eb] !rounded-md",
          cancelButton:
            "!bg-[#2a3441] !text-[#e2e8f0] hover:!bg-[#334155] !rounded-md",
          closeButton:
            "!border-[#334155] !bg-[#1a1f2e] !text-[#f1f5f9] hover:!bg-[#2a3441]",
          success: "!bg-[#1a1f2e] !text-[#f1f5f9] !border-[#334155]",
          error: "!bg-[#1a1f2e] !text-[#f1f5f9] !border-[#334155]",
          warning: "!bg-[#1a1f2e] !text-[#f1f5f9] !border-[#334155]",
          info: "!bg-[#1a1f2e] !text-[#f1f5f9] !border-[#334155]",
        },
      }}
      {...props}
    />
  );
};

export { Toaster };
