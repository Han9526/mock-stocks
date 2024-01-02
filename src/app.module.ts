// import Joi from 'joi';
import * as Joi from 'joi';

import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule, TypeOrmModuleOptions } from '@nestjs/typeorm';

import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { ShowdetailModule } from './showdetail/showdetail.module';
import { TicketingModule } from './ticketing/ticketing.module';
import { ShowModule } from './show/show.module';
import { ProfileModule } from './profile/profile.module';
import { User } from './user/entities/user.entity';
import { Show } from './show/entities/show.entity';
import { Ticketing } from './ticketing/entities/ticketing.entity';
import { Profile } from './profile/entities/profile.entity';
import { ShowDetail } from './showdetail/entities/showdetail.entity';

const typeOrmModuleOptions = {
  useFactory: async (
    configService: ConfigService,
  ): Promise<TypeOrmModuleOptions> => ({
    namingStrategy: new SnakeNamingStrategy(),
    type: 'mysql',
    username: configService.get<string>('DB_USERNAME'),
    password: configService.get<string>('DB_PASSWORD'),
    host: configService.get<string>('DB_HOST'),
    port: configService.get<number>('DB_PORT'),
    database: configService.get<string>('DB_NAME'),
    entities: [User, Profile, Show, Ticketing, ShowDetail],
    synchronize: configService.get('DB_SYNC'),
    logging: true,
  }),
  inject: [ConfigService],
};

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      validationSchema: Joi.object({
        JWT_SECRET_KEY: Joi.string().required(),
        DB_USERNAME: Joi.string().required(),
        DB_PASSWORD: Joi.string().required(),
        DB_HOST: Joi.string().required(),
        DB_PORT: Joi.number().required(),
        DB_NAME: Joi.string().required(),
        DB_SYNC: Joi.boolean().required(),
      }),
    }),
    TypeOrmModule.forRootAsync(typeOrmModuleOptions),
    AuthModule,
    UserModule,
    ProfileModule,
    ShowModule,
    TicketingModule,
    ShowdetailModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
