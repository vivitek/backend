import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { BanModule } from './ban/ban.module';
import { TagModule } from './tag/tag.module';
import { DatabaseModule } from './database/database.module';
import { RouterModule } from './router/router.module';
import { IpModule } from './ip/ip.module';
import { ServiceModule } from './service/service.module';
import { ConfigModule } from './config/config.module';
import { TemplateModule } from './template/tempalte.module';
import { ConnectionsModule } from './connections/connections.module';

const MODULES = [
  MongooseModule.forRoot(`mongodb://${process.env.MONGO}/vivi`),
  BanModule,
  TagModule,
  AuthModule,
  UsersModule,
  DatabaseModule,
  RouterModule,
  IpModule,
  ServiceModule,
  ConfigModule,
  TemplateModule,
  ConnectionsModule
]

@Module({
  imports: MODULES,
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
