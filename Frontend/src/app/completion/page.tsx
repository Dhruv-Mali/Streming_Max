import { Suspense } from "react";
import CompletionContent from "./CompletionContent";

export default function CompletionPage() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <CompletionContent />
    </Suspense>
  );
}
