import { Router } from "express";
import { VentaDataSourceImp } from "../../infraestructure/datasource/venta.datasource";
import { ProductoDatasourceImpl } from "../../infraestructure/datasource/producto.datasource";
import { ClienteDatasourceImpl } from "../../infraestructure/datasource/cliente.datasorce";
import { ClienteRepositoryIml } from "../../infraestructure/repositories/cliente.repository.impl";
import { VentaRepositoryIml } from "../../infraestructure/repositories/venta.repository";
import { ProductoRepositoryIml } from "../../infraestructure/repositories/producto.repository";
import { VentaController } from "./controller";
import { EmailService } from "../email/email.service";





export class VentaRoutes {


    static get routes() : Router {
  
      const router = Router();
  
      const datasource= new VentaDataSourceImp();
      const productoDatasource = new ProductoDatasourceImpl();
      const clienteDataSource = new ClienteDatasourceImpl();

      const repository = new VentaRepositoryIml(datasource);
      const productoRepository = new ProductoRepositoryIml(productoDatasource);
      const clienteRepository = new ClienteRepositoryIml(clienteDataSource);

      const emailService = new EmailService();

      const ventaController = new VentaController(repository,clienteRepository, productoRepository,emailService);

      
      router.get('/', ventaController.getVentas );
      router.get('/clientes/:id', ventaController.getVentasByClientes );
      router.post('/', ventaController.makeVenta );
      router.post('/fechas', ventaController.getVentasByFechas);
      router.post('/ganancias', ventaController.getVentasGanancias);
      router.put('/:id', ventaController.updateById );
      router.put('/cambiarEstado:id', ventaController.changeEstado );
  
      return router;
    }
  
  }