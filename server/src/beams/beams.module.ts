import { Module } from "@nestjs/common";
import { UsersModule } from "src/users/users.module";
import { UsersService } from "src/users/users.service";
import { BeamsController } from "./beams.controller";
import { beamsProviders } from "./beams.provider";
import { BeamsService } from "./beams.service";

@Module({
    controllers: [BeamsController],
    providers: [...beamsProviders, BeamsService],
    imports: [UsersModule]
})
export class BeamsModule {}