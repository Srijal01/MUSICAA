// Predefined categories with parent-child structure
const categories = [
  {
    name: 'String Instruments',
    subcategories: [
      'Guitars',
      'Bass Guitars',
      'Ukuleles',
      'Violins',
      'Cellos',
      'Mandolins',
    ],
  },
  { 
    name: 'Keyboard Instruments',
    subcategories: [
      'Digital Pianos',
      'Synthesizers',
      'MIDI Controllers',
      'Organs',
    ],
  },
  {
    name: 'Wind Instruments',
    subcategories: [
      'Flutes',
      'Clarinets',
      'Saxophones',
      'Trumpets',
      'Harmonicas',
    ],
  },
  {
    name: 'Percussion Instruments',
    subcategories: [
      'Drum Kits',
      'Electronic Drums',
      'Djembes',
      'Cajons',
      'Congas',
      'Cymbals',
    ],
  },
  {
    name: 'Audio Equipment & Accessories',
    subcategories: [
      'Amplifiers',
      'Speakers',
      'Microphones',
      'Audio Interfaces',
      'Cables & Connectors',
      'Stands & Mounts',
    ],
  },
  {
    name: 'Instrument Accessories',
    subcategories: [
      'Guitar Strings',
      'Picks & Plectrums',
      'Drumsticks',
      'Reeds',
      'Cases & Bags',
      'Tuners & Metronomes',
    ],
  },
];

module.exports = categories;
