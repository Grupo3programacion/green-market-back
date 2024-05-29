import { Router } from 'express';
import { ClienteRoutes } from './cliente/routes';
import { ProductoRoutes } from './producto/routes';
import { CategoriaRoutes } from './categoria/routes';
import { VentaRoutes } from './venta/router';
import { AuthRouter } from './auth/router';



export class AppRoutes {

  static get routes(): Router {

   

    const router = Router();

    router.use('/api/auth', AuthRouter.routes);

    router.use('/api/cliente',ClienteRoutes.routes);
    
    router.use('/api/producto',ProductoRoutes.routes );

    router.use('/api/categoria', CategoriaRoutes.routes);

    router.use('/api/venta', VentaRoutes.routes);

    return router;
  }

}