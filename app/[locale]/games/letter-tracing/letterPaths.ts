// Letter path definitions for tracing
// Each path is an array of points (x, y) normalized to 0-1 range
// Points are traced in order to form the letter

export interface Point {
  x: number;
  y: number;
}

// Hebrew letters are written right-to-left
// Paths are designed for natural stroke order
export const LETTER_PATHS: Record<string, Point[]> = {
  // א (Aleph) - two diagonal strokes with a connecting line
  letter_1: [
    { x: 0.7, y: 0.2 },
    { x: 0.5, y: 0.5 },
    { x: 0.3, y: 0.8 },
    { x: 0.3, y: 0.2 },
    { x: 0.5, y: 0.5 },
    { x: 0.7, y: 0.8 },
  ],

  // ב (Bet) - horizontal top, vertical right, horizontal bottom with tail
  letter_2: [
    { x: 0.7, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.75 },
    { x: 0.3, y: 0.75 },
    { x: 0.7, y: 0.75 },
    { x: 0.7, y: 0.85 },
  ],

  // ג (Gimel) - vertical stroke with a foot
  letter_3: [
    { x: 0.5, y: 0.2 },
    { x: 0.5, y: 0.7 },
    { x: 0.5, y: 0.7 },
    { x: 0.35, y: 0.85 },
  ],

  // ד (Dalet) - horizontal top with vertical stroke
  letter_4: [
    { x: 0.7, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.8 },
  ],

  // ה (Hey) - three-sided with opening at bottom left
  letter_5: [
    { x: 0.7, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.75 },
    { x: 0.65, y: 0.35 },
    { x: 0.65, y: 0.75 },
  ],

  // ו (Vav) - simple vertical line
  letter_6: [
    { x: 0.5, y: 0.2 },
    { x: 0.5, y: 0.8 },
  ],

  // ז (Zayin) - vertical with top
  letter_7: [
    { x: 0.6, y: 0.25 },
    { x: 0.4, y: 0.25 },
    { x: 0.5, y: 0.25 },
    { x: 0.5, y: 0.8 },
  ],

  // ח (Chet) - like a gate/bridge
  letter_8: [
    { x: 0.7, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.7, y: 0.25 },
    { x: 0.7, y: 0.8 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.8 },
  ],

  // ט (Tet) - curving shape
  letter_9: [
    { x: 0.7, y: 0.3 },
    { x: 0.7, y: 0.7 },
    { x: 0.5, y: 0.8 },
    { x: 0.3, y: 0.7 },
    { x: 0.3, y: 0.3 },
    { x: 0.5, y: 0.2 },
    { x: 0.55, y: 0.35 },
    { x: 0.55, y: 0.55 },
  ],

  // י (Yud) - small curved stroke
  letter_10: [
    { x: 0.55, y: 0.35 },
    { x: 0.5, y: 0.45 },
    { x: 0.45, y: 0.55 },
  ],

  // כ (Kaf) - curved C-like shape
  letter_11: [
    { x: 0.65, y: 0.25 },
    { x: 0.4, y: 0.25 },
    { x: 0.3, y: 0.35 },
    { x: 0.3, y: 0.65 },
    { x: 0.4, y: 0.75 },
    { x: 0.65, y: 0.75 },
  ],

  // ל (Lamed) - tall ascending letter
  letter_12: [
    { x: 0.55, y: 0.1 },
    { x: 0.45, y: 0.3 },
    { x: 0.4, y: 0.5 },
    { x: 0.5, y: 0.7 },
    { x: 0.65, y: 0.8 },
  ],

  // מ (Mem) - closed rectangular shape
  letter_13: [
    { x: 0.7, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.75 },
    { x: 0.7, y: 0.75 },
    { x: 0.7, y: 0.25 },
    { x: 0.5, y: 0.35 },
    { x: 0.5, y: 0.55 },
  ],

  // נ (Nun) - simple vertical with base
  letter_14: [
    { x: 0.5, y: 0.25 },
    { x: 0.5, y: 0.7 },
    { x: 0.4, y: 0.8 },
  ],

  // ס (Samech) - closed oval/circle
  letter_15: [
    { x: 0.5, y: 0.2 },
    { x: 0.7, y: 0.3 },
    { x: 0.7, y: 0.7 },
    { x: 0.5, y: 0.8 },
    { x: 0.3, y: 0.7 },
    { x: 0.3, y: 0.3 },
    { x: 0.5, y: 0.2 },
  ],

  // ע (Ayin) - Y-like shape
  letter_16: [
    { x: 0.65, y: 0.25 },
    { x: 0.5, y: 0.5 },
    { x: 0.35, y: 0.8 },
    { x: 0.35, y: 0.25 },
    { x: 0.5, y: 0.5 },
    { x: 0.65, y: 0.8 },
  ],

  // פ (Pey) - rounded with inner element
  letter_17: [
    { x: 0.7, y: 0.25 },
    { x: 0.35, y: 0.25 },
    { x: 0.3, y: 0.35 },
    { x: 0.3, y: 0.65 },
    { x: 0.35, y: 0.75 },
    { x: 0.7, y: 0.75 },
    { x: 0.7, y: 0.25 },
    { x: 0.55, y: 0.4 },
    { x: 0.5, y: 0.55 },
  ],

  // צ (Tzadi) - complex shape with arm
  letter_18: [
    { x: 0.7, y: 0.2 },
    { x: 0.6, y: 0.35 },
    { x: 0.5, y: 0.5 },
    { x: 0.5, y: 0.75 },
    { x: 0.35, y: 0.85 },
    { x: 0.35, y: 0.25 },
    { x: 0.35, y: 0.5 },
  ],

  // ק (Kuf) - vertical with descender
  letter_19: [
    { x: 0.65, y: 0.25 },
    { x: 0.35, y: 0.25 },
    { x: 0.35, y: 0.25 },
    { x: 0.35, y: 0.65 },
    { x: 0.6, y: 0.35 },
    { x: 0.6, y: 0.85 },
  ],

  // ר (Resh) - like Dalet but rounded
  letter_20: [
    { x: 0.7, y: 0.25 },
    { x: 0.4, y: 0.25 },
    { x: 0.3, y: 0.35 },
    { x: 0.3, y: 0.8 },
  ],

  // ש (Shin) - three-pronged
  letter_21: [
    { x: 0.2, y: 0.25 },
    { x: 0.25, y: 0.8 },
    { x: 0.35, y: 0.2 },
    { x: 0.45, y: 0.8 },
    { x: 0.65, y: 0.2 },
    { x: 0.65, y: 0.8 },
  ],

  // ת (Tav) - like a table
  letter_22: [
    { x: 0.7, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.25 },
    { x: 0.3, y: 0.8 },
    { x: 0.6, y: 0.25 },
    { x: 0.6, y: 0.6 },
    { x: 0.5, y: 0.8 },
  ],
};

export default LETTER_PATHS;
