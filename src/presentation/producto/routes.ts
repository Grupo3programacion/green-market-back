import { Router } from 'express';
import { ProductoController } from './controller';
import { ProductoDatasourceImpl } from '../../infraestructure/datasource/producto.datasource';
import { ProductoRepositoryIml } from '../../infraestructure/repositories/producto.repository';
import { CategoriaDatasourceImpl } from '../../infraestructure/datasource/categoria.datasource';
import { CategoriaRepositoryIml } from '../../infraestructure/repositories/categoria.repository';


export class ProductoRoutes {


  static get routes() : Router {

    const router = Router();

    const datasource= new ProductoDatasourceImpl();
    const datasourceCategoria = new CategoriaDatasourceImpl();
    const repository = new ProductoRepositoryIml(datasource);
    const categoriaRepository = new CategoriaRepositoryIml(datasourceCategoria);
    const productoController = new ProductoController(repository,categoriaRepository);

    router.get('/', productoController.getProductos );
    router.get('/:id', productoController.getProductoById );

    router.post('/filtrarByFechas', productoController.getProductosFechas);
    router.post('/', productoController.createProducto );
    router.put('/:id', productoController.updateProducto );
    router.delete('/:id', productoController.deleteProducto );

    return router;
  }

}