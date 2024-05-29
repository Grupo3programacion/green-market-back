import { Router } from "express";
import { ClienteRepository } from "../../domain/repositories/cliente.repository";
import { ClienteRepositoryIml } from '../../infraestructure/repositories/cliente.repository.impl';
import { ClienteDatasourceImpl } from "../../infraestructure/datasource/cliente.datasorce";
import { AuthController } from "./controller";


export class AuthRouter {


    static get routes() : Router {
  
      const router = Router();

      const dataSource = new ClienteDatasourceImpl();
      const clienteRepository = new ClienteRepositoryIml(dataSource);
      const authRoutes = new AuthController(clienteRepository);

      router.post('/login', authRoutes.loginUser);

      return router;
    }
}