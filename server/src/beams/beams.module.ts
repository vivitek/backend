import { Module } from "@nestjs/common";
import { UsersModule } from "../users/users.module";
import { BeamsController } from "./beams.controller";
import { beamsProviders } from "./beams.provider";
import { BeamsService } from "./beams.service";

@Module({
    controllers: [BeamsController],
    providers: [...beamsProviders, BeamsService],
    imports: [UsersModule]
})
export class BeamsModule {}