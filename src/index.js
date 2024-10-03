import { generateTailwindColorFamily } from "./functions/generateTailwindColorFamily";
import { tailwindColors3 } from "./colors/tailwind3";
import chroma from "chroma-js";

export const generate = (hex = chroma.random(), referenceColors = tailwindColors3) =>
	generateTailwindColorFamily(hex, referenceColors);

const generateOptions = /** @type {const} */ (["object", "css"]);

/**
 * @param {Record<string, string | null>} palettes
 * @param {{
 *  generate: typeof generateOptions[number]
 * }=} options
 */
export const myshades = (palettes = {}, options = {}) => {
	const object = generateObject(palettes);

	if (options.generate === "object") return object;
	if (options.generate === "css") {
		const names = Object.keys(palettes);
		const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

		let root = ":root {\n";
		let css = "";

		for (let i = 0; i < names.length; i++) {
			const name = names[i];

			if (i === 0) {
				css += ":root,\n";
			}

			css += `.${name} {\n`;
			const roots = [[], []];
			const appends = [[], []];

			for (const shade of shades) {
				const color = `--${name}-${shade}`;
				const on = `--on-${name}-${shade}`;

				roots[0].push(`\t${color}: ${object[color]};`);
				roots[1].push(`\t${on}: ${object[on]};`);

				appends[0].push(`\t--color-${shade}: var(${color});`);
				appends[1].push(`\t--on-color-${shade}: var(${on});`);
			}

			for (const lines of roots) {
				if (lines.length) {
					root += lines.join("\n");
					root += "\n";
				}
			}

			for (const lines of appends) {
				if (lines.length) {
					css += lines.join("\n");
					css += "\n";
				}
			}

			css += "}\n\n";
		}

		root += "}\n\n";

		return root + css.trim();
	}

	const joined = generateOptions.map((o) => `"${o}"`).join(" or ");
	throw new Error(`generate can only be ${joined}. "${options.generate}" was given.`);
};

/**
 * @param {Record<string, string | null>} [palettes={}]
 */
function generateObject(palettes = {}) {
	const keys = Object.entries(palettes);
	const variables = {};

	for (let [key, hex] of keys) {
		hex ??= palettes[key] = chroma.random();
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
}
