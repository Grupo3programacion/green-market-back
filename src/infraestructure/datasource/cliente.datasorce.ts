import { prisma } from '../../data/postgres';
import { CreateClienteDto, UpdateClienteDto } from '../../domain';
import { ClienteDatasource } from '../../domain/datasources/cliente.datasources';
import { ClienteEntity } from '../../domain/entities/cliente.entity';
import { changeStatusClienteDto } from '../../domain/dtos/cliente/changestatus-cliente.dto';
import { CustomError } from '../../domain/errors/custom.error';




export class ClienteDatasourceImpl implements ClienteDatasource {

  async create( createClienteDto: CreateClienteDto ): Promise<ClienteEntity> {
    const cliente = await prisma.cliente.create({
      data: createClienteDto!
    });

    return ClienteEntity.fromObject( cliente );
  }

  async getAll(): Promise<ClienteEntity[]> {
    const clientes = await prisma.cliente.findMany();
    return clientes.map( (todo: any) => ClienteEntity.fromObject(todo) );
  }

  async findById( id: number ): Promise<ClienteEntity> {
    const cliente = await prisma.cliente.findFirst({
      where: { id }
    });

    if ( !cliente ) throw `Cliente with id ${ id } not found`;
    
    return ClienteEntity.fromObject(cliente);
  }

  async updateById( updateClienteDto: UpdateClienteDto ): Promise<ClienteEntity> {
    
    await this.findById( updateClienteDto.id );
    
    const updatedCliente = await prisma.cliente.update({
      where: { id: updateClienteDto.id },
      data: updateClienteDto!.values
    });

    return ClienteEntity.fromObject(updatedCliente);
  }

  async deleteById( changeStatusClienteDto : changeStatusClienteDto ): Promise<ClienteEntity> {

    await this.findById( changeStatusClienteDto.id );

    const deleted = await prisma.cliente.update({
      where: {id: changeStatusClienteDto.id},
      data: changeStatusClienteDto!.values
  });
  
    return ClienteEntity.fromObject( deleted );
  }

  async activateCliente ( changeStatusClienteDto:changeStatusClienteDto ): Promise<ClienteEntity> {    

    await this.findById(changeStatusClienteDto.id);

    const update = await prisma.cliente.update({
        where: {id: changeStatusClienteDto.id},
        data: changeStatusClienteDto!.values
    });

    return ClienteEntity.fromObject(update);
  }


  async obtenerByCorreo( email: string ): Promise<ClienteEntity> {
  
    
    const cliente = await prisma.cliente.findFirst({
      where: { correo: email },
    });


    if ( !cliente ) throw CustomError.notFound("El email no esta registrado");

    return ClienteEntity.fromObject(cliente);
  }

}