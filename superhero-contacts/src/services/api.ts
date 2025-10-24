const API_BASE = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api';

// Define the Hero interface based on the API response structure
export interface Hero {
  id: number;
  name: string;
  slug: string;
  powerstats: {
    intelligence: number;
    strength: number;
    speed: number;
    durability: number;
    power: number;
    combat: number;
  };
  appearance: {
    gender: string;
    race: string;
    height: string[];
    weight: string[];
    eyeColor: string;
    hairColor: string;
  };
  biography: {
    fullName: string;
    alterEgos: string;
    aliases: string[];
    placeOfBirth: string;
    firstAppearance: string;
    publisher: string;
    alignment: string;
  };
  work: {
    occupation: string;
    base: string;
  };
  connections: {
    groupAffiliation: string;
    relatives: string;
  };
  images: {
    xs: string;
    sm: string;
    md: string;
    lg: string;
  };
}

// Default hero IDs for the homepage
export const DEFAULT_HEROES: number[] = [
  346, // Iron Man
  70,  // Batman
  620, // Spider-Man
  644, // Superman
  226, // Doctor Strange
  313, // Green Lantern
  720, // Wonder Woman
  263, // Flash
  659, // Thor
  107, // Black Widow
  149, // Captain America
  332, // Hulk
];

// Fetch a specific hero by ID
export const fetchHeroById = async (id: number): Promise<Hero | null> => {
  try {
    const response = await fetch(`${API_BASE}/id/${id}.json`);
    if (!response.ok) throw new Error('Hero not found');
    const hero: Hero = await response.json();
    return hero;
  } catch (error) {
    console.error(`Error fetching hero ${id}:`, error);
    return null;
  }
};

// Fetch all heroes
export const fetchAllHeroes = async (): Promise<Hero[]> => {
  try {
    const response = await fetch(`${API_BASE}/all.json`);
    if (!response.ok) throw new Error('Failed to fetch heroes');
    const heroes: Hero[] = await response.json();
    return heroes;
  } catch (error) {
    console.error('Error fetching all heroes:', error);
    return [];
  }
};

// Fetch default heroes for homepage
export const fetchDefaultHeroes = async (): Promise<Hero[]> => {
  const heroes = await Promise.all(
    DEFAULT_HEROES.map(id => fetchHeroById(id))
  );
  return heroes.filter((hero): hero is Hero => hero !== null);
};

// Search heroes by name
export const searchHeroes = async (searchTerm: string): Promise<Hero[]> => {
  if (!searchTerm.trim()) return [];
  
  try {
    const allHeroes = await fetchAllHeroes();
    return allHeroes.filter(hero =>
      hero.name.toLowerCase().includes(searchTerm.toLowerCase())
    );
  } catch (error) {
    console.error('Error searching heroes:', error);
    return [];
  }
};