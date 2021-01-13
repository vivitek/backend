import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Router, RouterSchema } from './schemas/router.schema';
import { RouterService } from './router.service';
import { RouterResolver } from './router.resolver';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: Router.name, schema: RouterSchema }]),
  ],
  providers: [RouterService, RouterResolver],
})
export class RouterModule {}
