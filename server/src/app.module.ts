import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { BanModule } from './ban/ban.module';
import { TagModule } from './tag/tag.module';
import { RouterModule } from './router/router.module';
import { ServiceModule } from './service/service.module';
import { ConfigModule } from './config/config.module';
import { BeamsModule } from './beams/beams.module';
import { GraphQLModule } from '@nestjs/graphql';
import { AppController } from './app.controller';
import { OpenVVRTModule } from './openvvrt/openvvrt.module';

const MODULES = [
  MongooseModule.forRoot(`mongodb://${process.env.MONGO}/vivi`),
  GraphQLModule.forRoot({
    installSubscriptionHandlers: true,
    autoSchemaFile: true,
    context: ({ req, connection }) => ({
      headers: req?.headers || connection.context.headers,
    }),
  }),
  BanModule,
  TagModule,
  AuthModule,
  UsersModule,
  RouterModule,
  ServiceModule,
  ConfigModule,
  BeamsModule,
  OpenVVRTModule
];

@Module({
  imports: MODULES,
  controllers: [AppController],
})
export class AppModule {}
