import { Ip } from "../../ip/schemas/ip.schema";
import { Tag } from "../../tag/schemas/tag.schema";

export interface ServiceCreation {
  displayName: string;
  name: string;
  bandwidth: number;
  tags: Array<Tag>;
  ips: Array<Ip>;
}

export interface ServiceUpdate {
  displayName?: string;
  name?: string;
  bandwidth?: number;
  tags?: Array<Tag>;
  ips?: Array<Ip>;
}

export interface ServiceDTO {
  _id: string;
  displayName: string;
  name: string;
  bandwidth: number;
  tags: Array<Tag>;
  ips: Array<Ip>;
}