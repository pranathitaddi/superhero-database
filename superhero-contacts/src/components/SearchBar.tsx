import React from "react";
import { Plus } from "lucide-react";

interface SearchBarProps {
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onAddClick: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ searchTerm, onSearchChange, onAddClick }) => {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="w-full space-y-10 font-mono">
      {/* Search Bar Row */}
      <div className="flex flex-col sm:flex-row gap-3 items-stretch sm:items-center animate-fadeInUp rounded-lg">
        {/* Search Input Container */}
        <div className="relative flex-1 group py-10">
          <input
            type="text"
            value={searchTerm}
            onChange={handleInputChange}
            placeholder="SEARCH DATABASE..."
            className="
              w-full
              bg-[#0a0f1e]
              text-[#00ffc6]
              rounded-lg
              pl-4 pr-12
              py-3.5
              text-sm sm:text-base
              border-2 border-[#00ffc6]/40
              shadow-[0_0_10px_rgba(0,255,198,0.15)]
              focus:outline-none
              focus:border-[#00ffff]
              focus:shadow-[0_0_20px_rgba(0,255,255,0.3)]
              hover:border-[#00ffc6]/60
              transition-all duration-300
              placeholder:text-[#00ffc6]/40
              tracking-wider
            "
          />
          {/* Search Icon (commented out) */}
          {/* <div className="absolute right-4 top-1/2 -translate-y-1/2 pointer-events-none">
            <Search 
              className="w-5 h-5 text-[#00ffc6]/60 group-focus-within:text-[#00ffff] group-focus-within:drop-shadow-[0_0_8px_rgba(0,255,255,0.8)] transition-all duration-300" 
            />
          </div> */}
        </div>

        {/* Add Subject Button */}
        <button
          onClick={onAddClick}
          className="
            relative
            flex items-center justify-center gap-2
            bg-gradient-to-r from-[#00ffc6] to-[#00ffff]
            hover:from-[#00ffff] hover:to-[#00ffc6]
            text-[#050712]
            font-bold
            rounded-2xl
            px-6 py-6
            my-10
            text-sm sm:text-base
            shadow-[0_0_20px_rgba(0,255,198,0.4)]
            hover:shadow-[0_0_30px_rgba(0,255,255,0.6)]
            active:scale-95
            transition-all duration-300
            whitespace-nowrap
            tracking-wider
            overflow-hidden
            group
          "
        >
          <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/20 to-transparent -translate-x-full group-hover:translate-x-full transition-transform duration-700"></div>
          <Plus className="w-5 h-5 relative z-10 text-[#050712]" />
          <span className="relative z-10 text-[#050712]">ADD SUBJECT</span>
        </button>
      </div>

      {/* Conditional Query Feedback */}
      {searchTerm && (
        <div className="flex items-center gap-3 text-sm text-[#00ffc6] px-1 animate-fadeInUp">
          <div className="flex gap-1.5">
            <span 
              className="w-2 h-2 bg-[#00ffc6] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,198,0.8)]" 
              style={{ animationDelay: '0ms' }} 
            />
            <span 
              className="w-2 h-2 bg-[#00ffff] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,255,255,0.8)]" 
              style={{ animationDelay: '150ms' }} 
            />
            <span 
              className="w-2 h-2 bg-[#0080ff] rounded-full animate-pulse shadow-[0_0_8px_rgba(0,128,255,0.8)]" 
              style={{ animationDelay: '300ms' }} 
            />
          </div>
          <span className="tracking-wider font-mono animate-gradient bg-gradient-to-r from-[#00ffc6] via-[#00ffff] to-[#0080ff] bg-[length:200%_auto] bg-clip-text text-transparent">
            SEARCHING DATABASE...
          </span>
        </div>
      )}

      <style>{`
        @keyframes fadeInUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }
        .animate-fadeInUp {
          animation: fadeInUp 0.4s ease-out both;
        }
        @keyframes gradientShift {
          0%, 100% {
            background-position: 0% 50%;
          }
          50% {
            background-position: 100% 50%;
          }
        }
        .animate-gradient {
          animation: gradientShift 4s linear infinite;
        }
      `}</style>
    </div>
  );
};

export default SearchBar;