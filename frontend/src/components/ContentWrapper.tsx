import { cn } from "@/lib/utils";

interface Props {
  children: React.ReactNode;
  className?: string;
}

const ContentWrapper = ({ children, className }: Props) => {
  return (
    <div
      className={cn(
        "w-full max-w-[1200px] my-0 mx-auto px-[10px] md:px-0",
        className
      )}
    >
      {children}
    </div>
  );
};
export default ContentWrapper;
