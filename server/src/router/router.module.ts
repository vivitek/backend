import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Router, RouterSchema } from './schemas/router.schema';
import { RouterService } from './router.service';
import { RouterResolver } from './router.resolver';
import { JwtModule } from '@nestjs/jwt';
import { jwtConstants } from '../auth/constants';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Router.name, schema: RouterSchema }]),
    JwtModule.register({
      secret: jwtConstants.secret
    })
  ],
  providers: [RouterService, RouterResolver],
  exports: [RouterService]
})
export class RouterModule {}
