import { UpdateClienteDto } from '../../dtos';
import { ClienteEntity } from '../../entities/cliente.entity';
import { CustomError } from '../../errors/custom.error';
import { ClienteRepository } from '../../repositories/cliente.repository';


export interface UpdateClienteUseCase {
  execute( dto: UpdateClienteDto ): Promise<ClienteEntity>
}


export class UpdateCliente implements UpdateClienteUseCase {
  
  constructor(
    private readonly repository: ClienteRepository,
  ) {}
  
  async execute( dto: UpdateClienteDto ): Promise<ClienteEntity> {
    
    const cliente = await this.repository.findById(dto.id);

    if(!cliente)
      throw CustomError.resourceExists('Esta cedula no esta registrada');

    if(cliente.estado == 0)
      throw CustomError.resourceExists('Este cliente ya fue eliminado');

    console.log(dto);
    
    return this.repository.updateById(dto);

  }

}