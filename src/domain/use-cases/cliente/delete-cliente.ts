import { ClienteEntity } from '../../entities/cliente.entity';
import { CustomError } from '../../errors/custom.error';
import { ClienteRepository } from '../../repositories/cliente.repository';
import { changeStatusClienteDto } from '../../dtos/cliente/changestatus-cliente.dto';


export interface DeleteClienteUseCase {
  execute( changeStatusClienteDto : changeStatusClienteDto ): Promise<ClienteEntity>
}


export class DeleteCliente implements DeleteClienteUseCase {
  
  constructor(
    private readonly repository: ClienteRepository,
  ) {}
  
  async execute( changeStatusClienteDto : changeStatusClienteDto ): Promise<ClienteEntity> {


    const cliente = await this.repository.findById(changeStatusClienteDto.id);

    if(!cliente)
      throw CustomError.resourceExists('Este id no esta registrado');

    if(cliente.estado == 0)
      throw CustomError.resourceExists('Este cliente ya fue eliminado');

    return this.repository.deleteById(changeStatusClienteDto);
  }

}