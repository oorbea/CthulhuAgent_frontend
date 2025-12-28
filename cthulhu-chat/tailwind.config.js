/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{ts,tsx}"],
  theme: {
    screens: {
      'xs': '475px',
      'sm': '640px',
      'md': '768px',
      'lg': '1024px',
      'xl': '1280px',
      '2xl': '1536px',
    },
    extend: {
      colors: {
        // Deep Ocean - Base colors
        abyss: {
          950: "#020810",
          900: "#040f1a",
          800: "#081a2e",
          700: "#0d2847",
          600: "#123660",
          500: "#1a4a7a",
        },
        // Bioluminescent Greens
        eldritch: {
          DEFAULT: "#00ff9d",
          50: "#e6fff5",
          100: "#b3ffe3",
          200: "#80ffd1",
          300: "#4dffbe",
          400: "#1affac",
          500: "#00ff9d",
          600: "#00cc7d",
          700: "#00995e",
          800: "#00663f",
          900: "#00331f",
        },
        // Bioluminescent Cyan
        bio: {
          DEFAULT: "#00d4ff",
          50: "#e6faff",
          100: "#b3f0ff",
          200: "#80e6ff",
          300: "#4ddcff",
          400: "#1ad2ff",
          500: "#00d4ff",
          600: "#00a9cc",
          700: "#007f99",
          800: "#005466",
          900: "#002a33",
        },
        // Electric Void Purple
        void: {
          DEFAULT: "#8b5cf6",
          50: "#f3f0ff",
          100: "#e0d5ff",
          200: "#c4adff",
          300: "#a78bff",
          400: "#8b5cf6",
          500: "#7c3aed",
          600: "#6d28d9",
          700: "#5b21b6",
          800: "#4c1d95",
          900: "#3b0d7a",
        },
        // Glass Surface
        glass: {
          light: "rgba(255, 255, 255, 0.08)",
          medium: "rgba(255, 255, 255, 0.12)",
          border: "rgba(255, 255, 255, 0.15)",
        },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
        display: ["Outfit", "Inter", "system-ui", "sans-serif"],
      },
      boxShadow: {
        glow: "0 0 20px rgba(0, 255, 157, 0.3)",
        "glow-bio": "0 0 30px rgba(0, 212, 255, 0.25)",
        "glow-void": "0 0 25px rgba(139, 92, 246, 0.3)",
        abyss: "0 25px 50px -12px rgba(0, 0, 0, 0.6)",
        glass: "0 8px 32px rgba(0, 0, 0, 0.3)",
      },
      backgroundImage: {
        "gradient-radial": "radial-gradient(var(--tw-gradient-stops))",
        "ocean-depth":
          "linear-gradient(180deg, #020810 0%, #081a2e 35%, #0d2847 70%, #123660 100%)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        float: "float 6s ease-in-out infinite",
        "shimmer": "shimmer 3s linear infinite",
        "bubble": "bubble 8s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-8px)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        bubble: {
          "0%, 100%": { transform: "scale(1) translateY(0)", opacity: "0.6" },
          "50%": { transform: "scale(1.05) translateY(-4px)", opacity: "0.8" },
        },
        "glow-pulse": {
          "0%, 100%": { boxShadow: "0 0 20px rgba(0, 255, 157, 0.2)" },
          "50%": { boxShadow: "0 0 40px rgba(0, 255, 157, 0.4)" },
        },
      },
      backdropBlur: {
        xs: "2px",
      },
    },
  },
  plugins: [],
};
