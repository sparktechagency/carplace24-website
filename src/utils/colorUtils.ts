/**
 * Utility to map color names to approximate Hex codes for UI display.
 * This is useful when the API returns color names (e.g., "Anthracite") but we need to show a swatch.
 */
export const getColorHex = (name: string): string => {
  const normalize = (s: string) => s.trim().toLowerCase();
  const n = normalize(name);

  const map: Record<string, string> = {
    // Standard Colors (English)
    black: "#000000",
    white: "#FFFFFF",
    red: "#FF0000",
    blue: "#0000FF",
    green: "#008000",
    yellow: "#FFFF00",
    orange: "#FFA500",
    purple: "#800080",
    pink: "#FFC0CB",
    brown: "#A52A2A",
    grey: "#808080",
    gray: "#808080",
    silver: "#C0C0C0",
    gold: "#FFD700",
    violet: "#EE82EE",
    turquoise: "#40E0D0",
    beige: "#F5F5DC",

    // German Colors (Common in this project context)
    schwarz: "#000000",
    weiss: "#FFFFFF",
    rot: "#FF0000",
    blau: "#0000FF",
    grün: "#008000",
    gelb: "#FFFF00",
    violett: "#8B5CF6",
    grau: "#808080",
    silber: "#C0C0C0",
    braun: "#A52A2A",
    türkis: "#40E0D0",

    // Car Specific / Fancy Names
    anthracite: "#383E42",
    anthrazit: "#383E42",
    bordeaux: "#800020",
    champagne: "#F7E7CE",
    burgundy: "#800020",
    metallic: "#D3D3D3",
    "metallic black": "#000000",
    "metallic white": "#FFFFFF",
    "metallic silver": "#C0C0C0",
    "metallic grey": "#808080",
    "metallic gray": "#808080",
    "metallic blue": "#0000FF",
    "metallic red": "#FF0000",
  };

  if (map[n]) return map[n];

  // If it's a valid hex code, return it as is (normalized)
  if (n.startsWith("#")) return n;

  // Fallback: Return the name.
  // If the name is a standard web color (e.g. "Cyan"), the browser will render it correctly anyway.
  return name;
};
