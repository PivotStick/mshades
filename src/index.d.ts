export function generate(
	hex: string,
	referenceColors?: {
		name: string;
		id: string;
		shades: {
			number: number;
			hexcode: string;
		}[];
	}[]
): {
	hexcode: string;
	hue: number;
	lightness: number;
	luminance: number;
	number: number;
	saturation: number;
}[];

export function myshades(palettes: Record<string, string>): Record<string, string>;
