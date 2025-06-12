import Image from "next/image";
import React from "react";

export default function Banner() {
  return (
    <div>
      <div className="relative w-full h-[500px]">
        {/* Background Image */}
        <Image
          src="/banner.png"
          alt="Hero Banner"
          fill
          className="object-cover"
          priority
        />

        {/* Overlay */}
        <div className="absolute inset-0 bg-black/10" />

        {/* Text Content */}
        <div className="absolute inset-0 flex flex-col items-left justify-center  pl-4 w-1/2">
          <h1 className="text-4xl md:text-6xl font-bold">
            Welcome to Gadget
          </h1>
          <p className="mt-4 text-lg md:text-xl max-w-xl font-semibold">
            Honest Reviews. Smart Tech Choices. Everything You Need to Know.
          </p>
        </div>
      </div>
    </div>
  );
}
