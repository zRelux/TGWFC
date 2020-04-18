export interface SpacingInterface {
  half: string;
  single: string;
  double: string;
  oneAndHalf: string;
  triple: string;
  multiple: (n: number) => string;
}

const base = 8;

const spacing = {
  half: `${base / 2}px`,
  single: `${base}px`,
  double: `${base * 2}px`,
  oneAndHalf: `${base / 2 + base}px`,
  triple: `${base * 3}px`,
  multiple: (n: number) => `${base * n}px`
};

export default spacing;
