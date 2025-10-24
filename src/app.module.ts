import configuration from "@config/app/configuration";
import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { validateConfig } from "@utils/validateConfig";

@Module({
	imports: [
		ConfigModule.forRoot({
			isGlobal: true,
			load: [configuration],
			validate: validateConfig,
		}),
	],
})
export class AppModule {}
