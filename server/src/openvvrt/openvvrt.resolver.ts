import { Logger, UseGuards } from "@nestjs/common"
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { AuthGuard } from "../auth/auth.guard"
import { OpenVVRTService, Url } from "./openvvrt.service";
import { Cpu, Ram } from "./schema/openvvrt.output"

@Resolver()
@UseGuards(new AuthGuard())
export class OpenVVRTResolver {
    private logger: Logger;

    constructor(private service: OpenVVRTService) {
        this.logger = new Logger('OpenVVRTResolver')
    }

    @Query(() => [Cpu])
    async cpu(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Getting CPU stats for device ${id}`)
    }

    @Query(() => Ram)
    async ram(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Getting RAM stats for device ${id}`)
    }

    @Query(() => Storage)
    async storage(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Getting storage stats for device ${id}`)
    }

    @Query(() => Number)
    async uptime(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Getting uptime for device ${id}`)
    }

    @Mutation(() => null)
    reboot(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Restarting device ${id}`)
    }

    @Mutation(() => null)
    poweroff(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Shuting down device ${id}`)
    }

    @Mutation(() => [String])
    logs(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Getting logs for ${service || "all services"} on device ${id}`)
    }

    @Mutation(() => [String])
    build(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Building ${service || "all services"} on device ${id}`)
    }

    @Mutation(() => [String])
    start(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Starting ${service || "all services"} on device ${id}`)
    }

    @Mutation(() => [String])
    stop(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Stopping ${service || "all services"} on device ${id}`)
    }

    @Mutation(() => [String])
    restart(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Restarting ${service || "all services"} on device ${id}`)
    }
}