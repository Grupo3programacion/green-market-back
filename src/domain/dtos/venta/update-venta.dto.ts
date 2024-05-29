import { DetalleVenta } from "@prisma/client";
import { DetalleVentaEntity } from "../../entities/detalleVenta.entity";


enum EstadoVenta {

    PENDIENTE,
    CANCELADA,
    PROCESO,
    HECHA
}



export class UpdateVentaDto {

    private constructor(
      public readonly id: number,
      public readonly precioTotal: number,
      public readonly estadoVenta: EstadoVenta,
      public readonly detalleVenta?: DetalleVentaEntity[]
    ){}

    get values() {
      const returnObj: {[key: string]: any} = {};
  
      if ( this.precioTotal ) returnObj.precioTotal = this.precioTotal;
      if ( this.estadoVenta ) returnObj.estadoVenta = this.estadoVenta;
      if ( this.detalleVenta ) returnObj.detalleVenta = this.detalleVenta;
      
      return returnObj;
    }
    
    static create( props: {[key:string]: any} ): [string?, UpdateVentaDto?]  { 
  
      const { id, precioTotal, estadoVenta, detalleVenta} = props;

      if ( !id || isNaN( Number(id)) ) {
        return ['id must be a valid number'];
      }
      
      return [undefined, new UpdateVentaDto(id, precioTotal,estadoVenta,detalleVenta)];
    }
  
  }