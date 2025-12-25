"use client";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button } from "@/components/ui/button";
import { UserToolTip } from "./UserTooltip";
import { useAuthStore } from "@/components/AuthProvider";
import { Film, Sparkles } from "lucide-react";

export function Navbar() {
  const pathname = usePathname();
  const isLoggedIn = useAuthStore((state) => state.isLoggedIn);

  return (
    <div className="fixed z-50 top-0 left-0 right-0 flex h-16 items-center border-b bg-background/80 backdrop-blur-xl px-5 md:px-10 shadow-sm">
      <nav className="flex items-center gap-6 text-lg font-medium md:gap-5 md:text-sm lg:gap-6">
        <Link
          href="/"
          className="flex items-center gap-2 text-lg font-semibold md:text-base group"
        >
          <div className="p-1.5 rounded-lg bg-gradient-to-br from-purple-600 to-violet-600 group-hover:from-purple-700 group-hover:to-violet-700 transition-all duration-300">
            <Film className="h-5 w-5 text-white" />
          </div>
          <h1 className="font-bold text-2xl bg-gradient-to-r from-purple-600 to-violet-600 bg-clip-text text-transparent">
            Stremify
          </h1>
        </Link>
      </nav>
      <div className="flex w-full items-center justify-end gap-4 md:gap-2 lg:gap-4">
        {isLoggedIn ? (
          <UserToolTip />
        ) : (
          <Link href={pathname === "/signin" ? "/signup" : "/signin"}>
            <Button className="px-6 text-md font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-lg shadow-purple-500/30 transition-all duration-300 hover:scale-105">
              {pathname === "/signin" ? "Sign Up" : "Sign In"}
            </Button>
          </Link>
        )}
      </div>
    </div>
  );
}
