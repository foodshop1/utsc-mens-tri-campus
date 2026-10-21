export const theme = {
  colors: {
    maroonDeepest: "#2c0712",
    maroonDeep: "#430a1b",
    maroon: "#651027",
    maroonMid: "#8a1a37",
    maroonBright: "#b02349",
    maroonLight: "#d9607c",
    ivory: "#f7f1ea",
    white: "#ffffff",
    ink: "#180307",
    slate: "#9a8a8e",
    gold: "#c9a24b",
  },
  gradients: {
    heroBackdrop:
      "radial-gradient(circle at 20% 15%, #8a1a37 0%, #430a1b 42%, #180307 100%)",
    cardSheen:
      "linear-gradient(135deg, rgba(255,255,255,0.14) 0%, rgba(255,255,255,0) 55%)",
    rankBadge: "linear-gradient(160deg, #d9607c 0%, #8a1a37 60%, #430a1b 100%)",
    goldBadge: "linear-gradient(160deg, #e8cf8e 0%, #c9a24b 55%, #92752f 100%)",
  },
  radius: {
    sm: 8,
    md: 14,
    lg: 24,
    pill: 999,
  },
  shadow: {
    card: `0 1px 2px 0 rgba(0,0,0,0.25), 0 4px 12px -2px rgba(0,0,0,0.35), 0 16px 32px -8px rgba(0,0,0,0.45)`,
    raised: `0 2px 4px 0 rgba(0,0,0,0.3), 0 8px 20px -4px rgba(0,0,0,0.4), 0 24px 48px -12px rgba(0,0,0,0.5)`,
    glow: `0 0 0 1px rgba(255,255,255,0.08), 0 0 32px -4px rgba(176,35,73,0.55)`,
  },
  font: {
    display: `"Avenir Next", "Segoe UI", system-ui, sans-serif`,
    body: `"Inter", "Segoe UI", system-ui, sans-serif`,
    mono: `"Roboto Mono", "SF Mono", monospace`,
  },
  breakpoints: {
    sm: "480px",
    md: "768px",
    lg: "1100px",
    xl: "1440px",
  },
} as const;

export type AppTheme = typeof theme;
