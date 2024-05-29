import { Request, Response } from "express";
import { VentaRepository } from "../../domain/repositories/venta.repository";
import { GetVentas } from "../../domain/use-cases/venta/get-all-ventas";
import { GetVentasByClientes } from "../../domain/use-cases/venta/get-ventas-by-cliente";
import { MakeVenta } from "../../domain/use-cases/venta/make-venta";
import { CreateVentaDto } from '../../domain/dtos/venta/create-venta.dto';
import { ClienteRepository } from "../../domain/repositories/cliente.repository";
import { ProductoRepository } from "../../domain/repositories/producto.repository";
import { UpdateVentaDto } from "../../domain";
import { changeStateVenta } from "../../domain/use-cases/venta/change-state-venta";
import { UpdateVenta } from "../../domain/use-cases/venta/update-venta";
import { GetVentasByFechas } from "../../domain/use-cases/venta/get-ventas-by-fechas";
import { GetVentasGananciasUseCase } from "../../domain/use-cases/venta/get-ganancias-ventas";
import { EmailService } from "../email/email.service";




enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
  }


export class VentaController {

    //* DI
    constructor(
      private readonly ventaRepository: VentaRepository,
      private readonly clienteRepository: ClienteRepository,
      private readonly productoRepository: ProductoRepository,
      private readonly emailService: EmailService
    ) { }
  
  
    public getVentas = ( req: Request, res: Response ) => {
  
      new GetVentas( this.ventaRepository )
        .execute()
        .then( ventas => res.json( ventas ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };

    public getVentasByClientes = ( req: Request, res: Response ) => {
      const id = +req.params.id;
  
      new GetVentasByClientes( this.ventaRepository )
        .execute( id )
        .then( ventas => res.json( ventas ) )
        .catch( error => res.status( 400 ).json( { error } ) );

    };

    public getVentasByFechas = ( req: Request, res: Response ) => {
      const id = +req.params.id;

      const {fechaIni, fechaFin} = req.body;
  
      new GetVentasByFechas( this.ventaRepository )
        .execute( new Date(fechaIni),  new Date(fechaFin) )
        .then( ventas => res.json( ventas ) )
        .catch( error => res.status( 400 ).json( { error } ) );

    };
  
    public makeVenta = ( req: Request, res: Response ) => {

      const [ error, createVentaDto ] = CreateVentaDto.create( req.body );
      if ( error ) return res.status( 400 ).json( { error } );

      const makeVenta= new MakeVenta( this.ventaRepository, this.clienteRepository, this.productoRepository,this.emailService);

      makeVenta
        .execute( createVentaDto! )
        .then((venta) =>  { return makeVenta.enviarCorreo(venta)} )
        .then( venta => res.json( venta ) )
        .catch( error => res.status( 400 ).json( { error } ) );
  
    };
  
    public changeEstado = ( req: Request, res: Response ) => {
      const id = +req.params.id;
      const [ error, estado ] = UpdateVentaDto.create( { ...req.body, id } );

      if ( error ) return res.status( 400 ).json( { error } );
      
      const enumEstado = <EstadoVenta><unknown>estado

      new changeStateVenta( this.ventaRepository )
        .execute(id, enumEstado)
        .then( venta => res.json( venta ) )
        .catch( error => res.status( 400 ).json( { error } ) );
    };
  
    public updateById = ( req: Request, res: Response ) => {

      const id = +req.params.id;
  
      const [error, updateVentaDto] =  UpdateVentaDto.create({id, estado:1});
          if ( error ) return res.status( 400 ).json( { error } );
  
      new UpdateVenta(this.ventaRepository)
        .execute(updateVentaDto!)
        .then( producto => res.json( producto ))
        .catch( error => res.status( 400 ).json( { error } ) );
    };


    public getVentasGanancias = ( req: Request, res: Response ) => {
      const id = +req.params.id;

      const {fechaIni, fechaFin} = req.body;
  
      new GetVentasGananciasUseCase( this.ventaRepository )
        .execute( new Date(fechaIni),  new Date(fechaFin) )
        .then( ventas => res.json( ventas ) )
        .catch( error => res.status( 400 ).json( { error } ) );

    };

  } 