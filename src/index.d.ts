export function myshades(
	palettes?: Record<string, string | null>,
	options: { generate: "css" }
): string;

export function myshades(
	palettes?: Record<string, string | null>,
	options: { generate: "object" }
): Record<string, string>;
