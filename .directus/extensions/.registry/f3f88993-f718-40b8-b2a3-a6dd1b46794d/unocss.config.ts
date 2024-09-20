import {
    defineConfig,
    presetAttributify,
    presetIcons,
    presetTypography,
    presetUno,
    presetWebFonts,
    transformerDirectives,
    transformerVariantGroup,
} from "unocss";

export default defineConfig({
    blocklist: ['container'],
    shortcuts: [],
    presets: [
        presetUno(),
        presetAttributify(),
        presetIcons({
            scale: 1.2,
        }),
        presetTypography(),
    ],
    transformers: [transformerDirectives(), transformerVariantGroup()],
    theme: {
        colors: {
        },
        container: {
            center: true,
            padding: "0.9375rem",
            screens: {
                sm: "640px",
                md: "768px",
                lg: "1024px",
                xl: "1200px",
            },
        },
        screens: {
            xs: "0",
            sm: "576px",
            md: "768px",
            lg: "1024px",
            xl: "1200px",
            xxl: "1400px",
        },
    },
});
