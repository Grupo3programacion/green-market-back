import { ClienteEntity } from '../../entities/cliente.entity';
import { ClienteRepository } from '../../repositories/cliente.repository';


export interface GetClienteUseCase {
  execute( id: number ): Promise<ClienteEntity>
}


export class GetCliente implements GetClienteUseCase {
  
  constructor(
    private readonly repository: ClienteRepository,
  ) {}
  
  execute( id: number ): Promise<ClienteEntity> {
    return this.repository.findById(id);
  }

}