import { DetalleVenta } from "@prisma/client";
import { DetalleVentaEntity } from "../../entities/detalleVenta.entity";
import { CreateDetalleVentaDto } from "../detalleVenta/detalleVenta-create.dto";



enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
}

export class CreateVentaDto {

    private constructor(
      public readonly precioTotal: number,
      public readonly fechaVenta: Date,
      public readonly idCliente: number,
      public readonly estadoVenta: EstadoVenta,
      public readonly detalleVenta: CreateDetalleVentaDto[],
    ){}
    
    static create( props: {[key:string]: any} ): [string?, CreateVentaDto?]  {
  
      let { precioTotal, fechaVenta, idCliente, detalleVenta } = props;

      let fechaVentaSave = fechaVenta;
  
      if ( fechaVenta ) {
        fechaVentaSave = new Date( fechaVenta);
        if ( fechaVentaSave.toString() === 'Invalid Date' ) {
          return ['fecha venta must be a valid date']
        }
      }
  
      if ( !precioTotal ) return ['precio total property is required', undefined];
      if ( !fechaVenta ) return ['fecha venta property is required', undefined];
      if ( !idCliente ) return ['id cliente property is required', undefined];

      if(Number.isNaN(idCliente))
        return ['id cliente debe ser un numero'];

      idCliente = Number(idCliente); 
      // if( !estadoVenta ) return ['estado venta property is required', undefined];

      console.log(detalleVenta);


      // if( !detalleVenta.idProducto ) return ['idProducto property is required', undefined];
      // if( !detalleVenta.cantidad ) return ['cantidad property is required', undefined];

      if(Number.isNaN(precioTotal))
        return ['precio total property must be a number', undefined];

      return [undefined, new CreateVentaDto(precioTotal,fechaVentaSave,idCliente,EstadoVenta.HECHA, detalleVenta)];
    }
  
  }