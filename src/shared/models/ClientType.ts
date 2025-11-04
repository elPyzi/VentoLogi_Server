export const ClientType = {
	INDIVIDUAL: "individual",
	LEGAL: "legal",
} as const;

export type ClientType = (typeof ClientType)[keyof typeof ClientType];
