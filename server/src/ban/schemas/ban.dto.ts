import { RouterDTO } from 'src/router/schemas/router.dto';

export interface BanUpdate {
  address?: string;
  banned?: boolean;
  routerSet?: string;
}

export class BanDTO {
  _id: string;
  address: string;
  banned: boolean;
  routerSet: RouterDTO;
}
