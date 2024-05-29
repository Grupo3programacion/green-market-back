import { CreateClienteDto } from '../../dtos';
import { changeStatusClienteDto } from '../../dtos/cliente/changestatus-cliente.dto';
import { ClienteEntity } from '../../entities/cliente.entity';
import { CustomError } from '../../errors/custom.error';
import { ClienteRepository } from '../../repositories/cliente.repository';


export interface CreateClienteUseCase {
  execute( dto: CreateClienteDto ): Promise<ClienteEntity>
}

export class CreateCliente implements CreateClienteUseCase {
  
  constructor(
    private readonly repository: ClienteRepository,
  ) {}
  
  async execute( dto: CreateClienteDto ): Promise<ClienteEntity> {

    let cliente = null;
    try{
      
     cliente = await this.repository.findById(dto.id);
    }catch(eerror) {

    }

    if(cliente && cliente.estado == 0){
      const [error, activateCliente] = changeStatusClienteDto.create({id: dto.id, estado : 1});
      if(activateCliente)
        return this.repository.activateCliente(activateCliente);
      throw CustomError.internalServer("Error al activar el cliente");
    }

    if(cliente)
      throw CustomError.resourceExists('Este id ya esta registrado');


    return this.repository.create(dto);
  }

}