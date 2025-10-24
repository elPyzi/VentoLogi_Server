import { configScheme, type ENV } from "@schemes/configScheme";

export const validateConfig = (config: Record<string, unknown>): ENV => {
	const validated = configScheme.safeParse(config);

	if (!validated.success) {
		console.error("Invalid environment variables:");
		console.error(validated.error);
		process.exit(1);
	}

	return validated.data;
};
