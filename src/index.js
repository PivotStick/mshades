import { generateTailwindColorFamily } from "./functions/generateTailwindColorFamily";
import { tailwindColors3 } from "./colors/tailwind3";

export const generate = (hex = chroma.random(), referenceColors = tailwindColors3) =>
	generateTailwindColorFamily(hex, referenceColors);

/**
 * @param {Record<string, string>} palettes
 */
export const myshades = (palettes = {}) => {
	const keys = Object.entries(palettes);
	const variables = {};

	for (const [key, hex] of keys) {
		const shades = generateTailwindColorFamily(hex, tailwindColors3);

		// Loop two time to have them in correct order
		for (const shade of shades) {
			variables[`--${key}-${shade.number}`] = shade.hexcode;
		}

		for (const shade of shades) {
			variables[`--on-${key}-${shade.number}`] =
				shade.luminance < 40 ? `var(--${key}-100)` : `var(--${key}-900)`;
		}
	}

	return variables;
};
