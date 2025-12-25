import { Button } from "@/components/ui/button";
import Link from "next/link";

export default function Home() {
  return (
    <>
      <main className="flex min-h-screen flex-col items-center  p-24">
        <h1 className="text-5xl py-10 font-semibold text-purple-500">
          welcome to stremify
        </h1>
        <Link href="/movies">
          <Button size="lg" className="h-12 gap-1">
            <span className=" text-lg ">Explore Movies</span>
          </Button>
        </Link>
      </main>
    </>
  );
}
