import { ConfigService } from "@nestjs/config";
import { NestFactory } from "@nestjs/core";
import type { ENV } from "@schemes/configScheme";
import { AppModule } from "./app.module";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	const configService = app.get<ConfigService<ENV>>(ConfigService);

	const apiPrefix = configService.get<string>("API_PREFIX");
	const port = configService.get<number>("PORT");

	app.setGlobalPrefix(apiPrefix);
	await app.listen(port);
}
bootstrap();
