import { Suspense } from "react";
import ProfileContent from "@/components/ProfileContent";
import Loading from "./loading";

export default function ProfilePage() {
  return (
    <Suspense fallback={<Loading />}>
      <ProfileContent />
    </Suspense>
  );
}
