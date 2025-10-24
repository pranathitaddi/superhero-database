import React from "react";

const ContactCard = ({ hero, onClick }) => {
  // Determine main power
  const getMainPower = () => {
    const stats = hero.powerstats;
    if (!stats) return "Unknown";

    const powers = {
      intelligence: stats.intelligence,
      strength: stats.strength,
      speed: stats.speed,
      durability: stats.durability,
      power: stats.power,
      combat: stats.combat,
    };

    const highest = Object.entries(powers).reduce((a, b) =>
      parseInt(a[1] || 0) > parseInt(b[1] || 0) ? a : b
    );

    return highest[0].charAt(0).toUpperCase() + highest[0].slice(1);
  };

  const handleClick = () => {
    if (onClick) onClick(hero);
  };

  return (
    <div
      onClick={handleClick}
      className="
        flex flex-col sm:flex-row items-center sm:items-stretch
        rounded-2xl border border-gov-cyan/20 cursor-pointer overflow-hidden group
        transition-all duration-400 p-4 gap-4
        backdrop-blur-md
        bg-gradient-to-br from-gov-cyan/10 via-gov-blue/10 to-gov-green/10
        hover:from-gov-cyan/20 hover:via-gov-blue/20 hover:to-gov-green/20
        hover:border-gov-cyan/50 hover:shadow-[0_0_20px_rgba(0,255,198,0.2)]
      "
    >
      {/* Circular Profile Picture */}
      <div className="flex-shrink-0">
        <div className="relative w-20 h-20 sm:w-24 sm:h-24">
          <div className="absolute inset-0 bg-gradient-to-br from-gov-cyan/30 to-gov-green/30 rounded-full blur-md group-hover:blur-lg transition-all"></div>
          <div className="relative w-full h-full rounded-full overflow-hidden border-2 border-gov-cyan/50 group-hover:border-gov-cyan transition-all">
            <img
              src={
                hero.images?.sm ||
                hero.images?.xs ||
                "https://via.placeholder.com/150?text=NO+IMAGE"
              }
              alt={hero.name}
              className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
              onError={(e) => {
                e.target.src = "https://via.placeholder.com/150?text=NO+IMAGE";
              }}
            />
          </div>
        </div>
      </div>

      {/* Hero Details */}
      <div className="flex-1 flex flex-col justify-center text-center sm:text-left min-w-0">
        <h3 className="text-lg font-bold text-gov-cyan truncate group-hover:text-gov-green transition-colors">
          {hero.name}
        </h3>
        <p className="text-sm text-gov-green/70 truncate mb-2">
          {hero.biography?.fullName || "Unknown Identity"}
        </p>

        <div className="flex items-center justify-center sm:justify-start gap-2 mb-1">
          <span className="text-xs text-gov-green/50">Power:</span>
          <span className="text-xs font-semibold text-gov-cyan">
            {getMainPower()}
          </span>
        </div>

        <div className="flex items-center justify-center sm:justify-start gap-2">
          <div
            className={`px-3 py-1 rounded-full text-xs font-medium border ${
              hero.biography?.alignment === "good"
                ? "bg-green-500/10 border-green-500/30 text-green-400"
                : hero.biography?.alignment === "bad"
                  ? "bg-red-500/10 border-red-500/30 text-red-400"
                  : "bg-yellow-500/10 border-yellow-500/30 text-yellow-400"
            }`}
          >
            {hero.biography?.alignment?.toUpperCase() || "NEUTRAL"}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactCard;
