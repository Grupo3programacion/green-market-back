
import { DetalleVentaEntity } from "./detalleVenta.entity";


enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
}

export class VentaEntity {


    constructor(
      public id: number,
      public precioTotal: number,
      public idCliente: number,
      public estadoVenta : EstadoVenta,
      public detalleVenta: DetalleVentaEntity[],
      public fechaVenta: Date | null,
    ) {}

    public static fromObject( object: {[key: string]: any} ): VentaEntity {
      const { id, precioTotal, fechaVenta, idCliente, detalleVenta, estado} = object;
      if ( !id ) throw 'id venta is required';
      if ( !precioTotal ) throw 'precio total is required';
      if ( !idCliente ) throw 'idCliente is required';
      if ( !fechaVenta ) throw 'fecha Venta is required';
      if ( !estado) throw 'estado Venta is required';
      if ( !detalleVenta ) throw 'detalle Venta is required';
  
      return new VentaEntity(id, precioTotal,idCliente,estado, detalleVenta,fechaVenta);
    }
  }