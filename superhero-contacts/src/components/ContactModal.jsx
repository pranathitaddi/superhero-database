import React, { useEffect } from "react";

const ContactModal = ({ hero, onClose }) => {
  useEffect(() => {
    document.body.style.overflow = "hidden";
    return () => {
      document.body.style.overflow = "unset";
    };
  }, []);

  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    return () => document.removeEventListener("keydown", handleEscape);
  }, [onClose]);

  if (!hero) return null;

  const StatBar = ({ label, value }) => {
    const numValue = parseInt(value) || 0;
    const barColor =
      numValue >= 80
        ? "bg-red-500"
        : numValue >= 60
          ? "bg-orange-500"
          : numValue >= 40
            ? "bg-yellow-500"
            : "bg-white";

    return (
      <div className="mb-4">
        <div className="flex justify-between items-center mb-2">
          <span className="text-gov-green/80 text-sm">{label}</span>
          <span className="text-gov-cyan font-bold">{value || "N/A"}</span>
        </div>
        <div className="h-2 bg-gov-dark/50 rounded-full overflow-hidden">
          <div
            className={`h-full ${barColor} transition-all duration-1000`}
            style={{ width: `${numValue}%` }}
          />
        </div>
      </div>
    );
  };

  return (
    <div
      className="fixed inset-0 flex items-center justify-center p-4 z-[100]"
      style={{ isolation: "isolate" }}
    >
      {/* Backdrop Overlay */}
      <div
        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
        onClick={onClose}
        style={{ zIndex: 100 }}
      />

      {/* Modal Content */}
      <div
        className="relative bg-gov-dark border-2 border-gov-cyan/40 rounded-2xl max-w-4xl w-full max-h-[90vh] overflow-hidden shadow-2xl"
        style={{ zIndex: 101 }}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 z-[102] w-10 h-10 flex items-center justify-center bg-red-500 hover:bg-red-600 text-white rounded-full transition-all duration-300 hover:scale-110 shadow-lg"
          aria-label="Close modal"
        >
          <svg
            className="w-5 h-5"
            fill="none"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="2"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path d="M6 18L18 6M6 6l12 12"></path>
          </svg>
        </button>

        {/* Scrollable Content */}
        <div className="overflow-y-auto max-h-[90vh] custom-scrollbar">
          <div className="p-6 sm:p-8">
            {/* Header Section */}
            <div className="flex flex-col md:flex-row gap-8 mb-8">
              {/* Hero Image */}
              <div className="flex-shrink-0 flex justify-center md:block">
                <div className="w-48 sm:w-56">
                  <div className="rounded-xl overflow-hidden border-2 border-gov-cyan/30 shadow-lg">
                    <img
                      src={
                        hero.images?.md ||
                        hero.images?.sm ||
                        "https://via.placeholder.com/400x600?text=NO+IMAGE"
                      }
                      alt={hero.name}
                      className="w-full h-auto"
                      onError={(e) => {
                        e.target.src =
                          "https://via.placeholder.com/400x600?text=NO+IMAGE";
                      }}
                    />
                  </div>

                  {/* Status Badge */}
                  <div className="mt-4 bg-gov-blue/40 backdrop-blur-sm rounded-xl p-3 border border-gov-cyan/20">
                    <div className="flex items-center justify-between">
                      <span className="text-gov-green/70 text-xs">Status</span>
                      <span
                        className={`px-3 py-1 rounded-full text-xs font-bold ${
                          hero.biography?.alignment === "good"
                            ? "bg-green-500/20 text-green-400"
                            : hero.biography?.alignment === "bad"
                              ? "bg-red-500/20 text-red-400"
                              : "bg-yellow-500/20 text-yellow-400"
                        }`}
                      >
                        {hero.biography?.alignment?.toUpperCase() || "NEUTRAL"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              {/* Hero Info */}
              <div className="flex-1 min-w-0">
                {/* Name */}
                <div className="mb-6">
                  <div className="text-gov-green/60 text-xs uppercase mb-1">
                    Designation
                  </div>
                  <h1 className="text-3xl sm:text-4xl font-orbitron font-bold text-gov-cyan">
                    {hero.name}
                  </h1>
                </div>

                {/* Basic Info Grid */}
                <div className="grid sm:grid-cols-2 gap-4 mb-6">
                  <div className="bg-gov-blue/20 rounded-lg p-3 border border-gov-cyan/10">
                    <div className="text-gov-green/60 text-xs mb-1">
                      Real Name
                    </div>
                    <div className="text-gov-green font-semibold">
                      {hero.biography?.fullName || "Classified"}
                    </div>
                  </div>

                  <div className="bg-gov-blue/20 rounded-lg p-3 border border-gov-cyan/10">
                    <div className="text-gov-green/60 text-xs mb-1">
                      Publisher
                    </div>
                    <div className="text-gov-cyan font-bold">
                      {hero.biography?.publisher || "Unknown"}
                    </div>
                  </div>

                  <div className="bg-gov-blue/20 rounded-lg p-3 border border-gov-cyan/10">
                    <div className="text-gov-green/60 text-xs mb-1">
                      Place of Birth
                    </div>
                    <div className="text-gov-green text-sm">
                      {hero.biography?.placeOfBirth || "Unknown"}
                    </div>
                  </div>

                  <div className="bg-gov-blue/20 rounded-lg p-3 border border-gov-cyan/10">
                    <div className="text-gov-green/60 text-xs mb-1">
                      First Appearance
                    </div>
                    <div className="text-gov-green text-sm">
                      {hero.biography?.firstAppearance || "Unknown"}
                    </div>
                  </div>
                </div>

                {/* Aliases */}
                {hero.biography?.aliases &&
                  hero.biography.aliases.length > 0 && (
                    <div className="bg-gov-blue/20 rounded-lg p-3 border border-gov-cyan/10">
                      <div className="text-gov-green/60 text-xs mb-2">
                        Known Aliases
                      </div>
                      <div className="flex flex-wrap gap-2">
                        {hero.biography.aliases
                          .slice(0, 5)
                          .map((alias, index) => (
                            <span
                              key={index}
                              className="bg-gov-cyan/10 border border-gov-cyan/30 px-3 py-1 rounded-full text-xs text-gov-cyan"
                            >
                              {alias}
                            </span>
                          ))}
                      </div>
                    </div>
                  )}
              </div>
            </div>

            {/* Power Statistics */}
            <div className="mb-8 bg-gov-blue/20 rounded-xl p-6 border border-gov-cyan/20">
              <h3 className="text-xl font-orbitron font-bold text-gov-cyan mb-4 flex items-center gap-2">
                <span>⚡</span> Power Statistics
              </h3>
              <div className="grid sm:grid-cols-2 gap-4">
                <StatBar
                  label="Intelligence"
                  value={hero.powerstats?.intelligence}
                />
                <StatBar label="Strength" value={hero.powerstats?.strength} />
                <StatBar label="Speed" value={hero.powerstats?.speed} />
                <StatBar
                  label="Durability"
                  value={hero.powerstats?.durability}
                />
                <StatBar label="Power" value={hero.powerstats?.power} />
                <StatBar label="Combat" value={hero.powerstats?.combat} />
              </div>
            </div>

            {/* Physical Characteristics */}
            <div className="mb-8 bg-gov-blue/20 rounded-xl p-6 border border-gov-cyan/20">
              <h3 className="text-xl font-orbitron font-bold text-gov-cyan mb-4 flex items-center gap-2">
                <span>👤</span> Physical Characteristics
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3">
                {[
                  { label: "Gender", value: hero.appearance?.gender },
                  { label: "Race", value: hero.appearance?.race },
                  { label: "Height", value: hero.appearance?.height?.[0] },
                  { label: "Weight", value: hero.appearance?.weight?.[0] },
                  { label: "Eye Color", value: hero.appearance?.eyeColor },
                  { label: "Hair Color", value: hero.appearance?.hairColor },
                ].map((item, index) => (
                  <div key={index} className="bg-gov-dark/30 rounded-lg p-3">
                    <div className="text-gov-green/60 text-xs mb-1">
                      {item.label}
                    </div>
                    <div className="text-gov-green font-semibold text-sm">
                      {item.value || "Unknown"}
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Occupation & Connections */}
            <div className="grid sm:grid-cols-2 gap-4">
              {/* Occupation */}
              <div className="bg-gov-blue/20 rounded-xl p-6 border border-gov-cyan/20">
                <h3 className="text-lg font-orbitron font-bold text-gov-cyan mb-3 flex items-center gap-2">
                  <span>💼</span> Occupation
                </h3>
                <div className="text-gov-green text-sm leading-relaxed">
                  {hero.work?.occupation || "Unknown"}
                </div>
              </div>

              {/* Connections */}
              <div className="bg-gov-blue/20 rounded-xl p-6 border border-gov-cyan/20">
                <h3 className="text-lg font-orbitron font-bold text-gov-cyan mb-3 flex items-center gap-2">
                  <span>🔗</span> Affiliations
                </h3>
                <div className="text-gov-green text-sm leading-relaxed">
                  {hero.connections?.groupAffiliation || "None"}
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactModal;
