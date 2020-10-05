import { Service } from "../../service/schemas/service.schema";

export interface ConfigCreation {
    name: string;
    services: Array<Service>
}

export interface ConfigUpdate {
    name?: string;
    services?: Array<Service>
}

export interface ConfigDTO {
    _id: string;
    name: string;
    services: Array<Service>;
}