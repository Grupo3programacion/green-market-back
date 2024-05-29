import { Router } from "express";
import { CategoriaDatasourceImpl } from "../../infraestructure/datasource/categoria.datasource";
import { CategoriaRepositoryIml } from "../../infraestructure/repositories/categoria.repository";
import { CategoriaController } from "./controller";






export class CategoriaRoutes {


    static get routes() : Router {
  
      const router = Router();
  
      const datasource= new CategoriaDatasourceImpl();
      const repository = new CategoriaRepositoryIml(datasource);
      const categoriaController = new CategoriaController(repository);
  
      router.get('/', categoriaController.getCategorias );
      router.get('/:id', categoriaController.getCategoriaById );
      
      router.post('/', categoriaController.createCategoria );
      router.put('/:id', categoriaController.updateCategoria);
      router.delete('/:id', categoriaController.deleteCategoria );
  
      return router;
    }
  }