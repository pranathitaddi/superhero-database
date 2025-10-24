import React, { useState, useEffect } from "react";
import type { KeyboardEvent, ChangeEvent, SyntheticEvent } from "react";
import { searchHeroes, type Hero } from "../services/api";

interface AddContactFormProps {
  onClose: () => void;
  onAdd: (hero: Hero) => void;
}

const AddContactForm: React.FC<AddContactFormProps> = ({ onClose, onAdd }) => {
  const [searchTerm, setSearchTerm] = useState<string>("");
  const [searchResults, setSearchResults] = useState<Hero[]>([]);
  const [isSearching, setIsSearching] = useState<boolean>(false);

  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape as unknown as EventListener);
    return () => document.removeEventListener("keydown", handleEscape as unknown as EventListener);
  }, [onClose]);

  const handleSearch = async (): Promise<void> => {
    if (!searchTerm.trim()) return;

    setIsSearching(true);
    const results = await searchHeroes(searchTerm);
    setSearchResults(results);
    setIsSearching(false);
  };

  const handleKeyPress = (e: KeyboardEvent<HTMLInputElement>): void => {
    if (e.key === "Enter") {
      handleSearch();
    }
  };

  const handleAddHero = (hero: Hero): void => {
    onAdd(hero);
    onClose();
  };

  const handleInputChange = (e: ChangeEvent<HTMLInputElement>): void => {
    setSearchTerm(e.target.value);
  };

  const handleImageError = (e: SyntheticEvent<HTMLImageElement, Event>): void => {
    e.currentTarget.src = "https://via.placeholder.com/80x120?text=NO+IMAGE";
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-4">
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
      />

      <div className="relative bg-gov-dark border-2 sm:border-4 border-gov-cyan max-w-4xl w-full max-h-[95vh] sm:max-h-[90vh] overflow-y-auto shadow-[0_0_50px_rgba(0,255,255,0.5)]">
        {/* Header */}
        <div className="sticky top-0 bg-gov-blue/90 border-b-2 border-gov-cyan px-3 sm:px-6 py-3 sm:py-4 flex justify-between items-center backdrop-blur-sm z-10">
          <div className="min-w-0 flex-1 mr-2">
            <h2 className="text-lg sm:text-2xl font-orbitron font-bold text-gov-cyan truncate">
              ADD NEW SUBJECT
            </h2>
            <p className="text-[10px] sm:text-xs text-gov-green/70 mt-1 hidden sm:block">
              SEARCH DATABASE FOR SUBJECT TO ADD TO WATCHLIST
            </p>
          </div>
          <button
            onClick={onClose}
            className="text-gov-cyan hover:text-gov-green text-xl sm:text-2xl font-bold flex-shrink-0"
          >
            ✕
          </button>
        </div>

        <div className="p-3 sm:p-6">
          {/* Search Input */}
          <div className="mb-4 sm:mb-6">
            <label className="block text-xs sm:text-sm text-gov-green/70 font-mono mb-2">
              SEARCH BY NAME:
            </label>
            <div className="flex flex-col sm:flex-row gap-2 sm:gap-3">
              <input
                type="text"
                value={searchTerm}
                onChange={handleInputChange}
                onKeyPress={handleKeyPress}
                placeholder="Enter superhero name..."
                className="flex-1 bg-gov-blue/50 border-2 border-gov-cyan text-gov-green px-3 sm:px-4 py-2 sm:py-3 font-mono text-sm sm:text-base focus:outline-none focus:border-gov-green focus:shadow-[0_0_20px_rgba(0,255,65,0.5)] transition-all"
              />
              <button
                onClick={handleSearch}
                disabled={isSearching}
                className="bg-gov-cyan text-gov-dark px-6 sm:px-8 py-2 sm:py-3 font-bold hover:bg-gov-green transition-colors disabled:opacity-50 disabled:cursor-not-allowed whitespace-nowrap text-sm sm:text-base"
              >
                {isSearching ? "SEARCHING..." : "SEARCH"}
              </button>
            </div>
          </div>

          {/* Search Results */}
          {isSearching && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gov-cyan font-mono text-base sm:text-lg animate-blink">
                SCANNING DATABASE...
              </div>
            </div>
          )}

          {!isSearching && searchResults.length > 0 && (
            <div>
              <div className="text-gov-green/70 font-mono text-xs sm:text-sm mb-3 sm:mb-4">
                FOUND {searchResults.length} RESULT(S):
              </div>
              <div className="grid sm:grid-cols-2 gap-3 sm:gap-4 max-h-96 overflow-y-auto">
                {searchResults.map((hero) => (
                  <div
                    key={hero.id}
                    className="bg-gov-blue/30 border-2 border-gov-cyan/50 hover:border-gov-cyan p-3 sm:p-4 cursor-pointer transition-all hover:shadow-[0_0_20px_rgba(0,255,255,0.3)]"
                  >
                    <div className="flex gap-3 sm:gap-4">
                      <img
                        src={
                          hero.images?.sm ||
                          hero.images?.xs ||
                          "https://via.placeholder.com/80x120?text=NO+IMAGE"
                        }
                        alt={hero.name}
                        className="w-16 h-24 sm:w-20 sm:h-30 object-cover border border-gov-cyan/50 flex-shrink-0"
                        onError={handleImageError}
                      />
                      <div className="flex-1 min-w-0">
                        <div className="text-gov-cyan font-bold mb-1 text-sm sm:text-base truncate">
                          {hero.name}
                        </div>
                        <div className="text-gov-green text-xs sm:text-sm mb-2 truncate">
                          {hero.biography?.fullName || "Unknown"}
                        </div>
                        <div className="text-[10px] sm:text-xs text-gov-green/50 truncate">
                          {hero.biography?.publisher || "Unknown Publisher"}
                        </div>
                      </div>
                    </div>
                    <button
                      onClick={(e) => {
                        e.stopPropagation();
                        handleAddHero(hero);
                      }}
                      className="w-full mt-3 bg-gov-cyan/20 border border-gov-cyan text-gov-cyan py-2 text-xs sm:text-sm font-bold hover:bg-gov-cyan hover:text-gov-dark transition-all"
                    >
                      + ADD TO WATCHLIST
                    </button>
                  </div>
                ))}
              </div>
            </div>
          )}

          {!isSearching && searchTerm && searchResults.length === 0 && (
            <div className="text-center py-8 sm:py-12">
              <div className="text-gov-green/50 font-mono text-sm sm:text-base">
                NO SUBJECTS FOUND MATCHING QUERY
              </div>
              <div className="text-gov-cyan/50 text-xs sm:text-sm mt-2">
                TRY A DIFFERENT SEARCH TERM
              </div>
            </div>
          )}

          {!searchTerm && !isSearching && searchResults.length === 0 && (
            <div className="text-center py-8 sm:py-12 border-2 border-dashed border-gov-cyan/30">
              <div className="text-gov-cyan/70 font-mono text-base sm:text-lg mb-2">
                AWAITING INPUT...
              </div>
              <div className="text-gov-green/50 text-xs sm:text-sm">
                Enter a superhero name to begin search
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="border-t-2 border-gov-cyan bg-gov-blue/50 px-3 sm:px-6 py-3 sm:py-4 text-center">
          <button
            onClick={onClose}
            className="bg-gov-blue/80 border-2 border-gov-cyan text-gov-cyan px-6 sm:px-8 py-2 font-bold hover:bg-gov-cyan hover:text-gov-dark transition-colors text-sm sm:text-base"
          >
            CANCEL
          </button>
        </div>
      </div>
    </div>
  );
};

export default AddContactForm;