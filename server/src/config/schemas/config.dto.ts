import { Service } from "../../service/schemas/service.schema";

export class ConfigCreation {
    name: string;
    services: Array<Service>
}

export class ConfigUpdate {
    name?: string;
    services?: Array<Service>
}

export class ConfigDTO {
    _id: string;
    name: string;
    services: Array<Service>;
}