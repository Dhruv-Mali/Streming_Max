import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";

type CardComponentProps = {
  title: string;
  description: string;
  children: React.ReactNode;
};

export function CardComponent({
  title,
  description,
  children,
}: CardComponentProps) {
  return (
    <Card className="mx-auto max-w-sm shadow-xl border-purple-500/20 hover:shadow-2xl hover:shadow-purple-500/20 transition-all duration-300">
      <CardHeader className="space-y-2">
        <CardTitle className="text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">{title}</CardTitle>
        <CardDescription className="text-base">{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
