export default () => {
	if (!process.env.PORT) {
		throw new Error("Environment variable PORT is required!");
	}

	return {
		port: parseInt(process.env.PORT, 10),
	};
};
