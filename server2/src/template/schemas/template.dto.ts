import { Ban } from "src/ban/schemas/ban.schema";
import { Service } from "src/service/schemas/service.schema";
import { User } from "src/users/schemas/users.schema";

export interface TemplateCreation {
    name: string;
    author: User;
    hosts: Array<{
        banRef: Ban,
        banned: boolean
    }>
    services: Array<{
        serviceRef: Service,
        banned: boolean
    }>
}

export interface TemplateUpdate {
    name?: string;
    author?: User;
    hosts?: Array<{
        banRef: Ban,
        banned: boolean
    }>
    services?: Array<{
        serviceRef: Service,
        banned: boolean
    }>
}

export interface TemplateDTO {
    _id: string;
    name: string;
    author: User;
    hosts: Array<{
        banRef: Ban,
        banned: boolean
    }>
    services: Array<{
        serviceRef: Service,
        banned: boolean
    }>
}