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
    <Card className="mx-auto max-w-sm ">
      <CardHeader>
        <CardTitle className="text-2xl">{title}</CardTitle>
        <CardDescription>{description}</CardDescription>
      </CardHeader>
      <CardContent>{children}</CardContent>
    </Card>
  );
}
