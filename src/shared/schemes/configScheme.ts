import * as z from "zod";

export const configScheme = z.object({
	PORT: z.coerce.number(),
	API_PREFIX: z.string(),
});

export type ENV = z.infer<typeof configScheme>;
