const API_BASE = 'https://cdn.jsdelivr.net/gh/akabab/superhero-api@0.3.0/api';

// Default hero IDs for the homepage
export const DEFAULT_HEROES = [
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
export const fetchHeroById = async (id) => {
  try {
    const response = await fetch(`${API_BASE}/id/${id}.json`);
    if (!response.ok) throw new Error('Hero not found');
    return await response.json();
  } catch (error) {
    console.error(`Error fetching hero ${id}:`, error);
    return null;
  }
};

// Fetch all heroes
export const fetchAllHeroes = async () => {
  try {
    const response = await fetch(`${API_BASE}/all.json`);
    if (!response.ok) throw new Error('Failed to fetch heroes');
    return await response.json();
  } catch (error) {
    console.error('Error fetching all heroes:', error);
    return [];
  }
};

// Fetch default heroes for homepage
export const fetchDefaultHeroes = async () => {
  const heroes = await Promise.all(
    DEFAULT_HEROES.map(id => fetchHeroById(id))
  );
  return heroes.filter(hero => hero !== null);
};

// Search heroes by name
export const searchHeroes = async (searchTerm) => {
  if (!searchTerm) return [];
  
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
