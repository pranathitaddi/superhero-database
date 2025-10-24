import { useState, useEffect } from "react";
import Header from "./components/Header";
import SearchBar from "./components/SearchBar";
import ContactCard from "./components/ContactCard";
import ContactModal from "./components/ContactModal";
import AddContactForm from "./components/AddContactForm";
import { fetchDefaultHeroes, searchHeroes } from "./services/api";
import "./App.css";

function App() {
  const [defaultHeroes, setDefaultHeroes] = useState([]);
  const [displayedHeroes, setDisplayedHeroes] = useState([]);
  const [selectedHero, setSelectedHero] = useState(null);
  const [showAddForm, setShowAddForm] = useState(false);
  const [searchTerm, setSearchTerm] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  // -------------------------------
  // Load default heroes on mount
  // -------------------------------
  useEffect(() => {
    loadDefaultHeroes();
  }, []);

  const loadDefaultHeroes = async () => {
    setIsLoading(true);
    const heroes = await fetchDefaultHeroes();
    setDefaultHeroes(heroes);
    setDisplayedHeroes(heroes);
    setIsLoading(false);
  };

  // -------------------------------
  // Handle search (with debounce)
  // -------------------------------
  useEffect(() => {
    const performSearch = async () => {
      if (!searchTerm.trim()) {
        setDisplayedHeroes(defaultHeroes);
        return;
      }

      // Search locally first
      const localResults = defaultHeroes.filter(
        (hero) =>
          hero.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
          (hero.biography?.fullName || "")
            .toLowerCase()
            .includes(searchTerm.toLowerCase())
      );

      if (localResults.length > 0) {
        setDisplayedHeroes(localResults);
      } else {
        // Fetch from API if not found locally
        setIsLoading(true);
        const apiResults = await searchHeroes(searchTerm);
        setDisplayedHeroes(apiResults);
        setIsLoading(false);
      }
    };

    const debounce = setTimeout(performSearch, 300);
    return () => clearTimeout(debounce);
  }, [searchTerm, defaultHeroes]);

  // -------------------------------
  // Add new hero to list
  // -------------------------------
  const handleAddHero = (hero) => {
    if (!defaultHeroes.find((h) => h.id === hero.id)) {
      const updatedHeroes = [...defaultHeroes, hero];
      setDefaultHeroes(updatedHeroes);
      setDisplayedHeroes(updatedHeroes);
    }
  };

  // -------------------------------
  // UI
  // -------------------------------
  return (
    <div className="min-h-screen bg-gov-dark relative overflow-hidden">
      {/* 🔹 Scanline overlay */}
      <div className="scanline" />

      {/* 🔹 Main Content */}
      <div className="flex flex-col items-center pb-32">
        <Header />

        <div className="w-[80vw] max-w-[1400px] py-10 px-4 sm:px-6 lg:px-8">
          <SearchBar
            searchTerm={searchTerm}
            onSearchChange={setSearchTerm}
            onAddClick={() => setShowAddForm(true)}
          />

          <div className="py-8 flex justify-center">
            <div className="w-[80%]">
              {isLoading ? (
                // Loading State
                <div className="flex items-center justify-center py-20">
                  <div className="text-center">
                    <div className="text-3xl font-orbitron text-gov-cyan mb-4 animate-blink">
                      LOADING DATABASE...
                    </div>
                    <div className="text-gov-green/50 font-mono">
                      ACCESSING CLASSIFIED FILES
                    </div>
                  </div>
                </div>
              ) : displayedHeroes.length === 0 ? (
                // No Results
                <div className="flex items-center justify-center py-20">
                  <div className="text-center border-2 border-gov-cyan/30 p-12 rounded-xl">
                    <div className="text-2xl font-orbitron text-gov-cyan mb-4">
                      NO SUBJECTS FOUND
                    </div>
                    <div className="text-gov-green/50 font-mono">
                      {searchTerm
                        ? "TRY A DIFFERENT SEARCH QUERY"
                        : "DATABASE EMPTY"}
                    </div>
                  </div>
                </div>
              ) : (
                // Results
                <>
                  {/* Search Info */}
                  <div className="mb-6 flex items-center justify-between flex-wrap gap-4">
                    {searchTerm && (
  <div className="text-gov-green font-mono text-sm sm:text-base">
    <span className="text-gov-cyan font-bold">
      {displayedHeroes.length}
    </span>{" "}
    SUBJECT
    {displayedHeroes.length !== 1 ? "S" : ""} FOUND
  </div>
)}


                    {searchTerm && (
                      <button
                        onClick={() => setSearchTerm("")}
                        className="text-gov-cyan hover:text-gov-green text-xs sm:text-sm font-mono border border-gov-cyan px-3 py-1 hover:border-gov-green transition-all rounded-full"
                      >
                        CLEAR SEARCH
                      </button>
                    )}
                  </div>

                  {/* Watchlist Count */}
                  {!searchTerm && (
                    <div className="text-gov-green font-mono text-sm sm:text-base mb-4">
                      <span className="text-gov-cyan font-bold">
                        {defaultHeroes.length}
                      </span>{" "}
                      SUBJECT
                      {defaultHeroes.length !== 1 ? "S" : ""} IN WATCHLIST
                    </div>
                  )}

                  {/* Cards */}
                  <div className="flex flex-wrap justify-center gap-6">
                    {displayedHeroes.map((hero) => (
                      <div
                        key={hero.id}
                        className="w-full sm:w-[calc(50%-0.5rem)] lg:w-[calc(33.333%-0.67rem)]"
                      >
                        <ContactCard hero={hero} onClick={setSelectedHero} />
                      </div>
                    ))}
                  </div>
                </>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* 🔹 Footer (Full-width line + Info) */}
      <footer
        className="
          fixed bottom-0 left-0 w-full 
          border-t border-gov-cyan/70 
          bg-gov-blue/70 backdrop-blur-md 
          shadow-inner z-50
        "
        role="contentinfo"
        aria-label="Superhero Database Footer"
      >
        <div className="w-full h-[2px] bg-gradient-to-r from-gov-cyan via-gov-green to-gov-cyan shadow-[0_0_10px_#00ffff]" />

        <div className="flex justify-center py-4 sm:py-5">
          <div className="w-[80vw] sm:w-[85vw] lg:w-[70vw] flex items-center justify-between gap-6">
            {/* Left side */}
            <div className="font-mono text-left">
              <p className="text-sm sm:text-base text-gov-green">
                <span className="hidden sm:inline">SYSTEM STATUS: </span>
                <span className="text-gov-cyan font-bold animate-blink">
                  OPERATIONAL
                </span>
              </p>
              <p className="text-[10px] sm:text-xs text-gov-green/60 mt-1">
                Powered by SuperHero API
              </p>
            </div>

            {/* Right side */}
            <div className="text-right font-mono text-gov-green/50 text-xs sm:text-sm">
              SUPERHERO DATABASE v2.0
            </div>
          </div>
        </div>
      </footer>

      {/* 🔹 Modals */}
      {selectedHero && (
        <ContactModal hero={selectedHero} onClose={() => setSelectedHero(null)} />
      )}
      {showAddForm && (
        <AddContactForm
          onClose={() => setShowAddForm(false)}
          onAdd={handleAddHero}
        />
      )}
    </div>
  );
}

export default App;
