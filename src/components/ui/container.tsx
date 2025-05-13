
import { cn } from "@/lib/utils";

interface ContainerProps extends React.HTMLAttributes<HTMLDivElement> {
  children: React.ReactNode;
  className?: string;
}

export function Container({ children, className, ...props }: ContainerProps) {
  return (
    <div
      className={cn("w-full px-4 mx-auto max-w-7xl sm:px-6 lg:px-8", className)}
      {...props}
    >
      {children}
    </div>
  );
}
