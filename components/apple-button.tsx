import { Button } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const appleButtonClass =
  "h-11 cursor-pointer rounded-full bg-[#007aff] px-5 text-[17px] font-normal tracking-[-0.012em] text-white hover:bg-[#0066d6] active:translate-y-0 dark:bg-[#0a84ff] dark:hover:bg-[#409cff]";

export function AppleButton({
  className,
  ...props
}: React.ComponentProps<typeof Button>) {
  return <Button className={cn(appleButtonClass, className)} {...props} />;
}
