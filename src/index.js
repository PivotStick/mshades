import { generateTailwindColorFamily } from "./functions/generateTailwindColorFamily";
import { tailwindColors3 } from "./colors/tailwind3";

export const generate = (hex = chroma.random(), referenceColors = tailwindColors3) =>
	generateTailwindColorFamily(hex, referenceColors);

const generateOptions = /** @type {const} */ (["object", "css"]);

/**
 * @param {Record<string, string>} palettes
 * @param {{
 *  generate: typeof generateOptions[number]
 * }=} options
 */
export const myshades = (palettes = {}, { generate = "object" } = {}) => {
	const object = generateObject(palettes);

	if (generate === "object") return object;
	if (generate === "css") {
		const names = Object.keys(palettes);
		const shades = [50, 100, 200, 300, 400, 500, 600, 700, 800, 900, 950];

		let css = ":root,\n";

		for (let i = 0; i < names.length; i++) {
			const name = names[i];
			css += `.${name} {\n`;
			const appends = [[], [], [], []];

			for (const shade of shades) {
				const color = `--${name}-${shade}`;
				const on = `--on-${name}-${shade}`;

				appends[0].push(`\t${color}: ${object[color]};`);
				appends[1].push(`\t${on}: ${object[on]};`);

				appends[2].push(`\t--color-${shade}: var(${color});`);
				appends[3].push(`\t--on-color-${shade}: var(${on});`);
			}

			for (const lines of appends) {
				if (lines.length) {
					css += lines.join("\n");
					css += "\n";
				}
			}

			css += "}\n\n";
		}

		return css.trim();
	}

	const joined = generateOptions.map((o) => `"${o}"`).join(" or ");
	throw new Error(`generate can only be ${joined}. "${generate}" was given.`);
};

function generateObject(palettes = {}) {
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
}
