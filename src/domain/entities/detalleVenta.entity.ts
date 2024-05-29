


export class DetalleVentaEntity {

    constructor(
      public  idProducto: number,
      public  idVenta: number,
      public  cantidad: number
    ) {}

  
    public static fromObject( object: {[key: string]: any} ): DetalleVentaEntity {
      const { idProducto, idVenta, cantidad } = object;
      if ( !idProducto ) throw 'idProducto is required';
      if ( !idVenta ) throw 'idVenta is required';
      if ( !cantidad ) throw 'cantidad is required';
  
      return new DetalleVentaEntity(idProducto, idVenta,cantidad);
    }
  
  }