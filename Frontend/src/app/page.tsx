import { Button } from "@/components/ui/button";
import Link from "next/link";
import { Play, Film, Sparkles } from "lucide-react";

export default function Home() {
  return (
    <main className="relative min-h-screen overflow-hidden">
      {/* Animated Background */}
      <div className="absolute inset-0 bg-gradient-to-br from-purple-900 via-violet-800 to-indigo-900">
        <div className="absolute inset-0 bg-[url('data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNjAiIGhlaWdodD0iNjAiIHZpZXdCb3g9IjAgMCA2MCA2MCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48ZyBmaWxsPSJub25lIiBmaWxsLXJ1bGU9ImV2ZW5vZGQiPjxnIGZpbGw9IiNmZmZmZmYiIGZpbGwtb3BhY2l0eT0iMC4wNSI+PHBhdGggZD0iTTM2IDE2YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00em0wIDI0YzAtMi4yMSAxLjc5LTQgNC00czQgMS43OSA0IDQtMS43OSA0LTQgNC00LTEuNzktNC00ek0xMiAxNmMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHptMCAyNGMwLTIuMjEgMS43OS00IDQtNHM0IDEuNzkgNCA0LTEuNzkgNC00IDQtNC0xLjc5LTQtNHoiLz48L2c+PC9nPjwvc3ZnPg==')] opacity-30"></div>
      </div>

      {/* Hero Content */}
      <div className="relative z-10 flex min-h-screen flex-col items-center justify-center px-4 text-center">
        {/* Badge */}
        <div className="mb-8 hero-fade-down">
          <div className="inline-flex items-center gap-2 rounded-full bg-white/10 backdrop-blur-sm px-4 py-2 text-sm text-white border border-white/20">
            <Sparkles className="h-4 w-4 text-yellow-300" />
            <span>Premium Streaming Experience</span>
          </div>
        </div>

        {/* Main Heading */}
        <h1 className="mb-6 text-6xl md:text-8xl font-bold text-white hero-fade-up">
          Welcome to
          <span className="block bg-gradient-to-r from-purple-400 via-pink-400 to-violet-400 bg-clip-text text-transparent">
            Stremify
          </span>
        </h1>

        {/* Subtitle */}
        <p className="mb-12 max-w-2xl text-xl md:text-2xl text-gray-200 hero-fade">
          Stream unlimited movies and shows. Watch anywhere, anytime.
          <span className="block mt-2 text-purple-300">Your entertainment, your way.</span>
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 hero-fade-up">
          <Link href="/movies">
            <Button size="lg" className="h-14 px-8 text-lg font-semibold bg-gradient-to-r from-purple-600 to-violet-600 hover:from-purple-700 hover:to-violet-700 shadow-2xl shadow-purple-500/50 transition-all duration-300 hover:scale-105">
              <Play className="mr-2 h-5 w-5" />
              Explore Movies
            </Button>
          </Link>
          <Link href="/pricing">
            <Button size="lg" variant="outline" className="h-14 px-8 text-lg font-semibold bg-white/10 backdrop-blur-sm border-white/30 text-white hover:bg-white/20 transition-all duration-300 hover:scale-105">
              <Film className="mr-2 h-5 w-5" />
              View Plans
            </Button>
          </Link>
        </div>

        {/* Features */}
        <div className="mt-20 grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl hero-fade">
          <FeatureCard 
            icon="🎬" 
            title="Unlimited Content" 
            description="Access thousands of movies and shows"
          />
          <FeatureCard 
            icon="📱" 
            title="Watch Anywhere" 
            description="Stream on any device, anytime"
          />
          <FeatureCard 
            icon="⚡" 
            title="HD Quality" 
            description="Crystal clear streaming experience"
          />
        </div>
      </div>
    </main>
  );
}

function FeatureCard({ icon, title, description }: { icon: string; title: string; description: string }) {
  return (
    <div className="group p-6 rounded-2xl bg-white/5 backdrop-blur-sm border border-white/10 hover:bg-white/10 transition-all duration-300 hover:scale-105 hover:shadow-xl hover:shadow-purple-500/20">
      <div className="text-4xl mb-3">{icon}</div>
      <h3 className="text-xl font-semibold text-white mb-2">{title}</h3>
      <p className="text-gray-300">{description}</p>
    </div>
  );
}
