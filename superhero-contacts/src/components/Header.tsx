import React, { useEffect, useState } from "react";

const Header: React.FC   = () => {
  const [time, setTime] = useState("");

  useEffect(() => {
    const updateClock = () => {
      setTime(
        new Date().toLocaleString("en-US", {
          year: "numeric",
          month: "2-digit",
          day: "2-digit",
          hour: "2-digit",
          minute: "2-digit",
          second: "2-digit",
          hour12: false,
        })
      );
    };

    updateClock();
    const interval = setInterval(updateClock, 1000);
    return () => clearInterval(interval);
  }, []);

  return (
    <header
      className="
        sticky top-0 z-50 
        w-full border-b border-gov-cyan/70 
        bg-gov-blue/70 backdrop-blur-md 
        shadow-lg
      "
      role="banner"
      aria-label="Superhero Database Header"
    >
      <div className="flex justify-center py-4 sm:py-5">
        <div className="w-[80vw] sm:w-[85vw] lg:w-[70vw] flex items-center justify-between gap-6">
          {/* Title Section */}
          <div className="flex-1 min-w-0">
            <h1
              className="
                text-xl sm:text-3xl md:text-4xl 
                font-orbitron font-bold text-gov-cyan 
                glitch truncate
              "
              title="Superhero Database"
            >
              SUPERHERO DATABASE
            </h1>
            <p
              className="
                text-[10px] sm:text-xs 
                text-gov-green/70 uppercase tracking-widest 
                truncate
              "
            >
              Classified // Top Secret
            </p>
          </div>
          {/* Status & Time */}
          <div className="text-right font-mono flex-shrink-0">
            <p className="text-sm sm:text-base text-gov-green">
              <span className="hidden sm:inline">STATUS: </span>
              <span className="text-gov-cyan font-bold animate-blink">
                ACTIVE
              </span>
            </p>
            <p className="text-[10px] sm:text-xs text-gov-green/60 mt-1">
              {time}
            </p>
          </div>
        </div>
      </div>

      {/* 🔹 Full-width bottom line */}
      <div className="w-full h-[2px] py-50 bg-gradient-to-r from-gov-cyan via-gov-green to-gov-cyan shadow-[0_0_10px_#00ffff]" />
    </header>
  );
};

export default Header;
