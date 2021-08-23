import { Logger, UseGuards } from "@nestjs/common"
import { Resolver, Query, Mutation, Args } from "@nestjs/graphql"
import { AuthGuard } from "../auth/auth.guard"
import { OpenVVRTService, Url } from "./openvvrt.service";
import { Cpu, Ram, Storage } from "./schema/openvvrt.output"

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
        return await this.service.request(id, Url.Cpu, "GET")
    }

    @Query(() => Ram)
    async ram(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Getting RAM stats for device ${id}`)
        return await this.service.request(id, Url.Ram, "GET")
    }

    @Query(() => Storage)
    async storage(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Getting storage stats for device ${id}`)
        return await this.service.request(id, Url.Storage, "GET")
    }

    @Query(() => Number)
    async uptime(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Getting uptime for device ${id}`)
        return await this.service.request(id, Url.Uptime, "GET")
    }

    @Mutation(() => String)
    async reboot(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Restarting device ${id}`)
        await this.service.request(id, Url.Reboot, "POST")
        return "OK";
    }

    @Mutation(() => String)
    async poweroff(
		@Args('id', {type: () => String}) id: string
    ) {
        this.logger.log(`Shuting down device ${id}`)
        await this.service.request(id, Url.Poweroff, "POST")
        return "OK";
    }

    @Mutation(() => [String])
    async logs(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Getting logs for ${service || "all services"} on device ${id}`)
        return await this.service.request(id, Url.Logs, "GET", {service})
    }

    @Mutation(() => [String])
    async build(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Building ${service || "all services"} on device ${id}`)
        return await this.service.request(id, Url.Build, "GET", {service})
    }

    @Mutation(() => [String])
    async start(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Starting ${service || "all services"} on device ${id}`)
        return await this.service.request(id, Url.Logs, "GET", {service})
    }

    @Mutation(() => [String])
    async stop(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Stopping ${service || "all services"} on device ${id}`)
        return await this.service.request(id, Url.Stop, "POST", {service})
    }

    @Mutation(() => [String])
    async restart(
		@Args('id', {type: () => String}) id: string,
        @Args('service', {type: () => String, defaultValue: null}) service: string
    ) {
        this.logger.log(`Restarting ${service || "all services"} on device ${id}`)
        return await this.service.request(id, Url.Logs, "POST", {service})
    }
}