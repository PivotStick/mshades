export function myshades(palettes?: Record<string, string>, options: { generate: "css" }): string;
export function myshades(
	palettes?: Record<string, string>,
	options: { generate: "object" }
): Record<string, string>;
