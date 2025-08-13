import {
  defineConfig,
  presetWind3,
  transformerDirectives,
  transformerVariantGroup,
  presetIcons,
} from "unocss";

export default defineConfig({
  presets: [presetWind3(), presetIcons({ scale: 1.2 })],
  transformers: [transformerDirectives(), transformerVariantGroup()],
});
