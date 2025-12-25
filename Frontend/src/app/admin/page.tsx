import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Page() {
  return (
    <div className="flex flex-col px-5 md:px-10  mt-20">
      <h1 className="text-2xl font-semibold my-5">Admin Dashboard</h1>
      <Link href="/admin/movie">
        <Button>Manage Movies</Button>
      </Link>
    </div>
  );
}
