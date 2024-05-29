import { CreateClienteDto, UpdateClienteDto } from "../../domain";
import { ClienteDatasource } from "../../domain/datasources/cliente.datasources";
import { changeStatusClienteDto } from "../../domain/dtos/cliente/changestatus-cliente.dto";
import { ClienteEntity } from "../../domain/entities/cliente.entity";
import { ClienteRepository } from "../../domain/repositories/cliente.repository";


export class ClienteRepositoryIml implements ClienteRepository {

    constructor(
        private readonly datasource: ClienteDatasource
    ){}

    create(createClienteDto: CreateClienteDto): Promise<ClienteEntity>{

       return this.datasource.create(createClienteDto); 
    }
    getAll(): Promise<ClienteEntity[]>{

        return this.datasource.getAll();
    }
    findById(id: number): Promise<ClienteEntity>{

        return this.datasource.findById(id);
    }
    updateById(updateClienteDto: UpdateClienteDto): Promise<ClienteEntity>{
        
        return this.datasource.updateById(updateClienteDto);
    }
    deleteById(changeStatusClienteDto: changeStatusClienteDto): Promise<ClienteEntity>{

        return this.datasource.deleteById(changeStatusClienteDto);
    }
    activateCliente(changeStatusClienteDto: changeStatusClienteDto): Promise<ClienteEntity>{

        return this.datasource.activateCliente(changeStatusClienteDto);
    }

    obtenerByCorreo( email: string ): Promise<ClienteEntity>{

        return this.datasource.obtenerByCorreo(email);
    }
}