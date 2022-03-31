import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import configuration from './configuration';
import { MongoConfigService } from './config.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
/**
 * Import and provide app configuration related classes.
 *
 * @module
 */
@Module({
  imports: [
    ConfigModule.forRoot({
      load: [configuration],
      validationSchema: Joi.object({
        MONGO_URI: Joi.string().default('localhost'),
        MONGO_PORT: Joi.number().default(3306),
        MONGO_USERNAME: Joi.string().default('nestjs'),
        MONGO_PASSWORD: Joi.string().default('nestjs'),
        MONGO_DATABASE: Joi.string().default('nestjs'),
        MONGO_RUN_MIGRATION: Joi.boolean().default(false),
        MONGO_ENTITIES: Joi.string().default('dist/**/*.entity.*{ts,js}'),
        MONGO_RUN_SYNCHRONIZE: Joi.boolean().default(false),
      }),
    }),
  ],
  providers: [ConfigService, MongoConfigService],
  exports: [ConfigService, MongoConfigService],
})
export class MongoConfigModule {}
