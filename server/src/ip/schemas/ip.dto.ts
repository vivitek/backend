export interface IpCreation {
    v4ip: string;
    v6ip: string
}

export interface IpUpdate {
    v4ip?: string;
    v6ip?: string;
}

export interface IpDTO {
    _id: string;
    v4ip: string
    v6ip: string
}