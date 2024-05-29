import { Router } from "express";
import { ClienteDatasourceImpl } from '../../infraestructure/datasource/cliente.datasorce';
import { ClienteRepositoryIml } from '../../infraestructure/repositories/cliente.repository.impl';
import { ClienteController } from './controller';

export class ClienteRoutes {


    static get routes() : Router {
  
      const router = Router();
  
      const datasource= new ClienteDatasourceImpl();
      const repository = new ClienteRepositoryIml(datasource);
      const clienteController = new ClienteController(repository);
  
      router.get('/', clienteController.getClientes );
      router.get('/:id', clienteController.getClienteById );
      
      router.post('/', clienteController.createCliente );
      router.put('/:id', clienteController.updateCliente );
      router.delete('/:id', clienteController.deleteCliente );
  
      return router;
    }
  }