// Seeded value noise so the server SVG and the client animation agree exactly.
export const BAR_COUNT = 240; // 240 bars x 8px pitch = 1920px, clipped on smaller screens
export const BAR_PITCH = 8;
export const BAR_WIDTH = 2;
export const BAR_AREA_HEIGHT = 200;

function hash(n: number): number {
  const s = Math.sin(n * 127.1 + 311.7) * 43758.5453;
  return s - Math.floor(s);
}

function smooth(t: number): number {
  return t * t * (3 - 2 * t);
}

function noise(x: number): number {
  const i = Math.floor(x);
  const f = x - i;
  return hash(i) * (1 - smooth(f)) + hash(i + 1) * smooth(f);
}

// Heights stay at or below 140 so a 35% swell still fits inside the 200px area.
export function barHeights(count = BAR_COUNT): number[] {
  return Array.from({ length: count }, (_, i) => {
    const n = 0.6 * noise(i / 9) + 0.3 * noise(i / 3 + 40) + 0.1 * hash(i);
    return Math.round(18 + n * 122);
  });
}
