import {  CreateClienteDto, UpdateClienteDto } from '../dtos';
import { changeStatusClienteDto } from '../dtos/cliente/changestatus-cliente.dto';
import { ClienteEntity } from '../entities/cliente.entity';

export abstract class ClienteDatasource {

  abstract create( createClienteDto: CreateClienteDto ): Promise<ClienteEntity>;
  abstract getAll(): Promise<ClienteEntity[]>;
  abstract findById( id: number ): Promise<ClienteEntity>;
  abstract updateById( updateClienteDto: UpdateClienteDto ): Promise<ClienteEntity>;
  abstract deleteById( changeStatusClienteDto:changeStatusClienteDto ): Promise<ClienteEntity>;
  abstract activateCliente ( changeStatusClienteDto:changeStatusClienteDto ) : Promise<ClienteEntity>;
  abstract obtenerByCorreo( email: string ): Promise<ClienteEntity>;

}