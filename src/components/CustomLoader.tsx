import { cn } from "@/lib/utils";

type CustomLoaderProps = {
  className?: string;
};

const CustomLoader: React.FC<CustomLoaderProps> = ({ className }) => {
  return (
    <div className={cn("flex items-center justify-center h-screen", className)}>
      <div
        className={cn(
          "animate-spin rounded-full h-32 w-32 border-t-4 border-blue-500",
          className
        )}
      ></div>
    </div>
  );
};

export default CustomLoader;
