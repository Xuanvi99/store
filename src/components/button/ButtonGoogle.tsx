import { Button } from ".";
import { cn } from "../../utils";

function ButtonGoogle({
  text,
  className,
  onClick,
}: {
  text: string;
  className?: {
    wrap?: string;
    btn?: string;
  };
  onClick?: () => void;
}) {
  return (
    <div
      className={cn("flex justify-center pt-5", className?.wrap)}
      onClick={onClick}
    >
      <Button type="button" variant="outLine-flex" className={className?.btn}>
        <img alt="" srcSet="/google.png" className="w-7" />
        <span className="text-xs">{text}</span>
      </Button>
    </div>
  );
}

export default ButtonGoogle;
