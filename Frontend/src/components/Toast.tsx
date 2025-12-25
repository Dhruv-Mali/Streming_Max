import { toast } from "@/components/ui/use-toast";

export function Toast({
  variant,
  title,
  description,
}: {
  variant: "default" | "destructive";
  title: string;
  description: string;
}) {
  toast({
    variant,
    title,
    description,
  });
}
