import { DetalleVenta } from "@prisma/client";
import { DetalleVentaEntity } from "../../entities/detalleVenta.entity";



enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
}

export class CreateDetalleVentaDto {

    private constructor(

      public readonly idProducto: number,
      public readonly cantidad: number,
    ){}
    
    static create( props: {[key:string]: any} ): [string?, CreateDetalleVentaDto?]  {
  
      const {  idProducto, cantidad } = props;

  
      if ( !idProducto ) return ['id Producto property is required', undefined];
      if ( !cantidad ) return ['id cliente property is required', undefined];


      return [undefined, new CreateDetalleVentaDto(idProducto,cantidad)];
    }
  
  }