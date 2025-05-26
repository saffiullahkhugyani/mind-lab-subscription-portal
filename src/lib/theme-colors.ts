const themes = {

    Blue: {
        light: {
            background: "0 0% 100%",
            foreground: "222.2 84% 4.9%",
            card: "0 0% 100%",
            cardForeground: "222.2 84% 4.9%",
            popover: "0 0% 100%",
            popoverForeground: "222.2 84% 4.9%",
            primary: "221.2 83.2% 53.3%",
            primaryForeground: "210 40% 98%",
            secondary: "210 40% 96.1%",
            secondaryForeground: "222.2 47.4% 11.2%",
            muted: "210 40% 96.1%",
            mutedForeground: "215.4 16.3% 46.9%",
            accent: "210 40% 96.1%",
            accentForeground: "222.2 47.4% 11.2%",
            destructive: "0 84.2% 60.2%",
            destructiveForeground: "210 40% 98%",
            border: "214.3 31.8% 91.4%",
            input: "214.3 31.8% 91.4%",
            ring: "221.2 83.2% 53.3%",
            radius: "0.5rem",
        },
        dark: {
            background: "222.2 84% 4.9%",
            foreground: "210 40% 98%",
            card: "222.2 84% 4.9%",
            cardForeground: "210 40% 98%",
            popover: "222.2 84% 4.9%",
            popoverForeground: "210 40% 98%",
            primary: "217.2 91.2% 59.8%",
            primaryForeground: "222.2 47.4% 11.2%",
            secondary: "217.2 32.6% 17.5%",
            secondaryForeground: "210 40% 98%",
            muted: "217.2 32.6% 17.5%",
            mutedForeground: "215 20.2% 65.1%",
            accent: "217.2 32.6% 17.5%",
            accentForeground: "210 40% 98%",
            destructive: "0 62.8% 30.6%",
            destructiveForeground: "210 40% 98%",
            border: "217.2 32.6% 17.5%",
            input: "217.2 32.6% 17.5%",
            ring: "224.3 76.3% 48%",
        },
    }
};


// Define the type for available theme colors
type ThemeColors = keyof typeof themes;


export default function setGlobalColorTheme(
    themeMode: "light" | "dark",
    color: ThemeColors,
) {
    const theme = themes[color][themeMode] as {
        [key: string]: string;
    };

    for (const key in theme) {
        document.documentElement.style.setProperty(`--${key}`, theme[key]);
    }
}