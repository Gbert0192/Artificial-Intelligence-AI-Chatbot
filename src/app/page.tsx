"use client";
import { Button } from "@/components/ui/button";
import { Bot } from "lucide-react";
import { useRouter } from "next/navigation";
import { Typewriter } from "react-simple-typewriter";

export default function Home() {
  const router = useRouter();
  return (
    <div className="min-h-screen flex items-center justify-center px-4 md:px-8 lg:px-16 flex-col text-center space-y-6 bg-white">
      <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold leading-snug">
        <Typewriter
          words={["Hello...", "Welcome to our AI!", "Powered by Gemini API"]}
          loop={0}
          cursor
          cursorStyle="|"
          typeSpeed={70}
          deleteSpeed={50}
          delaySpeed={1000}
        />
      </h1>

      <p className="text-base sm:text-lg md:text-xl text-gray-600 max-w-xl">
        Enjoy chatting with our smart assistant — intelligent, fast, and
        friendly!
      </p>

      <Button
        className="w-40 h-18 sm:w-48 md:w-56 text-base sm:text-lg"
        onClick={() => {
          router.push("/chatbot");
        }}
      >
        <Bot className="text-white size-6" />
        Lets Get Started
      </Button>
    </div>
  );
}
