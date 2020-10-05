export interface BanCreation {
    address: string;
    banned: boolean;
    routerSet: string;
}

export interface BanUpdate {
    address?: string;
    banned?: boolean;
    routerSet?: string;
}

export interface BanDTO {
    _id: string;
    address: string;
    banned: boolean;
    routerSet: string;
}