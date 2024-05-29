import { ClienteEntity } from '../../entities/cliente.entity';
import { ClienteRepository } from '../../repositories/cliente.repository';


export interface GetClientesUseCase {
  execute(): Promise<ClienteEntity[]>
}


export class GetClientes implements GetClientesUseCase {
  
  constructor(
    private readonly repository: ClienteRepository,
  ) {}
  
  execute(): Promise<ClienteEntity[]> {
    return this.repository.getAll();
  }

}