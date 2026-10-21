export type Position = "Forward" | "Defense" | "Goalie";

export type ClassYear = "Freshman" | "Sophomore" | "Junior" | "Senior" | "Graduate";

export interface PlayerStats {
  speed: number;
  shooting: number;
  passing: number;
  defense: number;
  physicality: number;
  goaltending: number;
}

export interface Player {
  id: string;
  name: string;
  number: number;
  position: Position;
  year: ClassYear;
  campus: "North Campus" | "East Campus" | "South Campus";
  hometown: string;
  height: string;
  weightLb: number;
  bio: string;
  stats: PlayerStats;
}

export const fullName = (p: Player): string => p.name;

const POSITION_WEIGHTS: Record<Position, Partial<Record<keyof PlayerStats, number>>> = {
  Forward: { speed: 0.26, shooting: 0.3, passing: 0.22, physicality: 0.14, defense: 0.08 },
  Defense: { defense: 0.34, physicality: 0.26, passing: 0.2, speed: 0.14, shooting: 0.06 },
  Goalie: { goaltending: 0.62, defense: 0.18, speed: 0.1, passing: 0.1 },
};

export const getOverall = (p: Player): number => {
  const weights = POSITION_WEIGHTS[p.position];
  const total = Object.entries(weights).reduce((sum, [key, weight]) => {
    return sum + p.stats[key as keyof PlayerStats] * (weight ?? 0);
  }, 0);
  return Math.round(total);
};

export const overallTier = (overall: number): "gold" | "maroon" | "slate" => {
  if (overall >= 88) return "gold";
  if (overall >= 78) return "maroon";
  return "slate";
};
