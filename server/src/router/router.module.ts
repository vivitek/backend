import { MongooseModule } from '@nestjs/mongoose';
import { Module } from '@nestjs/common';
import { Router, RouterSchema } from './schemas/router.schema';
import { RouterController } from './router.controller';
import { RouterService } from './router.service';

@Module({
	imports:[MongooseModule.forFeature([{ name: Router.name, schema: RouterSchema}])],
	controllers:[RouterController],
	providers:[RouterService]
})
export class RouterModule {}
