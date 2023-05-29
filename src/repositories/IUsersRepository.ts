import { Clients } from '@prisma/client';

export namespace ICreateClientRepoDTO {
  export type Params = {
    client: string;
    sessionClient: string;
    telephone: string;
    limitSend: number;
    isActive: boolean;
    obs: string;
  };

  export type Result = {
    id: string;
  };
}

export namespace IFindExistsBySessionClientDTO {
  export type Params = {
    sessionClient: string;
  };

  export type Result = {
    isExists: boolean;
  };
}

export namespace IFindExistsByTelephoneDTO {
  export type Params = {
    telephone: string;
  };

  export type Result = {
    isExists: boolean;
  };
}

// export interface IGetUserByEmail {
//   email: string;
// }

export abstract class IClientsRepository {
  abstract Create(
    data: ICreateClientRepoDTO.Params
  ): Promise<ICreateClientRepoDTO.Result>;

  abstract FindExistsBySessionClient(
    data: IFindExistsBySessionClientDTO.Params
  ): Promise<IFindExistsBySessionClientDTO.Result>;

  abstract FindExistsByTelephone(
    data: IFindExistsByTelephoneDTO.Params
  ): Promise<IFindExistsByTelephoneDTO.Result>;

  abstract getManyClients(): Promise<Clients[]>;
  // abstract getAll(data?: IGetAccountsDTO): Promise<Users[]>;
  // abstract getById(data: IGetUserById): Promise<Users>;
  // abstract deleteById(data: IDeleteById): Promise<void>;
}
